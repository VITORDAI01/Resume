import { useEffect, useMemo, useState } from "react";

const base = import.meta.env.BASE_URL;
const asset = (name) => `${base}assets/${name}`;

const internships = [
  {
    id: "ths",
    index: "01",
    company: "同花顺",
    logo: "ths-logo.png",
    logoAlt: "同花顺标志",
    role: "达人运营实习生 · B2C 平台运营",
    period: "2026.03 — 至今",
    summary: "围绕抖音达人合作、话题内容扩散和看后搜转化做运营推进，并用轻量工具沉淀达人数据与合作证据。",
    descriptor: "把达人内容、平台话题和新增用户链路连接起来",
    heroImage: "ths-social-growth-bg.png",
    intro: "在同花顺 B2C 平台运营中，我主要负责达人 BD、账号分层、选题匹配、内容跟进、社群维护和合作复盘。2026 年 H1，同花顺整体新增用户中 17% 来自社媒渠道；抖音作为主阵地，看后搜约 80% 来自达人内容。这说明达人运营不只是做曝光，而是在影响用户从“看到内容”到“主动搜索/下载”的关键转化动作。",
    proofPoints: [
      ["17%", "2026 年 H1 同花顺整体新增用户来自社媒渠道，社媒已经成为新增用户来源之一。"],
      ["80%", "抖音渠道看后搜约 80% 来自达人内容，达人合作直接影响用户主动搜索行为。"],
      ["闭环", "从达人筛选、选题共创、发布跟进到数据复盘，形成可持续迭代的内容运营链路。"],
    ],
    goals: ["建立可持续的达人供给池，区分财经、校园、音乐翻唱、剧情段子等不同账号类型", "把传播话题拆成达人能执行的内容方向，提升曝光、互动和看后搜承接", "把合作视频、达人身份、内容分类和数据反馈沉淀为可追踪的运营资产"],
    actions: [
      ["达人池分层", "按账号内容形态和受众场景拆分达人池，区分财经解读、校园生活、音乐翻唱、剧情段子等类型；记录达人身份、内容能力、合作状态和适配话题，避免每次合作从零筛选。"],
      ["话题内容转译", "参与 #同花顺手游、#同花顺进行曲 等重点话题执行，把品牌侧传播目标翻译成达人可拍、用户愿意停留的内容角度，并根据不同达人类型调整脚本方向。"],
      ["校园社群推进", "运营 2 个大学生博主社群，跟进选题共创、发布节奏、素材反馈和数据回收；通过群内提醒、案例拆解和节奏管理提升持续产出稳定性。"],
      ["运营中台沉淀", "基于 Streamlit 和飞书多维表格沉淀达人运营中台，把待采集作品链接转成可复盘、可投流、可归档的数据，支持合作日期重采集、周复盘和月复盘口径。"],
    ],
    evidence: [
      {
        kind: "topic",
        eyebrow: "Topic Case",
        title: "#同花顺进行曲 内容策略复盘",
        copy: "这个话题项目用于观察 #同花顺进行曲 词条爆发前后的新增用户变化。词条爆发节点出现在 4 月 7 日，爆发后 7 天的日均新增用户明显抬升，说明话题扩散不只停留在曝光层，也在新增用户趋势上形成了可观察的变化。",
        dataRows: [
          ["爆发前日均新增", "6,686", "4/1-4/6，作为词条爆发前的基准期。"],
          ["爆发后日均新增", "17,352", "4/7-4/13，词条爆发后的连续观察期。"],
          ["日均新增提升", "2.6x", "爆发后日均新增约为爆发前的 2.6 倍。"],
          ["单日新增峰值", "22,866", "4 月 9 日达到阶段最高新增。"],
        ],
        details: ["数据观察区间为 2026.03.20 至 2026.04.13，4 月 7 日作为词条爆发节点。", "复盘重点不只看曝光峰值，而是对比爆发前后新增用户的趋势变化。"],
      },
      {
        kind: "tool",
        eyebrow: "Tooling",
        title: "达人运营中台",
        image: "ths-platform-overview.jpg",
        alt: "达人运营中台主面板截图",
        copy: "达人运营中台是为周复盘、月复盘和内容策略分析服务的内部工具。它把飞书多维表格里的达人作品链接、合作日期、视频数据和复盘字段统一到一个可操作入口，减少人工打开链接、回填表格和重复核对。",
        modules: [
          ["开始数据采集", "日常新增作品链接进入飞书“达人视频链接”表后，自动读取待采集记录，打开抖音作品并抓取达人昵称、抖音号、粉丝数、发布时间、标题和互动量。", "结果会写入“达人视频数据上交投流”，同步内容分级，并维护达人主档。"],
          ["数据重采集", "周复盘或阶段复盘前，按合作日期范围重新读取作品互动量，避免只停留在首次提交时的数据。", "支持写入飞书周度重采集表，也可以导出 Excel，用于复盘前的数据刷新。"],
          ["达人主档维护", "按抖音号 upsert 达人信息汇总，更新粉丝数，并追加合作视频关系。", "让达人池从一次性合作名单变成可追踪、可复用的运营资产。"],
          ["复盘页面", "按周度重采集记录或采集日范围查看新增达人、分组概览、采集日趋势、达人贡献排行和爆款明细。", "内容策略页可按话题词观察曝光趋势、排行、环比变化和话题明细。"],
          ["登录维护", "当抖音 cookies 失效、需要扫码或验证码时，从面板触发重新登录。", "登录完成后保存新的状态，再继续采集或重采集任务。"],
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
          },
          {
            title: "ETF 新势界高校挑战赛",
            image: "ths-report-etf-campaign.png",
            alt: "ETF 新势界高校挑战赛战报长图",
          },
        ],
      },
    ],
    reflection: "这段经历让我更明确：达人运营的核心不是把内容发出去，而是把平台、达人和用户搜索行为串成一条可验证的链路。社媒新增用户占比和抖音看后搜数据，能证明达人内容对业务增长有实际贡献；工具化沉淀则让团队把时间留给判断、沟通和复盘，而不是重复核对。",
  },
  {
    id: "aiping",
    index: "02",
    company: "清程极智 / AI Ping",
    logo: "aiping-logo.svg",
    logoAlt: "AI Ping 标志",
    heroImage: "aiping-hero-bg.png",
    role: "产品运营实习生",
    period: "2025.08 — 2025.11",
    summary: "参与产品全生命周期运营，以用户研究推动体验优化，并搭建内容与增长活动体系。",
    descriptor: "围绕产品内测、用户反馈、体验优化和增长活动，推动开发者完成从了解产品到首次使用的转化",
    intro: "从产品内测到增长活动，围绕开发者的真实使用路径寻找问题，并把调研洞察转化为产品和运营动作。",
    goals: ["搭建产品内测体系并明确核心用户画像", "降低开发者从了解产品到实际调用的迁移成本", "建立可持续的内容矩阵和增长活动机制"],
    actions: [
      ["定向招募", "通过开发者社区招募 20 名目标用户，覆盖个人开发者与企业客户。"],
      ["问卷 + 深访", "收集使用反馈，识别跳转链路、延迟评测和模型迁移中的关键问题。"],
      ["推动优化", "提出跳转路径简化、P90 延迟评测等方案，并推动落地至正式版本。"],
      ["增长实验", "运营内容矩阵，联动外部渠道，并以热门模型限免降低首次使用门槛。"],
    ],
    evidence: [
      {
        kind: "activity",
        eyebrow: "Campaigns",
        title: "活动策划、对接与实施",
        copy: "围绕 AI Ping 的开发者增长和高校场景触达，我参与活动方案策划、合作方沟通、福利机制设计、物料落地和发布执行，把产品权益转化成用户愿意参与的活动入口。",
        details: ["对接清华创协与昆山杯清华大学创业大赛，为参赛队伍配置 Token 赠金权益，降低团队试用门槛。", "策划程序员节限定福利活动，结合节日节点、社群传播和二维码入口，引导开发者进群领取算力点。"],
        activities: [
          {
            title: "清华大学创业大赛合作",
            image: "aiping-tsinghua-startup.png",
            alt: "AI Ping 为昆山杯清华大学创业大赛参赛队伍提供 Token 赠金的活动横幅",
          },
          {
            title: "程序员节 Token 福利",
            image: "aiping-programmer-day.png",
            alt: "清程极智 AI Ping 程序员节送 Token 福利活动海报",
          },
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
    summary: "从 0 到 1 搭建区域与全国账号矩阵，以差异化内容策略获得自然流量并为直播间导流。",
    descriptor: "以内容实验驱动账号冷启、自然增长与直播转化",
    intro: "在无投流条件下负责五个账号的冷启动，覆盖账号规划、内容协同、数据分析与直播导流。",
    goals: ["完成四个区域账号和一个全国账号的冷启动", "寻找比传统口播更有效的内容形式", "根据不同区域用户特征建立差异化内容策略"],
    actions: [
      ["竞品分析", "复盘口播类内容的表现与转化效率，识别内容形式上的优化空间。"],
      ["调整结构", "主动调整账号内容形式比例，以更适合平台消费习惯的选题承接目标用户。"],
      ["区域策略", "根据各区域用户特征制定差异化选题，各账号周均更新 3–4 篇内容。"],
      ["数据复盘", "持续观察曝光、涨粉与直播导流表现，用结果修正下一周期内容。"],
    ],
    results: [
      ["3000万+", "累计自然流量"],
      ["5万+", "累计涨粉"],
      ["120万+", "单条最高曝光"],
      ["5 个", "从 0 到 1 搭建账号"],
    ],
    reflection: "账号增长不是内容数量的简单累积。把受众差异、内容形式和业务转化放在同一个复盘框架里，才能让自然流量成为可重复的方法。",
  },
];

const projects = [
  {
    id: "jellyfish-xhs-news",
    title: "小水母 AI 助理配图与小红书组图 Skill",
    date: "2026.06",
    image: "jellyfish-xhs-news-hero.png",
    alt: "小水母 AI 助理把 AI 新闻整理成小红书组图的手绘插画",
    summary: "面向中文内容创作的 Codex Skill，将 AI 新闻、日报和长文章转成带固定视觉 IP 的正文配图与小红书轮播方案。",
    tags: ["Codex Skill", "内容工作流", "AIGC 视觉 IP"],
    href: "#/project/jellyfish-xhs-news",
    subtitle: "从新闻判断到组图生成的个人 IP 内容工作流",
    repo: "https://github.com/VITORDAI01/jellyfish-xhs-news",
    intro: "这个项目把“小水母 AI 助理”设定为固定视觉角色，用它连接、过滤、托举和解开信息，帮助中文创作者把 AI 新闻、文章观点和方法论内容转化成可发布的正文配图或小红书 3:4 轮播组图。",
    goals: ["建立可复用的角色型视觉 IP，而不是每次临时换风格", "让 AI 新闻先经过传播价值判断，再进入组图规划", "把生图提示词、页面结构和生成后质检沉淀成可执行规范"],
    actions: [
      ["角色设定", "定义小水母的伞盖、信息触须、皇冠夹、表情和动作规则，保证每张图都能被识别为同一 IP。"],
      ["内容转译", "设计新闻事实、读者价值、视觉锚点和风险点的提炼流程，把信息从摘要转成可视化结构。"],
      ["组图工作流", "沉淀小红书封面、事实页、重要性页、影响页、行动页和结尾页的默认节奏。"],
      ["质量检查", "用角色一致性、白底留白、中文可读性、禁忌风格和传播钩子做生成后自检。"],
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
                <span>研究方向：新媒体传播、AIGC 应用<br />毕业论文方向：机器间传播中的信息转译与意义失真（A2A 智能体协作）</span>
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
                  {project.href && <span className="project-link">查看子页面</span>}
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
              <p>使用 Claude Code（CC）与 Codex 完成需求拆解、原型开发和运营工具搭建，并用 AIGC 辅助内容与视觉创作。</p>
              <div className="skill-tags"><span>Claude Code</span><span>Codex</span><span>AIGC 创作</span></div>
            </article>
            <article className="skill-card">
              <span className="skill-number">04</span>
              <h3>数据分析与项目协作</h3>
              <p>使用 SQL、Python 和飞书多维表格进行基础数据处理，组织业务信息并推动跨团队任务按节奏落地。</p>
              <div className="skill-tags"><span>SQL / Python</span><span>项目推进</span><span>英文沟通</span></div>
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
            <a href={`#/experience/${item.id}`} onClick={scrollTo("actions")}>我做了什么</a>
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

        <section className="case-section" id="actions">
          <div className="case-content" data-reveal>
            <span className="eyebrow">Actions</span><h2>我做了什么</h2>
            <div className="action-timeline">{item.actions.map(([title, copy], index) => <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

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
                      <p>{entry.copy}</p>
                      {entry.details && <ul>{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                    </div>
                    {entry.kind === "topic" && (
                      <div className="topic-data-panel" aria-label="#同花顺进行曲数据表">
                        <table>
                          <thead><tr><th>指标</th><th>数据</th><th>说明</th></tr></thead>
                          <tbody>{entry.dataRows.map(([label, value, note]) => <tr key={label}><td>{label}</td><td>{value}</td><td>{note}</td></tr>)}</tbody>
                        </table>
                        <div className="topic-bars" aria-hidden="true">
                          <div><span>爆发前日均</span><i style={{ "--bar": "39%" }} /><strong>6,686</strong></div>
                          <div><span>爆发后日均</span><i style={{ "--bar": "100%" }} /><strong>17,352</strong></div>
                          <div><span>单日峰值</span><i style={{ "--bar": "132%" }} /><strong>22,866</strong></div>
                        </div>
                      </div>
                    )}
                    {entry.kind === "tool" && (
                      <div className="tool-panel">
                        <figure><img src={asset(entry.image)} alt={entry.alt} /></figure>
                        <div className="tool-module-list">
                          {entry.modules.map(([title, copy, result]) => <article key={title}><h4>{title}</h4><p>{copy}</p><span>{result}</span></article>)}
                        </div>
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
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {entry.kind === "activity" && (
                      <div className="activity-gallery" aria-label="AI Ping 活动物料展示">
                        {entry.activities.map((activity) => (
                          <button className="activity-shot" type="button" key={activity.title} onClick={() => setOpenReport(activity)}>
                            <img src={asset(activity.image)} alt={activity.alt} />
                            <span>{activity.title}</span>
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
          <div className="report-lightbox-viewport" onClick={(event) => event.stopPropagation()}>
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
            <div className="action-timeline project-action-timeline">{item.actions.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
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
  if (projectId) {
    const project = projects.find((entry) => entry.id === projectId);
    return project ? <ProjectDetailPage item={project} /> : <NotFound />;
  }
  if (!detailId) return <HomePage initialTarget={section} />;
  const item = internships.find((entry) => entry.id === detailId);
  return item ? <DetailPage item={item} /> : <NotFound />;
}
