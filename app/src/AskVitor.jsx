import { useEffect, useRef, useState } from "react";

const apiBase = import.meta.env.VITE_AGENT_API_URL || "http://127.0.0.1:8787";
const suggestions = [
  "用 30 秒介绍你自己",
  "为什么你适合产品运营岗位？",
  "讲一个从 0 到 1 的产品项目",
];
const minPanelWidth = 380;
const minPanelHeight = 460;
const maxPanelWidth = 760;
const maxPanelHeight = 820;

function sourceLabel(index) {
  return `S${index + 1}`;
}

function SourceCard({ source, index }) {
  const content = (
    <>
      <strong>{sourceLabel(index)}</strong>
      <span>{source.title}</span>
      <small>{source.sourceType === "self_interview" ? "本人自述 · 访谈整理" : source.section}</small>
    </>
  );

  if (source.sourceType === "self_interview") {
    return <div className="ask-source ask-source-self">{content}</div>;
  }

  return (
    <a className="ask-source" href={source.url} onClick={() => window.location.hash = source.url}>
      {content}
    </a>
  );
}

function Message({ message, busy, onRetry }) {
  const displayContent = message.content?.replace(/\*\*/g, "");
  return (
    <article className={`ask-message ask-message-${message.role}`}>
      <span className="ask-message-role">{message.role === "user" ? "YOU" : "ASK VITOR"}</span>
      <div className="ask-message-copy">{displayContent || "正在组织回答…"}</div>
      {message.retryPrompt && (
        <button className="ask-retry" type="button" disabled={busy} onClick={() => onRetry(message)}>
          重试
        </button>
      )}
      {message.sources?.length > 0 && (
        <div className="ask-sources" aria-label="回答引用">
          <span>回答依据</span>
          {message.sources.map((source, index) => (
            <SourceCard source={source} index={index} key={source.id} />
          ))}
        </div>
      )}
    </article>
  );
}

export function AskVitor() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [panelPosition, setPanelPosition] = useState(null);
  const [panelSize, setPanelSize] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [mobile, setMobile] = useState(() => window.innerWidth <= 650);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const panelRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const requestControllerRef = useRef(null);

  const busy = status !== "idle";

  function closePanel() {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  useEffect(() => {
    const openAgent = () => setOpen(true);
    window.addEventListener("ask-vitor:open", openAgent);
    return () => window.removeEventListener("ask-vitor:open", openAgent);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event) => event.key === "Escape" && closePanel();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => () => requestControllerRef.current?.abort(), []);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
  }, [question]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, status]);

  useEffect(() => {
    const keepPanelVisible = () => {
      const nextMobile = window.innerWidth <= 650;
      setMobile(nextMobile);
      if (nextMobile) {
        dragRef.current = null;
        if (resizeRef.current) {
          window.removeEventListener("pointermove", resizeRef.current.onMove);
          window.removeEventListener("pointerup", resizeRef.current.onEnd);
          window.removeEventListener("pointercancel", resizeRef.current.onEnd);
        }
        resizeRef.current = null;
        setDragging(false);
        setResizing(false);
        setPanelPosition(null);
        setPanelSize(null);
        return;
      }
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const margin = 12;
      const width = Math.min(rect.width, window.innerWidth - margin * 2);
      const height = Math.min(rect.height, window.innerHeight - margin * 2);
      setPanelSize((current) => current ? { width, height } : current);
      setPanelPosition((current) => {
        if (!current) return current;
        const margin = 12;
        return {
          x: Math.min(Math.max(current.x, margin), Math.max(margin, window.innerWidth - width - margin)),
          y: Math.min(Math.max(current.y, margin), Math.max(margin, window.innerHeight - height - margin)),
        };
      });
    };
    window.addEventListener("resize", keepPanelVisible);
    return () => {
      window.removeEventListener("resize", keepPanelVisible);
      if (resizeRef.current) {
        window.removeEventListener("pointermove", resizeRef.current.onMove);
        window.removeEventListener("pointerup", resizeRef.current.onEnd);
        window.removeEventListener("pointercancel", resizeRef.current.onEnd);
      }
    };
  }, []);

  function startDrag(event) {
    if (event.button !== 0 || window.innerWidth <= 650 || event.target.closest("button")) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
      width: rect.width,
      height: rect.height,
    };
    setPanelPosition({ x: rect.left, y: rect.top });
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function moveDrag(event) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const margin = 12;
    const nextX = drag.originX + event.clientX - drag.startX;
    const nextY = drag.originY + event.clientY - drag.startY;
    setPanelPosition({
      x: Math.min(Math.max(nextX, margin), Math.max(margin, window.innerWidth - drag.width - margin)),
      y: Math.min(Math.max(nextY, margin), Math.max(margin, window.innerHeight - drag.height - margin)),
    });
  }

  function stopDrag(event) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function startResize(event) {
    if (event.button !== 0 || window.innerWidth <= 650) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const resize = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originTop: rect.top,
      originRight: rect.right,
      originWidth: rect.width,
      originHeight: rect.height,
      captureTarget: event.currentTarget,
    };
    resize.onMove = (moveEvent) => moveResize(moveEvent);
    resize.onEnd = (endEvent) => stopResize(endEvent);
    resizeRef.current = resize;
    window.addEventListener("pointermove", resize.onMove);
    window.addEventListener("pointerup", resize.onEnd);
    window.addEventListener("pointercancel", resize.onEnd);
    setPanelPosition({ x: rect.left, y: rect.top });
    setPanelSize({ width: rect.width, height: rect.height });
    setResizing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
  }

  function moveResize(event) {
    const resize = resizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    const margin = 12;
    const availableWidth = Math.max(120, resize.originRight - margin);
    const availableHeight = Math.max(120, window.innerHeight - resize.originTop - margin);
    const minimumWidth = Math.min(minPanelWidth, availableWidth);
    const minimumHeight = Math.min(minPanelHeight, availableHeight);
    const width = Math.min(
      Math.max(resize.originWidth - (event.clientX - resize.startX), minimumWidth),
      Math.min(maxPanelWidth, availableWidth),
    );
    const height = Math.min(
      Math.max(resize.originHeight + event.clientY - resize.startY, minimumHeight),
      Math.min(maxPanelHeight, availableHeight),
    );
    setPanelPosition({ x: resize.originRight - width, y: resize.originTop });
    setPanelSize({ width, height });
  }

  function stopResize(event) {
    const resize = resizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    window.removeEventListener("pointermove", resize.onMove);
    window.removeEventListener("pointerup", resize.onEnd);
    window.removeEventListener("pointercancel", resize.onEnd);
    resizeRef.current = null;
    setResizing(false);
    if (resize.captureTarget.hasPointerCapture(event.pointerId)) {
      resize.captureTarget.releasePointerCapture(event.pointerId);
    }
  }

  function stopAnswer() {
    requestControllerRef.current?.abort();
  }

  function startNewConversation() {
    const controller = requestControllerRef.current;
    requestControllerRef.current = null;
    controller?.abort();
    setMessages([]);
    setQuestion("");
    setStatus("idle");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function trapMobileFocus(event) {
    if (event.key !== "Tab" || !mobile) return;
    const focusable = [...event.currentTarget.querySelectorAll("a[href], button:not([disabled]), textarea:not([disabled])")]
      .filter((element) => element.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  async function ask(nextQuestion, retryMessageId = null) {
    const prompt = String(nextQuestion ?? question).trim();
    if (!prompt || busy || requestControllerRef.current) return;

    const assistantId = `assistant-${Date.now()}`;
    const userMessage = { id: `user-${Date.now()}`, role: "user", content: prompt };
    const baseMessages = retryMessageId
      ? messages.filter((message) => message.id !== retryMessageId)
      : messages;
    const lastMessage = baseMessages[baseMessages.length - 1];
    const reuseLastUserMessage = lastMessage?.role === "user" && lastMessage.content === prompt;
    const historyMessages = reuseLastUserMessage ? baseMessages.slice(0, -1) : baseMessages;
    const history = historyMessages.map(({ role, content }) => ({ role, content }));
    const nextMessages = [
      ...baseMessages,
      ...(reuseLastUserMessage ? [] : [userMessage]),
      { id: assistantId, role: "assistant", content: "", sources: [] },
    ];
    const controller = new AbortController();
    requestControllerRef.current = controller;
    setMessages(nextMessages);
    setQuestion("");
    setStatus("retrieving");

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt, history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || `请求失败（${response.status}）`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split(/\r?\n\r?\n/);
        buffer = blocks.pop() || "";

        for (const block of blocks) {
          const event = block.match(/^event:\s*(.+)$/m)?.[1];
          const data = block.match(/^data:\s*(.+)$/m)?.[1];
          if (!event || !data) continue;
          const payload = JSON.parse(data);

          if (event === "sources") {
            setStatus("answering");
            setMessages((current) => current.map((message) => (
              message.id === assistantId ? { ...message, sources: payload } : message
            )));
          }
          if (event === "token") {
            setMessages((current) => current.map((message) => (
              message.id === assistantId ? { ...message, content: message.content + payload.token } : message
            )));
          }
          if (event === "error") throw new Error(payload.error || "回答生成失败。");
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        setMessages((current) => current.map((message) => (
          message.id === assistantId && !message.content
            ? { ...message, content: "已停止回答。", sources: [] }
            : message
        )));
        return;
      }
      const expectedLimit = error.message.startsWith("请求过于频繁")
        || error.message.startsWith("今天的 AI 咨询次数");
      setMessages((current) => current.map((message) => (
        message.id === assistantId
          ? {
            ...message,
            content: expectedLimit ? error.message : "暂时无法完成回答，请稍后重试。",
            sources: [],
            retryPrompt: expectedLimit ? undefined : prompt,
          }
          : message
      )));
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
        setStatus("idle");
      }
    }
  }

  function submit(event) {
    event.preventDefault();
    ask();
  }

  const panelClassName = ["ask-panel", dragging && "is-dragging", resizing && "is-resizing"]
    .filter(Boolean)
    .join(" ");
  const panelStyle = panelPosition ? {
    position: "fixed",
    left: panelPosition.x,
    top: panelPosition.y,
    right: "auto",
    bottom: "auto",
    transform: "none",
    ...(panelSize ? { width: panelSize.width, height: panelSize.height } : {}),
  } : undefined;

  return (
    <div className={open ? "ask-vitor is-open" : "ask-vitor"}>
      <button
        ref={launcherRef}
        className="ask-launcher"
        type="button"
        aria-controls="ask-vitor-panel"
        aria-expanded={open}
        onClick={() => open ? closePanel() : setOpen(true)}
      >
        <span className="ask-launcher-dot" />
        <span>问问 Vitor</span>
      </button>

      {open && (
        <section
          id="ask-vitor-panel"
          ref={panelRef}
          className={panelClassName}
          role="dialog"
          aria-labelledby="ask-vitor-title"
          aria-modal={mobile || undefined}
          style={panelStyle}
          onKeyDown={trapMobileFocus}
        >
          <header
            className="ask-header"
            title="拖动窗口"
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
          >
            <div>
              <span className="ask-header-kicker">RAG · VECTOR SEARCH</span>
              <h2 id="ask-vitor-title">问问 Vitor</h2>
              <p>我是 Vitor 的 AI 分身，基于公开资料和本人访谈用第一人称回答。</p>
            </div>
            <div className="ask-header-actions">
              {messages.length > 0 && (
                <button className="ask-new-chat" type="button" onClick={startNewConversation}>新对话</button>
              )}
              <button className="ask-close" type="button" aria-label="关闭问答" onClick={closePanel}>×</button>
            </div>
          </header>

          <div className="ask-conversation" aria-live="polite">
            {messages.length === 0 ? (
              <div className="ask-empty">
                <span>试着问我</span>
                <div className="ask-suggestions">
                  {suggestions.map((suggestion) => (
                    <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>
                  ))}
                </div>
              </div>
            ) : messages.map((message) => (
              <Message
                message={message}
                busy={busy}
                key={message.id}
                onRetry={(failedMessage) => ask(failedMessage.retryPrompt, failedMessage.id)}
              />
            ))}
            {status === "retrieving" && <div className="ask-status"><i />正在检索公开资料</div>}
            {status === "answering" && <div className="ask-status"><i />正在组织回答</div>}
            <div ref={endRef} />
          </div>

          <form className="ask-composer" onSubmit={submit}>
            <textarea
              ref={inputRef}
              value={question}
              rows="2"
              maxLength="800"
              placeholder="询问经历、项目、研究或岗位匹配…"
              aria-label="向 Vitor 提问"
              aria-describedby="ask-input-hint"
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                const isComposing = event.nativeEvent.isComposing || event.keyCode === 229;
                if (event.key === "Enter" && !event.shiftKey && !isComposing) {
                  event.preventDefault();
                  ask();
                }
              }}
            />
            <button
              type={busy ? "button" : "submit"}
              disabled={!busy && !question.trim()}
              onClick={busy ? stopAnswer : undefined}
            >
              {busy ? "停止回答" : "发送"}
            </button>
            <span id="ask-input-hint" className="ask-input-hint">Enter 发送 · Shift+Enter 换行</span>
          </form>
          <aside className="ask-disclaimer" role="note">
            <strong>AI 提示</strong>
            <span>AI 生成内容可能有误；重要信息请以简历或本人确认为准。</span>
          </aside>
          <button
            className="ask-resize-handle"
            type="button"
            aria-label="调整对话框大小"
            title="拖动调整大小"
            onPointerDown={startResize}
          />
        </section>
      )}
    </div>
  );
}
