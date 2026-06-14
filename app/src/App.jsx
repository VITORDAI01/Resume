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
    summary: "围绕达人分层、内容策略和合作复盘推进增长，并用 Vibe Coding 搭建达人运营中台。",
    descriptor: "连接内容创作者、平台话题与运营效率",
    intro: "负责达人 BD、分层管理、内容策略制定、合作跟进与数据复盘，同时探索用轻量工具改善高频运营流程。",
    goals: ["提升不同类型达人的内容产出稳定性", "放大重点传播话题的参与度与曝光", "减少达人数据核对与证据归档的重复劳动"],
    actions: [
      ["达人分层", "围绕财经、校园、音乐翻唱、剧情段子等达人类型，制定差异化选题方向。"],
      ["话题策划", "参与 #同花顺手游、#同花顺进行曲 等重点传播话题的策划与执行。"],
      ["校园孵化", "运营 2 个大学生博主社群，通过选题共创、节奏管理与数据反馈提升稳定产出。"],
      ["工具搭建", "用 Vibe Coding 对接飞书多维表格，完成身份同步、内容分类与合作视频证据归档。"],
    ],
    results: [
      ["3亿+", "#同花顺进行曲累计曝光"],
      ["4000万+", "#同花顺手游累计曝光"],
      ["80%+", "达人数据处理效率提升"],
      ["约 10 秒", "单条数据核对与分类耗时"],
    ],
    reflection: "传播结果来自选题、达人匹配和执行节奏的共同作用；运营工具的价值，则在于让团队把时间重新投入判断与沟通，而非重复核对。",
  },
  {
    id: "aiping",
    index: "02",
    company: "清程极智 / AI Ping",
    logo: "aiping-logo.svg",
    logoAlt: "AI Ping 标志",
    role: "产品运营实习生",
    period: "2025.08 — 2025.11",
    summary: "参与产品全生命周期运营，以用户研究推动体验优化，并搭建内容与增长活动体系。",
    descriptor: "大模型性能评测与优化平台，服务 AI 开发者和企业客户",
    intro: "从产品内测到增长活动，围绕开发者的真实使用路径寻找问题，并把调研洞察转化为产品和运营动作。",
    goals: ["搭建产品内测体系并明确核心用户画像", "降低开发者从了解产品到实际调用的迁移成本", "建立可持续的内容矩阵和增长活动机制"],
    actions: [
      ["定向招募", "通过开发者社区招募 20 名目标用户，覆盖个人开发者与企业客户。"],
      ["问卷 + 深访", "收集使用反馈，识别跳转链路、延迟评测和模型迁移中的关键问题。"],
      ["推动优化", "提出跳转路径简化、P90 延迟评测等方案，并推动落地至正式版本。"],
      ["增长实验", "运营内容矩阵，联动外部渠道，并以热门模型限免降低首次使用门槛。"],
    ],
    results: [
      ["+500%", "限免活动当周新注册用户周环比"],
      ["+900%", "Tokens 消耗量周环比"],
      ["破万", "累计注册用户"],
      ["500+", "内容矩阵自然增长用户"],
      ["十亿量级", "日均 Tokens 消耗"],
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
    title: "知脉 ResearchWiki",
    date: "2026.04",
    image: "researchwiki.png",
    alt: "ResearchWiki 桌面应用界面展示",
    summary: "面向学生论文写作场景的本地 AI 文献 Wiki。基于 27 份用户调研完成需求分析、MVP PRD、高保真原型与 PC 端开发。",
    tags: ["用户研究", "产品设计", "全栈开发"],
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
            {projects.map((project) => (
              <article className="project-row" data-reveal key={project.title}>
                <div className="project-image"><img src={asset(project.image)} alt={project.alt} /></div>
                <div className="project-copy">
                  <span className="project-date">{project.date}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
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
          <img className="detail-wave" src={asset("data-wave.png")} alt="" aria-hidden="true" />
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
            <a href={`#/experience/${item.id}`} onClick={scrollTo("results")}>结果与影响</a>
            <a href={`#/experience/${item.id}`} onClick={scrollTo("reflection")}>复盘与思考</a>
          </nav>
        </section>

        <section className="case-section" id="background">
          <div className="case-content" data-reveal>
            <span className="eyebrow">Background</span><h2>背景与目标</h2><p className="lead">{item.intro}</p>
            <div className="goal-grid">{item.goals.map((goal, index) => <article key={goal}><span>0{index + 1}</span><p>{goal}</p></article>)}</div>
          </div>
        </section>

        <section className="case-section" id="actions">
          <div className="case-content" data-reveal>
            <span className="eyebrow">Actions</span><h2>我做了什么</h2>
            <div className="action-timeline">{item.actions.map(([title, copy], index) => <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="case-section results-section" id="results">
          <div className="case-content" data-reveal>
            <span className="eyebrow">Impact</span><h2>结果与影响</h2>
            <div className="result-grid">{item.results.map(([value, label], index) => <article className={index === 0 ? "primary-result" : ""} key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
          </div>
        </section>

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
  const section = useMemo(() => route.match(/^#\/section\/([^/]+)/)?.[1], [route]);
  if (!detailId) return <HomePage initialTarget={section} />;
  const item = internships.find((entry) => entry.id === detailId);
  return item ? <DetailPage item={item} /> : <NotFound />;
}
