import { useEffect, useRef, useState } from "react";

const apiBase = import.meta.env.VITE_AGENT_API_URL || "http://127.0.0.1:8787";
const suggestions = [
  "介绍一下你自己",
  "你有哪些值得聊聊的经历？",
];

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

function Message({ message }) {
  const displayContent = message.content?.replace(/\*\*/g, "");
  return (
    <article className={`ask-message ask-message-${message.role}`}>
      <span className="ask-message-role">{message.role === "user" ? "YOU" : "ASK VITOR"}</span>
      <div className="ask-message-copy">{displayContent || "正在组织回答…"}</div>
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
  const [dragging, setDragging] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const dragRef = useRef(null);

  const busy = status !== "idle";

  useEffect(() => {
    const openAgent = () => setOpen(true);
    window.addEventListener("ask-vitor:open", openAgent);
    return () => window.removeEventListener("ask-vitor:open", openAgent);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, status]);

  useEffect(() => {
    const keepPanelVisible = () => {
      if (window.innerWidth <= 650) {
        dragRef.current = null;
        setDragging(false);
        setPanelPosition(null);
        return;
      }
      setPanelPosition((current) => {
        if (!current || !panelRef.current) return current;
        const rect = panelRef.current.getBoundingClientRect();
        const margin = 12;
        return {
          x: Math.min(Math.max(current.x, margin), Math.max(margin, window.innerWidth - rect.width - margin)),
          y: Math.min(Math.max(current.y, margin), Math.max(margin, window.innerHeight - rect.height - margin)),
        };
      });
    };
    window.addEventListener("resize", keepPanelVisible);
    return () => window.removeEventListener("resize", keepPanelVisible);
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

  async function ask(nextQuestion) {
    const prompt = String(nextQuestion ?? question).trim();
    if (!prompt || busy) return;

    const assistantId = `assistant-${Date.now()}`;
    const userMessage = { id: `user-${Date.now()}`, role: "user", content: prompt };
    const history = messages.map(({ role, content }) => ({ role, content }));
    setMessages((current) => [...current, userMessage, { id: assistantId, role: "assistant", content: "", sources: [] }]);
    setQuestion("");
    setStatus("retrieving");

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt, history }),
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
      const expectedLimit = error.message.startsWith("请求过于频繁")
        || error.message.startsWith("今天的 AI 咨询次数");
      setMessages((current) => current.map((message) => (
        message.id === assistantId
          ? { ...message, content: expectedLimit ? error.message : `暂时无法完成回答：${error.message}`, sources: [] }
          : message
      )));
    } finally {
      setStatus("idle");
    }
  }

  function submit(event) {
    event.preventDefault();
    ask();
  }

  return (
    <div className={open ? "ask-vitor is-open" : "ask-vitor"}>
      <button className="ask-launcher" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="ask-launcher-dot" />
        <span>问问 Vitor</span>
      </button>

      {open && (
        <section
          ref={panelRef}
          className={dragging ? "ask-panel is-dragging" : "ask-panel"}
          role="dialog"
          aria-label="问问 Vitor"
          style={panelPosition ? {
            position: "fixed",
            left: panelPosition.x,
            top: panelPosition.y,
            right: "auto",
            bottom: "auto",
            transform: "none",
          } : undefined}
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
              <h2>问问 Vitor</h2>
              <p>我是 Vitor 的 AI 分身，基于公开资料和本人访谈用第一人称回答。</p>
            </div>
            <button type="button" aria-label="关闭问答" onClick={() => setOpen(false)}>×</button>
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
            ) : messages.map((message) => <Message message={message} key={message.id} />)}
            {status === "retrieving" && <div className="ask-status"><i />正在检索公开资料</div>}
            {status === "answering" && <div className="ask-status"><i />DeepSeek-V4-Flash 正在回答</div>}
            <div ref={endRef} />
          </div>

          <form className="ask-composer" onSubmit={submit}>
            <textarea
              ref={inputRef}
              value={question}
              rows="2"
              maxLength="800"
              placeholder="询问经历、项目、研究或岗位匹配…"
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  ask();
                }
              }}
            />
            <button type="submit" disabled={!question.trim() || busy}>{busy ? "回答中" : "发送"}</button>
          </form>
          <aside className="ask-disclaimer" role="note">
            <strong>AI 提示</strong>
            <span>AI 生成内容可能有误；重要信息请以简历或本人确认为准。</span>
          </aside>
        </section>
      )}
    </div>
  );
}
