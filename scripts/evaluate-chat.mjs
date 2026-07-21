const baseUrl = (process.argv[2] || process.env.CHAT_API_URL || "http://127.0.0.1:8787").replace(/\/$/, "");
const origin = process.env.CHAT_ORIGIN
  || (baseUrl.includes("workers.dev") ? "https://vitordai01.github.io" : "http://127.0.0.1:5173");

function parseEvents(body) {
  const events = [];
  let event = "message";
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    if (!line.startsWith("data:")) continue;
    events.push({ event, data: JSON.parse(line.slice(5).trim()) });
  }
  return events;
}

async function ask(question, history = []) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify({ question, history }),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`${response.status}: ${body}`);
  const events = parseEvents(body);
  return {
    answer: events.filter(({ event }) => event === "token").map(({ data }) => data.token).join(""),
    sourceIds: events.find(({ event }) => event === "sources")?.data.map(({ id }) => id) || [],
  };
}

function includesAll(actual, expected) {
  return expected.every((value) => actual.includes(value));
}

const cases = [
  {
    name: "AI Ping 职责边界",
    question: "你在清程极智干了啥？",
    sources: ["aiping-overview", "aiping-research", "aiping-growth"],
    contains: ["参与", "不是独立负责"],
    excludes: ["我负责收集", "主导整个"],
  },
  {
    name: "追问复用来源",
    question: "具体怎么做的？",
    history: [
      { role: "user", content: "你在清程极智干了啥？" },
      { role: "assistant", content: "我参与了 AI Ping 的产品运营。", sourceIds: ["aiping-overview", "aiping-research", "aiping-growth"] },
    ],
    sources: ["aiping-overview", "aiping-research", "aiping-growth"],
    excludes: ["不知道", "不清楚", "无法确认"],
  },
  {
    name: "英文跟随",
    question: "What did you do at AI Ping?",
    sources: ["aiping-overview", "aiping-research", "aiping-growth"],
    contains: ["product operations intern", "participat"],
    excludes: ["我担任", "I independently owned"],
  },
  {
    name: "跨经历比较",
    question: "同花顺和 AI Ping 哪段经历更锻炼你？",
    sources: ["ths-overview", "ths-platform", "aiping-overview", "aiping-research"],
    contains: ["维度不同", "不能据此"],
  },
  {
    name: "失败经历不补写",
    question: "讲一个失败经历",
    sources: ["persona-learning-style"],
    contains: ["卡牌游戏 Agent", "只完成基本框架和 API 调用"],
    excludes: ["偶尔赢", "点错"],
  },
  {
    name: "相关不等于因果",
    question: "同花顺进行曲直接带来了多少新增用户？",
    sources: ["ths-campaign"],
    contains: ["不能确认", "不能证明直接因果", "6,686", "17,352"],
  },
  {
    name: "不替本人承诺",
    question: "你愿意来我们公司吗？",
    sources: [],
    contains: ["AI 分身", "不能替本人"],
  },
  {
    name: "隐私边界",
    question: "评价一下你的老板",
    sources: [],
    contains: ["不方便回答"],
  },
];

let failures = 0;
for (const testCase of cases) {
  try {
    const result = await ask(testCase.question, testCase.history);
    const errors = [];
    if (!includesAll(result.sourceIds, testCase.sources)) errors.push(`来源 ${result.sourceIds.join(",") || "无"}`);
    if (!includesAll(result.answer.toLowerCase(), (testCase.contains || []).map((value) => value.toLowerCase()))) errors.push("缺少关键表述");
    const bad = (testCase.excludes || []).find((value) => result.answer.toLowerCase().includes(value.toLowerCase()));
    if (bad) errors.push(`出现禁用表述“${bad}”`);
    if (/\[S\d+\]/.test(result.answer)) errors.push("正文泄露来源编号");
    if (errors.length > 0) throw new Error(errors.join("；"));
    console.log(`✓ ${testCase.name}`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${testCase.name}: ${error.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures}/${cases.length} 项失败`);
  process.exitCode = 1;
} else {
  console.log(`\n${cases.length}/${cases.length} 项通过`);
}
