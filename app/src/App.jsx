import { useEffect, useMemo, useState } from "react";
import { AskVitor } from "./AskVitor.jsx";

const base = import.meta.env.BASE_URL;
const asset = (name) => `${base}assets/${name}`;

const internships = [
  {
    id: "ths",
    index: "01",
    company: "同花顺",
    logo: "ths-logo.png",
    logoAlt: "同花顺标志",
    role: "产品运营实习生 · 达人运营方向",
    period: "2026.03 — 2026.08",
    summary: "从 0 到 1 规划并搭建达人运营中台，以 Streamlit 原型验证流程，并规划整合进公司内网中台。",
    descriptor: "把分散的达人运营链路沉淀成可追踪、可复盘的团队基础设施",
    heroImage: "ths-social-growth-bg.png",
    intro: "在同花顺 B2C 平台运营中，我从 0 到 1 规划并搭建达人运营中台。初期基于 Vibe Coding 快速开发内部 Streamlit 原型工具，后续规划整合进公司内网达人中台，对接飞书多维表格与抖音数据采集流程，覆盖达人视频采集、数据重采集、达人主页监控、达人库分类维护、合作视频归档、看后搜匹配与周 / 月复盘。项目将单次数据整理从约 4 小时压缩至约 30 分钟，单条达人数据登记从 1-2 分钟压缩至约 10 秒，周度复盘整理从 2-3 小时压缩至约 30 分钟。2026 年 H1，同花顺整体新增用户中 17% 来自社媒渠道；抖音作为主阵地，看后搜约 80% 来自达人内容。",
    proofPoints: [
      ["17%", "2026 年 H1 同花顺整体新增用户来自社媒渠道，社媒已经成为新增用户来源之一。"],
      ["80%", "抖音渠道看后搜约 80% 来自达人内容，达人合作直接影响用户主动搜索行为。"],
      ["中台", "把达人筛选、选题共创、发布跟进和数据复盘沉淀为可复用的业务流程。"],
    ],
    goals: ["梳理达人合作中的采集、归档、复盘和主档维护流程，搭建贴合业务的运营中台", "建立可持续的达人供给池，区分财经、校园、音乐翻唱、剧情段子等不同账号类型", "把合作视频、达人身份、内容分类和数据反馈沉淀为可追踪的运营资产"],
    growthFlow: [
      ["达人筛选 / BD", "按账号类型、受众场景和话题适配度筛选达人，建立可复用的供给池。"],
      ["选题共创", "把品牌传播目标拆成达人能拍、用户愿意停留的内容角度。"],
      ["发布跟进", "用社群节奏、素材反馈和提醒机制提高发布稳定性。"],
      ["看后搜 / 下载观察", "把曝光之后的主动搜索、下载趋势作为话题承接效果的观察口径。"],
      ["数据回收 / 达人复用", "通过运营中台回收作品数据、重采集互动表现，再反哺达人分层和下一轮选题。"],
    ],
    actions: [
      ["中台产品搭建", "基于 Vibe Coding 快速开发内部 Streamlit 原型工具，并规划后续整合进公司内网达人中台；对接飞书多维表格与抖音数据采集流程，把待采集作品链接转成可复盘、可投流、可归档的数据。"],
      ["达人池分层", "按账号内容形态和受众场景拆分达人池，区分财经解读、校园生活、音乐翻唱、剧情段子等类型；记录达人身份、内容能力、合作状态和适配话题，避免每次合作从零筛选。"],
      ["话题内容转译", "参与 #同花顺手游、#同花顺进行曲 等重点话题执行，把品牌侧传播目标翻译成达人可拍、用户愿意停留的内容角度，并根据不同达人类型调整脚本方向。"],
      ["校园社群推进", "运营 2 个大学生博主社群，跟进选题共创、发布节奏、素材反馈和数据回收；通过群内提醒、案例拆解和节奏管理提升持续产出稳定性。"],
    ],
    evidence: [
      {
        kind: "tool",
        eyebrow: "Tooling",
        title: "达人运营中台",
        image: "ths-platform-overview.jpg",
        alt: "达人运营中台主面板截图",
        copy: "达人运营中台是这段经历里最核心的沉淀。初期先用 Streamlit 原型验证流程，后续规划整合进公司内网；原本分散在飞书表格、作品链接和人工记录中的达人作品、合作日期、视频数据和复盘字段，被串成可持续回收和复用的数据链路。",
        modules: [
          ["开始数据采集", "日常新增作品链接进入飞书“达人视频链接”表后，自动读取待采集记录，打开抖音作品并抓取达人昵称、抖音号、粉丝数、发布时间、标题和互动量。", "结果会写入“达人视频数据上交投流”，同步内容分级，并维护达人主档。"],
          ["数据重采集", "周复盘或阶段复盘前，按合作日期范围重新读取作品互动量，避免只停留在首次提交时的数据。", "支持写入飞书周度重采集表，也可以导出 Excel，用于复盘前的数据刷新。"],
          ["达人主档维护", "按抖音号 upsert 达人信息汇总，更新粉丝数，并追加合作视频关系。", "让达人池从一次性合作名单变成可追踪、可复用的运营资产。"],
          ["复盘页面", "按周度重采集记录或采集日范围查看新增达人、分组概览、采集日趋势、达人贡献排行和爆款明细。", "内容策略页可按话题词观察曝光趋势、排行、环比变化和话题明细。"],
        ],
      },
      {
        kind: "agent",
        eyebrow: "Agent System",
        title: "社媒内容生产 Multi-agent 协作体系",
        copy: "基于达人运营中台沉淀的达人库、内容画像、案例知识库和数据复盘口径，我已经搭建完成面向社媒内容生产的 Multi-agent 协作体系：业务方提出需求后，由外联 Agent 整理需求、资源约束、合作方向和风险点，经人工审批后分发到达人合作或内容制作 workflow。",
        details: ["定位：不是单纯的数据看板，而是贯穿需求理解、内容分发、审核自查、发布协同和复盘反馈的工作流。", "边界：达人 / 自营 / 联动方向、预算优先级和合作边界保留在人工审批节点。", "底座：达人库、内容画像、案例知识库、金融内容风险规则和稳定的数据回收口径。"],
        modules: [
          ["外联 Agent", "基于业务需求、历史合作和达人画像，整理合作方向、资源约束、风险点和待确认问题。", "需求摘要 / 案例参考 / 资源清单", "人工确认合作方向与边界"],
          ["达人执行 Agent", "承接确认后的达人合作需求，生成达人筛选标准、合作 brief、内容方向、排期和数据回收口径。", "达人 brief / 脚本方向 / 执行清单", "人工确认达人名单与内容边界"],
          ["内容制作 Agent", "承接确认后的内容制作需求，生成内容选题、脚本方向、制作清单和排期。", "内容选题 / 脚本方向 / 制作清单", "人工确认内容质量与节奏"],
          ["审核前自查 Agent", "检查荐股风险、收益承诺、绝对化表达、敏感词、数据来源和风险提示。", "风险标注 / 替换建议 / 修改清单", "发布前人工最终把关"],
          ["数据复盘 Agent", "回收发布后数据，分析曝光、互动、看后搜、爆款率和异常波动，并把有效案例回写知识库。", "日报周报 / 策略反馈 / 达人复用建议", "人工判断下阶段策略取舍"],
        ],
      },
      {
        kind: "topic",
        eyebrow: "Topic Case",
        title: "#同花顺进行曲 内容策略复盘",
        copy: "这个话题项目用于观察 #同花顺进行曲 词条爆发前后的新增用户变化。词条爆发节点出现在 4 月 7 日，爆发后 7 天的日均新增用户明显抬升，可作为话题扩散与新增用户趋势之间的相关性观察。",
        dataRows: [
          ["爆发前日均新增用户", "6,686", "4/1-4/6，作为词条爆发前的基准期。"],
          ["爆发后日均新增用户", "17,352", "4/7-4/13，词条爆发后的连续观察期。"],
          ["日均新增用户提升", "2.6x", "爆发后日均新增用户约为爆发前的 2.6 倍。"],
          ["单日新增用户峰值", "22,866", "4 月 9 日达到阶段最高新增用户。"],
        ],
        details: ["目标人群：抖音财经、泛兴趣和可能被热点话题带动搜索的用户。", "内容机制：用可模仿的旋律 / 话题形式降低达人创作门槛，让不同账号类型都能找到可执行角度。", "观察指标：词条爆发节点、爆发前后新增用户趋势、看后搜和下载变化。"],
        mechanics: [
          ["目标人群", "抖音财经、泛兴趣和可能被热点话题带动搜索的用户。"],
          ["内容机制", "可模仿的旋律 / 话题形式降低达人创作门槛。"],
          ["观察指标", "词条爆发节点、爆发前后新增用户趋势、看后搜和下载变化。"],
        ],
      },
      {
        kind: "report",
        eyebrow: "Report SOP",
        title: "战报制作与长图交付",
        copy: "这套 SOP 面向同花顺财经类活动战报、投放复盘、达人合作复盘和热点传播复盘。它不是把所有数据和截图平铺成长图，而是先判断业务故事和证据等级，再确认布局方向，用 HTML/CSS 分块完成长图设计、浏览器验收和复盘沉淀。",
        modules: [
          ["Brief 归纳", "把活动周期、品牌机构、战报用途、公开范围、核心指标、素材资产和限制条件整理成任务书，先标出缺口、敏感内容和不可公开信息。"],
          ["数据故事板", "判断本次战报属于规模型、增长型、证据型、矩阵型、话题型还是品牌背书型，选出唯一首屏主指标和 3-5 个辅助信息。"],
          ["素材策展板", "按证据强度和视觉价值给截图、头像、二维码、logo、KV 分级，明确哪些做 hero evidence、supporting evidence、氛围素材或舍弃。"],
          ["布局评审", "先给出 2-3 个布局方向或低保真 HTML 草图，确认主叙事、公开边界、必须展示素材和必须隐藏素材后，再进入正式设计。"],
          ["分块合成验收", "用 HTML/CSS 制作首屏、KPI、证据墙、矩阵、话题热力和收尾模块，抽出视觉 tokens，合成长图后用浏览器检查裁切、溢出、二维码和模块衔接。"],
        ],
        reports: [
          {
            title: "同花顺品牌共同成长计划",
            image: "ths-report-growth-plan.png",
            alt: "同花顺品牌共同成长计划战报长图",
            service: "品牌合作与达人共创复盘",
            narrative: "突出合作规模、内容矩阵和品牌共同成长关系。",
            use: "用于阶段复盘、合作方沟通和后续项目沉淀。",
          },
          {
            title: "ETF 新势界高校挑战赛",
            image: "ths-report-etf-campaign.png",
            alt: "ETF 新势界高校挑战赛战报长图",
            service: "高校活动传播复盘",
            narrative: "用活动节点、参与证据和传播素材说明校园触达。",
            use: "用于活动结项、外部展示和同类高校项目参考。",
          },
        ],
      },
    ],
    reflection: "这段经历让我更明确：产品运营的价值不只是推进单次合作，而是把业务流程抽象成可持续使用的工具和数据资产。社媒新增用户占比和抖音看后搜数据，能证明达人内容对业务增长有实际贡献；中台化沉淀则让团队把时间留给判断、沟通和复盘，而不是重复核对。",
  },
  {
    id: "aiping",
    index: "02",
    company: "清程极智 / AI Ping",
    logo: "aiping-logo.svg",
    logoAlt: "AI Ping 标志",
    heroImage: "aiping-hero-bg.png",
    role: "产品运营实习生",
    period: "2025.08 — 2026.02",
    summary: "参与产品全生命周期运营，以用户研究推动体验优化，并搭建内容与增长活动体系。",
    descriptor: "围绕产品内测、用户反馈、体验优化和增长活动，推动开发者完成从了解产品到首次使用的转化",
    intro: "AI Ping 是面向开发者的大模型算力平台，我的工作目标不是只做曝光，而是围绕日均 Token 调用量提升，把产品内测、用户反馈、品牌内容和增长活动连接成可转化的运营链路。",
    goals: ["搭建产品内测体系并明确核心用户画像", "降低开发者从了解产品到实际调用的迁移成本", "用品牌内容、公众号发布和增长活动推动真实调用量提升"],
    productStages: [
      ["2025.09", "aiping.cn 上线", "产品完成公开访问入口，运营重点从内测反馈转向首批开发者认知建立。"],
      ["2025.09-10", "统一 API 调用与服务路由测试", "围绕统一调用入口、服务路由和权益领取链路推进内测 / 公测承接。"],
      ["2025.10-11", "多模态与工具接入扩展", "覆盖 VL、Embedding、Reranker、图片生成、Agent / Coding 工具等开发者高频场景。"],
      ["2026.01", "产品发布会正式发布", "配合发布节点梳理产品价值表达，把功能能力转成开发者可理解的使用理由。"],
      ["2026.02", "行业报告解读与用户教育", "用报告解读、榜单和选型内容解释平台差异，延续发布后的获客与教育。"],
    ],
    actions: [
      ["指标拆解", "把运营目标从曝光和注册进一步落到日均 Token 调用量，关注开发者从了解产品、领取权益到首次调用和持续消耗的完整路径。"],
      ["问卷 + 深访", "围绕内测用户收集使用反馈，发现多数用户对算力市场格局并不清楚，只知道模型可从官网调用；同时识别跳转链路、延迟评测、模型迁移和首次调用门槛。"],
      ["精确用户画像", "基于调研结论明确从开发者和小 B 端出发：个人用户更重视成本和上手速度，企业用户更重视服务稳定、调用可靠性和迁移成本。"],
      ["产品优化协同", "基于目标用户画像推动跳转路径简化、P90 延迟评测和 Agent Store 概念：参考 Steam 式应用分发，让用户在平台内完成算力调用、Agent 选择和 AI 应用使用闭环。"],
      ["专业内容发布", "负责品牌公众号内容发布，撰写赤兔、八卦炉等技术成果文章，并提出将性能评测对标“大众点评”的表达框架，用评分、榜单和体验维度帮助非专业用户理解模型能力与算力平台价值。"],
      ["增长漏斗落地", "把清华创协、程序员节、Party Nights 等活动串成“活动触达 - 权益领取 - 进群承接 - 首次调用 - Token 消耗 / 复用”的转化路径，避免活动只停留在曝光。"],
    ],
    evidence: [
      {
        kind: "activity",
        eyebrow: "Campaigns",
        title: "增长活动与转化漏斗",
        copy: "围绕开发者增长和高校场景触达，我参与活动方案策划、合作方沟通、福利机制设计、物料落地和发布执行。活动不只承担曝光，而是把产品权益接到后续使用链路。",
        details: ["活动触达：借助高校赛事、节日节点和开发者社群制造进入理由。", "权益领取：用 Token 赠金、限定福利和二维码入口降低第一次尝试成本。", "进群承接：把活动参与者沉淀到社群，便于答疑、教程分发和后续唤醒。", "首次调用：引导用户完成 API Key、模型选择和第一笔调用。", "Token 消耗 / 复用：观察是否从试用走向持续消耗，反向校准活动人群和权益设计。"],
        activities: [
          {
            title: "清华大学创业大赛合作",
            image: "aiping-tsinghua-startup.png",
            alt: "AI Ping 为昆山杯清华大学创业大赛参赛队伍提供 Token 赠金的活动横幅",
            variant: "wide",
            audience: "高校创业团队、AI 应用参赛项目",
            mechanism: "赛事权益包 + Token 赠金，把参赛项目的模型调用需求接入试用链路。",
            metric: "权益领取人数、进群比例、参赛团队首次调用完成率。",
          },
          {
            title: "程序员节 Token 福利",
            image: "aiping-programmer-day.png",
            alt: "清程极智 AI Ping 程序员节送 Token 福利活动海报",
            variant: "poster",
            audience: "开发者、学生开发者、AI 工具尝鲜用户",
            mechanism: "节日福利 + 二维码领取，引导用户进群并完成算力点领取。",
            metric: "扫码进群人数、权益领取率、领取后首次调用率。",
          },
          {
            title: "Party Nights 共创伙伴活动",
            image: "aiping-party-nights.jpg",
            alt: "AI Ping Party Nights 共创伙伴活动日程长图",
            variant: "long",
            audience: "AI 产品共创者、开发者社群、早期合作伙伴",
            mechanism: "共创活动露出 + 社群传播，沉淀潜在合作和高意向试用用户。",
            metric: "活动报名 / 到场、社群新增、高意向用户跟进线索。",
          },
        ],
      },
      {
        kind: "content",
        eyebrow: "Content Growth",
        title: "内容增长与用户教育",
        copy: "在产品从内测走向发布的过程中，我参与公众号和产品内容发布，把偏技术的算力平台能力翻译成开发者能判断、能选择、能尝试的内容。",
        details: ["把“大模型 API 大众点评”转成榜单、评分、延迟和价格等用户可感知维度，帮助用户理解不同服务的差异。", "用“官方不一定最优”的表达解释多服务路由价值：同一模型在不同服务商之间可能有成本、速度和稳定性差别。", "围绕“智能路由降本提速”输出报告解读、榜单说明和开发者选型内容，让教育内容同时承担获客入口。"],
        modules: [
          ["公众号 / 产品内容发布", "参与赤兔、八卦炉等技术成果内容发布，把产品能力沉淀为可被转发和检索的品牌资产。"],
          ["榜单与报告解读", "用行业报告、模型榜单和选型文章解释平台判断依据，降低用户第一次理解成本。"],
          ["获客内容承接", "将内容指向权益领取、社群答疑和首次调用教程，让阅读后的下一步动作更清楚。"],
        ],
      },
    ],
    reflection: "用户研究不是起点处的一次确认，而是连接产品优化与增长策略的持续机制。真正有效的增长动作，通常来自对迁移成本和使用习惯的具体理解。",
  },
  {
    id: "youdao",
    index: "03",
    company: "网易有道",
    logo: "youdao-logo.png",
    logoAlt: "网易有道标志",
    role: "新媒体运营实习生 · 升学中心 OMO 项目组",
    period: "2024.02 — 2024.06",
    heroImage: "youdao-hero-bg.png",
    summary: "从 0 到 1 搭建区域与全国账号矩阵，用 IP 化表达、节点选题和地域议题获得自然流量。",
    descriptor: "围绕升学场景、区域差异和热点跟踪做账号冷启",
    intro: "在无投流条件下负责南京、大同、宁波、武汉四个地方性微信视频号和一个全国性微信视频号的冷启动，覆盖账号规划、内容选题、竞品跟踪和数据复盘。核心思路不是高频发布，而是围绕本地升学 IP、运营日历和区域教育议题，持续生产用户在关键节点真正需要的内容。",
    proofPoints: [
      ["4+1", "负责南京、大同、宁波、武汉四个区域微信视频号和一个全国性微信视频号的冷启动。"],
      ["3-4 篇/周", "各账号保持稳定更新节奏，并根据节点热度和区域反馈调整选题。"],
      ["0 投流", "在无投放预算下，通过内容形式、地域议题和热点跟踪争取自然推荐。"],
    ],
    goals: ["完成四个区域账号和一个全国账号的冷启动", "把升学服务从机构口播转成家长和学生愿意看的本地化内容", "根据不同城市教育结构、升学节点和竞品热点建立差异化选题策略"],
    growthFlow: [
      ["账号定位", "选择微信视频号作为冷启动阵地，是因为升学内容更容易触达本地家长社交关系链；因此把区域账号包装成更贴近家长和学生的信息型 IP，而不是单纯机构号。"],
      ["节点日历", "围绕中高考、志愿填报、开学季等高关注节点提前储备选题。"],
      ["地域议题", "结合宁波镇海中学、大同教育资源不均、宁波县中 vs 市中等本地话题提高相关性。"],
      ["热点跟踪", "持续观察同类升学账号的爆款标题、评论问题和内容形式，筛出可迁移的表达。"],
      ["数据复盘", "用曝光、互动和涨粉表现判断选题是否成立，并修正下一周期内容。"],
    ],
    actions: [
      ["竞品与热点跟踪", "持续观察同类升学账号的高互动内容，拆解其标题钩子、评论区问题、发布时间和内容形式，用于判断哪些选题值得本地化复用。"],
      ["IP 化账号表达", "把区域账号从机构口播调整为本地升学信息 IP，围绕学校、政策、志愿和家长焦虑建立稳定的人设与内容边界。"],
      ["运营日历规划", "围绕中高考、志愿填报、开学季等高关注节点提前规划内容，把用户即时需求转成可连续发布的选题库。"],
      ["地域议题策划", "根据城市教育结构做差异化选题：宁波侧重镇海中学、县中 vs 市中等强讨论话题，大同侧重教育资源不均和本地升学路径。"],
      ["内容结构调整", "减少传统口播占比，增加信息盘点、问题拆解、榜单对比和本地话题型内容，以更适合平台消费习惯的形式承接目标用户。"],
      ["数据复盘迭代", "各账号周均更新 3-4 篇内容，持续观察曝光、互动和涨粉表现，用结果修正下一周期的城市选题和内容形式。"],
    ],
    evidence: [
      {
        kind: "content",
        eyebrow: "Content System",
        title: "区域账号内容方法",
        copy: "有道这段经历的核心不是单篇爆款，而是把地方升学内容拆成可持续运营的方法：先确定账号像谁说话，再判断用户什么时候需要什么内容，最后用本地议题和竞品热点提高自然流量命中率。",
        details: ["IP 运营：让账号更像本地升学信息助手，而不是机构宣传入口。", "节点运营：中高考、志愿填报等窗口期优先发布用户有明确需求的内容。", "地域运营：每个城市用不同议题建立本地感和讨论度。"],
        modules: [
          ["本地升学 IP", "围绕学校、政策、志愿填报和家长关心的问题建立账号表达，让内容更像本地升学信息服务。"],
          ["运营日历", "提前标记中高考、志愿填报、开学季等节点，把阶段性需求转成连续选题。"],
          ["地域差异", "宁波可借镇海中学、县中 vs 市中的讨论切入，大同可围绕教育资源不均和升学路径做内容。"],
        ],
      },
      {
        kind: "viral",
        eyebrow: "Viral Content",
        title: "爆款内容展示",
        shots: [
          { title: "爆款内容 01", image: "youdao-hit-01.png", alt: "网易有道爆款内容截图 01", variant: "wide" },
          { title: "爆款内容 02", image: "youdao-hit-02.png", alt: "网易有道爆款内容截图 02", variant: "wide" },
          { title: "爆款内容 03", image: "youdao-hit-03.png", alt: "网易有道爆款内容截图 03", variant: "wide" },
          { title: "爆款内容 04", image: "youdao-hit-04.png", alt: "网易有道爆款内容截图 04", variant: "wide" },
          { title: "爆款内容 05", image: "youdao-hit-05.png", alt: "网易有道爆款内容截图 05", variant: "wide" },
          { title: "爆款内容 06", image: "youdao-hit-06.png", alt: "网易有道爆款内容截图 06", variant: "wide" },
        ],
      },
    ],
    reflection: "账号增长不是内容数量的简单累积。更有效的做法，是把本地升学 IP、节点需求、地域差异和竞品热点放进同一个复盘框架里，让自然流量不只来自偶然爆款，而是来自可重复的选题判断。",
  },
];

const projects = [
  {
    id: "jellyfish-xhs-news",
    title: "AI 小红书创作 Skill 与自动化工作流",
    date: "2026.05",
    image: "jellyfish-xhs-news-hero.png",
    alt: "小水母 AI 助理把 AI 新闻整理成小红书组图的手绘插画",
    summary: "搭建 Codex 驱动的 AI 小红书日更创作与复盘系统，将传播预判、内容生成、配图规划和 T+3 复盘沉淀为标准流程。",
    tags: ["Codex Skill", "内容工作流", "AIGC 视觉 IP"],
    href: "#/project/jellyfish-xhs-news",
    subtitle: "从新闻轻筛、传播预判到内容生成与 T+3 复盘的 AI 内容生产系统",
    repo: "https://github.com/VITORDAI01/jellyfish-xhs-news",
    intro: "这个项目以 AI HOT 精选条目为默认选题源，设计“新闻轻筛 - 传播预判 - 选题排序 - 文案生成 - 配图规划 - T+3 复盘”的标准流程；引入盲预测、复盘记录与 Rubric 校准机制，并用固定的“小水母 AI 助理”视觉角色完成正文配图和小红书 3:4 轮播组图。",
    goals: ["建立可复用的角色型视觉 IP，而不是每次临时换风格", "让 AI 新闻先经过传播价值判断，再进入组图规划", "形成可复盘、自我优化的内容生成迭代循环"],
    actions: [
      ["入口路由模块", "用 SKILL.md 判断任务类型：小红书新闻组图会读取 carousel 和 virality，普通文章配图则进入 16:9 正文配图流程。", "SKILL.md"],
      ["角色与风格模块", "把小水母的半透明伞盖、5-7 根信息触须、微型皇冠夹、克制豆眼和白底手绘风格拆成可检查的硬约束。", "character-ip.md / style-dna.md"],
      ["内容转译模块", "先抽取新闻事实、读者价值、视觉锚点和风险点，再把抽象概念转成连接、过滤、托举、照亮等可画动作。", "composition-patterns.md"],
      ["传播预判模块", "生成前用 7 个维度给新闻打分：可感知性、工具行动性、收藏价值、评论诱因、封面强度、新鲜度和同质化风险。", "xhs-news-virality.md"],
      ["组图规划模块", "默认按封面、发生了什么、为什么重要、影响谁、怎么用或怎么看、结尾来组织 3:4 小红书轮播页。", "xhs-news-carousel.md"],
      ["复盘校准模块", "发布后回看曝光、收藏、评论、转发和关注转化，判断发布前赌注是否成立；连续 3 次同方向误判后再调整评分规则。", "xhs-news-virality.md"],
    ],
    results: [
      ["1 个", "固定小水母 AI 助理视觉 IP"],
      ["2 类", "正文配图与小红书新闻组图输出"],
      ["7 份", "风格、角色、构图、提示词与质检参考文件"],
      ["5-8 页", "按信息量生成的轮播结构"],
    ],
    reflection: "真正可持续的 AIGC 内容生产，不只是“会生成一张图”，而是把判断、结构、角色和质检都变成稳定流程。小水母的价值在于让解释型内容既有识别度，也保留信息筛选的清醒感。",
  },
  {
    title: "“人机共生”AI 艺术展",
    date: "2024.11",
    image: "ai-exhibition-news.jpg",
    alt: "嘉宾参观清华大学“人机共生”画展",
    summary: "独立负责 AI 神兽系列画作的生成创作与线下布展。作品于清华大学科学博物馆首展，并巡展至郑州博物馆等场馆。",
    tags: ["AIGC 创作", "展览执行", "视觉叙事"],
  },
  {
    title: "《红茶》纪录片",
    date: "2022.11 — 2023.04",
    image: "red-tea-award.jpg",
    alt: "《红茶》获第九届万峰林微电影盛典高校单元创优二等作品证书",
    summary: "组建两人摄制团队，负责选题策划、拍摄对象沟通、现场拍摄与后期制作规划；作品获第九届万峰林微电影盛典高校单元创优二等作品。",
    tags: ["纪录片创作", "现场拍摄", "全国二等奖"],
  },
];

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const scrollToRouteSection = (nextHash) => {
      const target = nextHash.match(/^#\/section\/([^/]+)/)?.[1];
      if (!target) return;
      window.setTimeout(() => {
        const node = document.getElementById(target);
        if (node) window.scrollTo({ top: node.offsetTop - 70, behavior: "smooth" });
      }, 150);
    };
    const onHash = () => {
      const nextHash = window.location.hash || "#/";
      setHash(nextHash);
      window.scrollTo({ top: 0 });
      scrollToRouteSection(nextHash);
    };
    window.addEventListener("hashchange", onHash);
    scrollToRouteSection(window.location.hash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function useMotion() {
  useEffect(() => {
    const progress = document.querySelector(".scroll-progress");
    const hero = document.querySelector(".hero-section");
    const heroWave = hero?.querySelector(".hero-wave");
    const coordinate = hero?.querySelector(".coordinate-a");
    const visual = hero?.querySelector(".hero-visual");
    const portrait = hero?.querySelector(".portrait-frame img");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${max ? window.scrollY / max : 0})`;
    };
    const onPointer = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      if (hero && window.matchMedia("(hover: hover)").matches) {
        const rect = hero.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
        const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
        if (heroWave) heroWave.style.translate = `${x * -18}px ${y * -12}px`;
        if (coordinate) coordinate.style.translate = `${x * 14}px ${y * 9}px`;
        if (visual) visual.style.transform = `perspective(1100px) rotateX(${y * -2.2}deg) rotateY(${x * 3}deg) translate3d(${x * 9}px,${y * 7}px,0)`;
        if (portrait) portrait.style.transform = `scale(1.012) translate3d(${x * -4}px,${y * -3}px,0)`;
      }
    };
    const resetHero = () => {
      if (heroWave) heroWave.style.translate = "0 0";
      if (coordinate) coordinate.style.translate = "0 0";
      if (visual) visual.style.transform = "perspective(1100px) rotateX(0) rotateY(0) translate3d(0,0,0)";
      if (portrait) portrait.style.transform = "scale(1.002) translate3d(0,0,0)";
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    hero?.addEventListener("pointerleave", resetHero);
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      hero?.removeEventListener("pointerleave", resetHero);
    };
  });
}

function Header({ detail = false }) {
  const [open, setOpen] = useState(false);
  const navHref = (section) => detail ? `#/section/${section}` : `#${section}`;
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="返回首页">
        <img src={asset("vd-monogram.png")} alt="" />
      </a>
      <button className="nav-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>导航</button>
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="主导航">
        <a href={detail ? "#/" : "#top"} onClick={() => setOpen(false)}>首页</a>
        <a href={navHref("education")} onClick={() => setOpen(false)}>教育</a>
        <a href={navHref("experience")} onClick={() => setOpen(false)}>实习经历</a>
        <a href={navHref("projects")} onClick={() => setOpen(false)}>项目经历</a>
        <a href={navHref("skills")} onClick={() => setOpen(false)}>能力</a>
        <a href={navHref("contact")} onClick={() => setOpen(false)}>联系</a>
      </nav>
      <a className="download-link" href={`${base}Vitor-Dai-Resume.pdf`} target="_blank" rel="noreferrer">下载简历</a>
    </header>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading" data-reveal>
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}<i /></h2></div>
    </div>
  );
}

function HomePage({ initialTarget }) {
  useMotion();
  useEffect(() => {
    if (!initialTarget) return;
    const timer = window.setTimeout(() => document.getElementById(initialTarget)?.scrollIntoView(), 80);
    return () => window.clearTimeout(timer);
  }, [initialTarget]);
  return (
    <div className="page-shell" id="top">
      <div className="scroll-progress" />
      <Header />
      <main>
        <section className="hero-section">
          <img className="hero-wave" src={asset("data-wave.png")} alt="" aria-hidden="true" />
          <div className="coordinate coordinate-a">39.9042° N<br />116.4074° E</div>
          <div className="hero-copy">
            <span className="eyebrow hero-kicker">Hello, I’m</span>
            <h1><span>戴维多尔</span><span>VITOR DAI</span></h1>
            <p>我关注技术如何改变人与信息的关系，<br />也持续把想法做成产品、内容和真实的增长。</p>
            <div className="hero-actions">
              <a className="button primary" href="#education">了解我的经历</a>
              <a className="button secondary" href={`${base}Vitor-Dai-Resume.pdf`} target="_blank" rel="noreferrer">下载简历</a>
            </div>
            <button
              className="hero-ai-invite"
              type="button"
              onClick={() => window.dispatchEvent(new Event("ask-vitor:open"))}
            >
              <span className="hero-ai-orb">V</span>
              <span className="hero-ai-copy"><strong>想了解我更多？</strong><small>点击和我的 AI 分身聊聊</small></span>
              <span className="hero-ai-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="hero-visual">
            <figure className="portrait-frame">
              <div className="portrait-index">VITOR DAI · 2026</div>
              <span className="portrait-scan" aria-hidden="true" />
              <img src={asset("portrait.jpg")} alt="戴维多尔在雪中的故宫" />
            </figure>
          </div>
        </section>

        <section className="content-section" id="education">
          <SectionHeading eyebrow="Education" title="教育经历" />
          <div className="education-list" data-reveal>
            <article className="education-row">
              <time>2024.09 —<br />2027.06（预计）</time>
              <img className="school-logo" src={asset("tsinghua-logo.svg")} alt="清华大学校徽" />
              <div className="education-copy">
                <h3>清华大学</h3>
                <p>传播学硕士</p>
                <span>研究方向：智能传播<br />毕业论文方向：机器间传播中的信息转译与意义失真（A2A 智能体协作）</span>
              </div>
            </article>
            <article className="education-row">
              <time>2020.09 —<br />2024.06</time>
              <img className="school-logo" src={asset("ruc-logo.svg")} alt="中国人民大学校徽" />
              <div className="education-copy"><h3>中国人民大学</h3><p>广播电视学学士</p><span>GPA 3.56 / 4 · 卓越奖学金 · “创新杯”二等奖</span></div>
            </article>
          </div>
        </section>

        <section className="content-section" id="experience">
          <SectionHeading eyebrow="Experience" title="实习经历" />
          <div className="experience-list" data-reveal>
            {internships.map((item) => (
              <a className="experience-row" href={`#/experience/${item.id}`} key={item.id}>
                <div className="row-title">
                  <div className="company-logo-frame"><img className={`company-logo company-logo-${item.id}`} src={asset(item.logo)} alt={item.logoAlt} /></div>
                  <div><h3>{item.company}</h3><p>{item.role}</p></div>
                </div>
                <p className="row-summary">{item.summary}</p>
                <span className="row-period">{item.period}</span>
                <span className="row-link">查看详情</span>
              </a>
            ))}
          </div>
        </section>

        <section className="content-section" id="projects">
          <SectionHeading eyebrow="Projects" title="项目经历" />
          <div className="project-list">
            {projects.map((project) => {
              const ProjectShell = project.href ? "a" : "article";
              return (
              <ProjectShell className="project-row" href={project.href} data-reveal key={project.title}>
                <div className="project-image"><img src={asset(project.image)} alt={project.alt} /></div>
                <div className="project-copy">
                  <span className="project-date">{project.date}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {project.href && <span className="project-link">查看详情</span>}
                </div>
              </ProjectShell>
            );
            })}
          </div>
        </section>

        <section className="content-section" id="skills">
          <SectionHeading eyebrow="Capabilities" title="核心能力" />
          <p className="skills-intro" data-reveal>我擅长把模糊的问题拆成可执行的研究、产品和运营动作，并借助 AI 工具更快完成验证与交付。</p>
          <div className="skill-grid" data-reveal>
            <article className="skill-card">
              <span className="skill-number">01</span>
              <h3>用户研究与产品落地</h3>
              <p>通过访谈、问卷与竞品分析识别真实问题，完成需求拆解、PRD、高保真原型和 MVP 推进。</p>
              <div className="skill-tags"><span>用户访谈</span><span>需求分析</span><span>原型设计</span></div>
            </article>
            <article className="skill-card">
              <span className="skill-number">02</span>
              <h3>内容策略与用户增长</h3>
              <p>围绕用户与达人分层、选题策划、账号冷启动和活动运营，建立从内容生产到数据复盘的增长闭环。</p>
              <div className="skill-tags"><span>内容策略</span><span>增长活动</span><span>数据复盘</span></div>
            </article>
            <article className="skill-card">
              <span className="skill-number">03</span>
              <h3>AI 工具与快速开发</h3>
              <p>使用 Codex、Claude Code 与扣子完成需求拆解、原型开发和运营工具搭建，并用 AIGC 辅助内容与视觉创作。</p>
              <div className="skill-tags"><span>Codex</span><span>Claude Code</span><span>扣子</span><span>AIGC 创作</span></div>
            </article>
            <article className="skill-card">
              <span className="skill-number">04</span>
              <h3>数据分析与项目协作</h3>
              <p>使用 SQL、Python、Google Analytics 和飞书多维表格进行基础数据处理，组织业务信息并推动跨团队任务按节奏落地；英语可作为工作语言。</p>
              <div className="skill-tags"><span>SQL / Python</span><span>Google Analytics</span><span>项目推进</span><span>英语可作工作语言</span></div>
            </article>
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="contact-layout" data-reveal>
            <div className="contact-copy">
              <span className="eyebrow">Contact</span>
              <h2>期待与你共事。</h2>
              <p>如果我的经历与团队正在寻找的人选相符，欢迎联系我，进一步交流岗位与彼此的期待。</p>
            </div>
            <div className="contact-list">
              <a href="mailto:vitord@qq.com"><span>邮箱</span><strong>vitord@qq.com</strong></a>
              <a href="tel:18257736072"><span>电话</span><strong>182 5773 6072</strong></a>
              <div><span>微信</span><strong>VITOR011009</strong></div>
              <a href="https://github.com/VITORDAI01" target="_blank" rel="noreferrer"><span>GitHub</span><strong>VITORDAI01</strong></a>
            </div>
          </div>
        </section>
      </main>
      <footer><span>© 2026 VITOR DAI</span><span>持续学习 · 持续创造 · 持续影响</span></footer>
    </div>
  );
}

function DetailPage({ item }) {
  useMotion();
  const [openReport, setOpenReport] = useState(null);
  const current = internships.findIndex((entry) => entry.id === item.id);
  const previous = internships[(current - 1 + internships.length) % internships.length];
  const next = internships[(current + 1) % internships.length];
  const scrollTo = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="page-shell detail-page">
      <div className="scroll-progress" />
      <Header detail />
      <main>
        <section className="detail-hero">
          <img className={`detail-wave detail-wave-${item.id}`} src={asset(item.heroImage || "data-wave.png")} alt="" aria-hidden="true" />
          <a className="back-link" href="#/section/experience">返回实习经历</a>
          <div className="detail-title" data-reveal>
            <h1>{item.company}</h1>
            <h2>{item.role}</h2>
            <time>{item.period}</time>
            <p>{item.descriptor}</p>
          </div>
          <nav className="chapter-nav" aria-label="本页章节">
            <a href={`#/experience/${item.id}`} onClick={scrollTo("background")}>背景与目标</a>
            {item.productStages && <a href={`#/experience/${item.id}`} onClick={scrollTo("stages")}>产品阶段</a>}
            {item.growthFlow && <a href={`#/experience/${item.id}`} onClick={scrollTo("growth-flow")}>增长链路</a>}
            {item.evidence && <a href={`#/experience/${item.id}`} onClick={scrollTo("evidence")}>项目拆解</a>}
            {item.results && <a href={`#/experience/${item.id}`} onClick={scrollTo("results")}>结果与影响</a>}
            <a href={`#/experience/${item.id}`} onClick={scrollTo("reflection")}>复盘与思考</a>
          </nav>
        </section>

        <section className="case-section" id="background">
          <div className="case-content" data-reveal>
            <span className="eyebrow">Background</span><h2>背景与目标</h2><p className="lead">{item.intro}</p>
            {item.proofPoints && <div className="proof-grid">{item.proofPoints.map(([value, copy]) => <article key={value}><strong>{value}</strong><p>{copy}</p></article>)}</div>}
            <div className="goal-grid">{item.goals.map((goal, index) => <article key={goal}><span>0{index + 1}</span><p>{goal}</p></article>)}</div>
          </div>
        </section>

        {item.productStages && (
          <section className="case-section product-stage-section" id="stages">
            <div className="case-content" data-reveal>
              <span className="eyebrow">Product Stages</span><h2>产品阶段时间线</h2>
              <div className="product-stage-timeline">
                {item.productStages.map(([date, title, copy]) => (
                  <article key={`${date}-${title}`}>
                    <time>{date}</time>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {item.growthFlow && (
          <section className="case-section growth-flow-section" id="growth-flow">
            <div className="case-content" data-reveal>
              <span className="eyebrow">Growth Loop</span><h2>{item.id === "ths" ? "中台搭建链路" : "账号增长链路"}</h2>
              <div className="growth-flow-timeline">
                {item.growthFlow.map(([title, copy], index) => (
                  <article key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {item.evidence && (
          <section className="case-section evidence-section" id="evidence">
            <div className="case-content" data-reveal>
              <span className="eyebrow">Cases</span><h2>项目拆解</h2>
              <div className="evidence-stack">
                {item.evidence.map((entry) => (
                  <article className={`case-breakdown case-breakdown-${entry.kind}`} key={entry.title}>
                    <div className="case-breakdown-copy">
                      <span className="eyebrow">{entry.eyebrow}</span>
                      <h3>{entry.title}</h3>
                      {entry.copy && <p>{entry.copy}</p>}
                      {entry.details && <ul>{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                    </div>
                    {entry.kind === "topic" && (
                      <div className="topic-data-panel" aria-label="#同花顺进行曲数据表">
                        <table>
                          <thead><tr><th>指标</th><th>数据</th><th>说明</th></tr></thead>
                          <tbody>{entry.dataRows.map(([label, value, note]) => <tr key={label}><td>{label}</td><td>{value}</td><td>{note}</td></tr>)}</tbody>
                        </table>
                        <div className="topic-metric-cards" aria-label="#同花顺进行曲移动端指标">
                          {entry.dataRows.map(([label, value, note]) => (
                            <article key={label}>
                              <span>{label}</span>
                              <strong>{value}</strong>
                              <p>{note}</p>
                            </article>
                          ))}
                        </div>
                        <div className="topic-bars" aria-hidden="true">
                          <div><span>爆发前日均新增用户</span><i style={{ "--bar": "29%" }} /><strong>6,686</strong></div>
                          <div><span>爆发后日均新增用户</span><i style={{ "--bar": "76%" }} /><strong>17,352</strong></div>
                          <div><span>单日新增用户峰值</span><i style={{ "--bar": "100%" }} /><strong>22,866</strong></div>
                        </div>
                        {entry.mechanics && (
                          <div className="topic-mechanic-grid">
                            {entry.mechanics.map(([title, copy]) => (
                              <article key={title}>
                                <h4>{title}</h4>
                                <p>{copy}</p>
                              </article>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {entry.kind === "tool" && (
                      <div className="tool-panel">
                        <div className="tool-module-list">
                          {entry.modules.map(([title, copy, result]) => <article key={title}><h4>{title}</h4><p>{copy}</p><span>{result}</span></article>)}
                        </div>
                      </div>
                    )}
                    {entry.kind === "agent" && (
                      <div className="agent-plan-panel">
                        {entry.modules.map(([title, duty, output, human], index) => (
                          <article key={title}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <h4>{title}</h4>
                            <p>{duty}</p>
                            <dl>
                              <div><dt>产出物</dt><dd>{output}</dd></div>
                              <div><dt>人工节点</dt><dd>{human}</dd></div>
                            </dl>
                          </article>
                        ))}
                      </div>
                    )}
                    {entry.kind === "report" && (
                      <div className="report-panel">
                        <div className="report-workflow">
                          {entry.modules.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h4>{title}</h4><p>{copy}</p></article>)}
                        </div>
                        <div className="report-dock" aria-label="战报长图展示">
                          {entry.reports.map((report) => (
                            <button className="report-thumb" type="button" key={report.title} onClick={() => setOpenReport(report)}>
                              <img src={asset(report.image)} alt={report.alt} />
                              <span>{report.title}</span>
                              <dl>
                                <div><dt>服务对象</dt><dd>{report.service}</dd></div>
                                <div><dt>核心叙事</dt><dd>{report.narrative}</dd></div>
                                <div><dt>交付用途</dt><dd>{report.use}</dd></div>
                              </dl>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {entry.kind === "activity" && (
                      <div className="activity-gallery" aria-label="AI Ping 活动物料展示">
                        {entry.activities.map((activity) => (
                          <button className={`activity-shot ${activity.variant ? `activity-shot-${activity.variant}` : ""}`} type="button" key={activity.title} onClick={() => setOpenReport(activity)}>
                            <img src={asset(activity.image)} alt={activity.alt} />
                            <span>{activity.title}</span>
                            <dl>
                              <div><dt>目标人群</dt><dd>{activity.audience}</dd></div>
                              <div><dt>转化机制</dt><dd>{activity.mechanism}</dd></div>
                              <div><dt>观察指标</dt><dd>{activity.metric}</dd></div>
                            </dl>
                          </button>
                        ))}
                      </div>
                    )}
                    {entry.kind === "content" && (
                      <div className="content-growth-panel">
                        {entry.modules.map(([title, copy]) => (
                          <article key={title}>
                            <h4>{title}</h4>
                            <p>{copy}</p>
                          </article>
                        ))}
                      </div>
                    )}
                    {entry.kind === "viral" && (
                      <div className="viral-gallery" aria-label="网易有道爆款内容展示">
                        {entry.shots.map((shot) => (
                          <button className="viral-shot" type="button" key={shot.title} onClick={() => setOpenReport(shot)}>
                            <img src={asset(shot.image)} alt={shot.alt} />
                            <span>{shot.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {item.results && (
          <section className="case-section results-section" id="results">
            <div className="case-content" data-reveal>
              <span className="eyebrow">Impact</span><h2>结果与影响</h2>
              <div className="result-grid">{item.results.map(([value, label], index) => <article className={index === 0 ? "primary-result" : ""} key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
            </div>
          </section>
        )}

        <section className="case-section" id="reflection">
          <div className="case-content reflection-content" data-reveal>
            <span className="eyebrow">Reflection</span><h2>复盘与思考</h2><blockquote>{item.reflection}</blockquote>
          </div>
        </section>

        <nav className="case-pagination" aria-label="案例翻页">
          <a href={`#/experience/${previous.id}`}>上一篇 · {previous.company}</a>
          <a href="#/section/experience">返回全部实习经历</a>
          <a href={`#/experience/${next.id}`}>下一篇 · {next.company}</a>
        </nav>
      </main>
      {openReport && (
        <div className="report-lightbox" role="dialog" aria-modal="true" aria-label={openReport.title} onClick={() => setOpenReport(null)}>
          <button className="report-lightbox-close" type="button" onClick={() => setOpenReport(null)}>关闭</button>
          <div className={`report-lightbox-viewport ${openReport.variant === "wide" ? "report-lightbox-viewport-wide" : ""}`} onClick={(event) => event.stopPropagation()}>
            <img src={asset(openReport.image)} alt={openReport.alt} />
          </div>
        </div>
      )}
      <footer><span>© 2026 VITOR DAI</span><a href="mailto:vitord@qq.com">联系我</a></footer>
    </div>
  );
}

function ProjectDetailPage({ item }) {
  useMotion();
  return (
    <div className="page-shell detail-page project-detail-page">
      <div className="scroll-progress" />
      <Header detail />
      <main>
        <section className="detail-hero project-detail-hero">
          <img className="detail-wave" src={asset(item.image)} alt="" aria-hidden="true" />
          <img className="project-decor project-decor-hero" src={asset("jellyfish-detail-decor.png")} alt="" aria-hidden="true" />
          <div className="detail-title" data-reveal>
            <h1>{item.title}</h1>
            <h2>{item.subtitle}</h2>
            <time>{item.date}</time>
            <p>{item.summary}</p>
            <div className="detail-actions">
              <a className="button primary" href={item.repo} target="_blank" rel="noreferrer">查看 GitHub</a>
              <a className="button secondary" href="#/section/projects">回到项目列表</a>
            </div>
          </div>
        </section>

        <section className="case-section" id="background">
          <img className="project-decor project-decor-section" src={asset("jellyfish-detail-decor.png")} alt="" aria-hidden="true" />
          <div className="case-content" data-reveal>
            <span className="eyebrow">Positioning</span><h2>项目定位</h2><p className="lead">{item.intro}</p>
            <div className="goal-grid">{item.goals.map((goal, index) => <article key={goal}><span>0{index + 1}</span><p>{goal}</p></article>)}</div>
          </div>
        </section>

        <section className="case-section" id="workflow">
          <div className="case-content" data-reveal>
            <span className="eyebrow">Workflow</span><h2>工作流设计</h2>
            <figure className="project-case-visual">
              <img src={asset("jellyfish-xhs-news-flow.png")} alt="小水母 AI 助理从输入素材到传播价值判断、角度过滤、组图构建和自检优化的流程插画" />
            </figure>
            <div className="project-module-heading">
              <span>Skill Modules</span>
              <h3>模块设计拆解</h3>
            </div>
            <div className="action-timeline project-action-timeline">{item.actions.map(([title, copy, source]) => <article key={title}>{source && <span className="module-source">{source}</span>}<h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <nav className="case-pagination" aria-label="项目翻页">
          <a href="#/section/projects">返回全部项目经历</a>
          <a href={item.repo} target="_blank" rel="noreferrer">查看项目仓库</a>
          <a href="#/section/contact">联系我</a>
        </nav>
      </main>
      <footer><span>© 2026 VITOR DAI</span><a href="mailto:vitord@qq.com">联系我</a></footer>
    </div>
  );
}

function NotFound() {
  return <main className="not-found"><p>这个页面暂时不存在。</p><a className="button primary" href="#/">返回首页</a></main>;
}

export function App() {
  const route = useHashRoute();
  const detailId = useMemo(() => route.match(/^#\/experience\/([^/]+)/)?.[1], [route]);
  const projectId = useMemo(() => route.match(/^#\/project\/([^/]+)/)?.[1], [route]);
  const section = useMemo(() => route.match(/^#\/section\/([^/]+)/)?.[1], [route]);
  let page;
  if (projectId) {
    const project = projects.find((entry) => entry.id === projectId);
    page = project ? <ProjectDetailPage item={project} /> : <NotFound />;
  } else if (!detailId) {
    page = <HomePage initialTarget={section} />;
  } else {
    const item = internships.find((entry) => entry.id === detailId);
    page = item ? <DetailPage item={item} /> : <NotFound />;
  }
  return <>{page}<AskVitor /></>;
}
