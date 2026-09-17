(() => {
  const root = document.documentElement;
  const path = window.location.pathname;
  const base = document.body.dataset.base || (path.includes("/about/") || path.includes("/resume/") ? "../" : "");
  const isDetail = path.endsWith("project-detail.html");
  const wordmark = `MY PORTFOLIO`;
  const nav = `<header class="site-nav"><a class="wordmark" href="${base}index.html" aria-label="返回首页">${wordmark}</a><nav aria-label="主导航"><a data-nav-page="home" href="${base}index.html">首页</a><a data-nav-page="work" href="${base}index.html#selected-works">作品</a><a data-nav-page="resume" href="${base}resume/index.html">简历</a></nav></header>`;
  document.querySelectorAll("[data-site-nav]").forEach(el => el.innerHTML = nav);
  const activePage = isDetail ? "work" : path.includes("/resume/") ? "resume" : "home";
  document.querySelectorAll("[data-nav-page]").forEach(link => link.classList.toggle("is-active", link.dataset.navPage === activePage));
  function renderDetailHeader(previous, next) {
    const backArrow = `<svg class="detail-header__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 3.5 6 8l4.5 4.5M6.5 8H14"/></svg>`;
    const forwardArrow = `<svg class="detail-header__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="m5.5 3.5L10 8l-4.5 4.5M9.5 8H2"/></svg>`;
    const detailNav = `<header class="detail-header"><div class="detail-header__inner"><a class="detail-header__back" href="index.html#selected-works">${backArrow}<span>返回作品</span></a><nav class="detail-header__main" aria-label="主导航"><a href="index.html">首页</a><a class="is-active" href="index.html#selected-works" aria-current="page">作品</a><a href="resume/index.html">简历</a></nav><nav class="detail-header__pager" aria-label="项目切换"><a href="project-detail.html?id=${previous.id}" aria-label="上一个项目：${previous.title}">${backArrow}<span>${previous.title}</span></a><a href="project-detail.html?id=${next.id}" aria-label="下一个项目：${next.title}"><span>${next.title}</span>${forwardArrow}</a></nav></div></header>`;
    document.querySelectorAll("[data-site-nav]").forEach(el => el.innerHTML = detailNav);
    const header = document.querySelector(".detail-header");
    const syncDetailHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", syncDetailHeader, { passive: true });
    syncDetailHeader();
  }
  if (document.body.classList.contains("home-page")) {
    const navHost = document.querySelector("[data-site-nav]");
    const hero = document.querySelector(".home-hero");
    const syncFloatingNav = () => navHost.classList.toggle("is-floating", window.scrollY >= hero.offsetTop + hero.offsetHeight - 48);
    window.addEventListener("scroll", syncFloatingNav, { passive: true });
    syncFloatingNav();
  }
  document.querySelectorAll("[data-site-footer]").forEach(el => el.innerHTML = document.body.classList.contains("home-page") ? `<footer class="site-footer container"><span>© 2026 Muyu. All rights reserved.</span><span class="placeholder">Email / 简历</span></footer>` : `<footer class="site-footer container"><span>© ${new Date().getFullYear()} / 姓名</span><span class="placeholder">联系方式 / Email / 简历</span></footer>`);
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) root.dataset.theme = saved;
  if (document.querySelector("[data-project-list]")) {
    document.querySelector("[data-project-list]").innerHTML = window.projects.map((p, i) => { const homeCopy = { "project-01": { type: "工具产品", subtitle: "为英语学习者设计的沉浸式精听工具，让听力练习更高效、更持续。", tags: ["桌面端", "学习工具", "个人项目"] }, "project-02": { type: "产品改版", subtitle: "重构户外路线发现与决策体验，让用户更快找到适合自己的路线。", tags: ["移动端", "社区产品", "UX 改版"] }, "project-03": { type: "效率工具", subtitle: "随手记录、轻松找回，一个为灵感和思考设计的个人知识收件箱。", tags: ["桌面端", "效率工具", "个人项目"] } }[p.id]; const cover = document.body.classList.contains("home-page") && p.id === "project-01" ? "linguaflow-final-1440.png" : p.cover; const type = homeCopy && document.body.classList.contains("home-page") ? homeCopy.type : p.type; const subtitle = homeCopy && document.body.classList.contains("home-page") ? homeCopy.subtitle : p.subtitle; const tags = homeCopy && document.body.classList.contains("home-page") ? homeCopy.tags.map(tag => `<span>${tag}</span>`).join("") : ""; return `<a class="project-card" href="project-detail.html?id=${p.id}"><div class="project-image"><img src="${cover}" alt="${p.title} 项目封面" loading="${i ? "lazy" : "eager"}"></div><div class="project-meta"><div><p class="eyebrow">${String(i + 1).padStart(2, "0")} / ${type}</p><h3>${p.title}</h3><p class="project-subtitle">${subtitle}</p>${tags ? `<div class="project-tags">${tags}</div>` : ""}</div><span class="project-year">${document.body.classList.contains("home-page") && p.id !== "project-01" ? "待补充" : p.year}</span><span class="view-project">View Project <span aria-hidden="true">↗</span></span></div></a>`; }).join("");
  }
  if (isDetail) renderProject();
  function renderProject() {
    const id = new URLSearchParams(location.search).get("id") || window.projects[0].id;
    const p = window.projects.find(item => item.id === id) || window.projects[0];
    if (p.caseStudy) {
      renderLinguaFlow(p);
      return;
    }
    document.title = `${p.title} — UX/UI Designer Portfolio`;
    const currentIndex = window.projects.indexOf(p);
    const previous = window.projects[(currentIndex - 1 + window.projects.length) % window.projects.length];
    const next = window.projects[(currentIndex + 1) % window.projects.length];
    renderDetailHeader(previous, next);
    const media = type => `<div class="media-placeholder media-${type}"><span>[${type} image placeholder]</span></div>`;
    document.getElementById("project-detail").innerHTML = `<section class="project-hero container"><p class="eyebrow">${p.type} / ${p.year}</p><h1>${p.title}</h1><p class="project-lede">${p.subtitle}</p><dl class="project-facts"><div><dt>Role</dt><dd>${p.role}</dd></div><div><dt>Timeline</dt><dd>${p.timeline}</dd></div><div><dt>Tools</dt><dd>${p.tools}</dd></div></dl><img class="hero-cover" src="${p.cover}" alt="${p.title} cover placeholder"></section><section class="detail-section container"><p class="eyebrow">01 / OVERVIEW</p><div class="overview-grid"><div><h2>Problem</h2><p>${p.sections.overview.problem}</p></div><div><h2>Goal</h2><p>${p.sections.overview.goal}</p></div><div><h2>My Role</h2><p>${p.sections.overview.role}</p></div></div></section><section class="detail-section detail-split container"><div><p class="eyebrow">02 / RESEARCH</p><h2>Research</h2></div><p>${p.sections.research}</p></section><section class="detail-section container"><p class="eyebrow">03 / DESIGN PROCESS</p><div class="process-list">${p.sections.process.map((item, i) => `<div><span>0${i + 1}</span><h2>${item}</h2><p class="placeholder">[Content placeholder]</p></div>`).join("")}</div></section><section class="detail-section final-design container"><p class="eyebrow">04 / FINAL DESIGN</p><h2>Final Design</h2><div class="media-stack">${p.sections.finalDesign.map(media).join("")}</div></section><section class="detail-section reflection container"><p class="eyebrow">05 / REFLECTION</p><div class="overview-grid"><div><h2>What I Learned</h2><p>${p.sections.reflection.learned}</p></div><div><h2>Next Steps</h2><p>${p.sections.reflection.next}</p></div></div></section><a class="next-project container" href="project-detail.html?id=${next.id}"><span class="eyebrow">NEXT PROJECT</span><strong>${next.title} <span aria-hidden="true">→</span></strong></a>`;
    const detail = document.getElementById("project-detail");
    detail.innerHTML = detail.innerHTML.replaceAll("My Role", "我的角色").replaceAll("What I Learned", "我的收获").replaceAll("Next Steps", "下一步").replaceAll("Design Process", "设计流程").replaceAll("Final Design", "最终设计").replaceAll("Information Architecture", "信息架构").replaceAll("User Flow", "用户流程").replaceAll("Wireframes", "线框图").replaceAll("Design Exploration", "设计探索").replaceAll("UI Design", "界面设计").replaceAll("Role", "角色").replaceAll("Timeline", "时间").replaceAll("Tools", "工具").replaceAll("Overview", "概览").replaceAll("Problem", "问题").replaceAll("Goal", "目标").replaceAll("Research", "用户研究").replaceAll("Reflection", "复盘").replaceAll("Content placeholder", "内容占位").replaceAll("image placeholder", "图片占位").replaceAll("Problem placeholder", "问题占位").replaceAll("Goal placeholder", "目标占位").replaceAll("My role placeholder", "我的角色占位").replaceAll("User research, data, and user pain points placeholder", "用户研究、数据和用户痛点占位").replaceAll("What I learned placeholder", "我的收获占位").replaceAll("Next steps placeholder", "下一步占位");
  }

  function caseMedia(label, variant = "wide") {
    return `<div class="case-media case-media--${variant}" role="img" aria-label="${label}，待补充图片"><span>${label}<b>待补充图片</b></span></div>`;
  }

  function renderLinguaFlow(p) {
    const c = p.caseStudy;
    document.title = "LinguaFlow — UX/UI 设计作品集";
    const currentIndex = window.projects.indexOf(p);
    const previous = window.projects[(currentIndex - 1 + window.projects.length) % window.projects.length];
    const next = window.projects[(currentIndex + 1) % window.projects.length];
    renderDetailHeader(previous, next);
    const goals = c.goals.map((item, i) => `<li><span>0${i + 1}</span>${item}</li>`).join("");
    const flow = c.flow.map((item, i) => `<li><span>0${i + 1}</span><strong>${item}</strong>${i < c.flow.length - 1 ? `<i aria-hidden="true">→</i>` : ""}</li>`).join("");
    const controls = c.listening.controls.map(item => `<li>${item}</li>`).join("");
    const context = c.captions.context.map((item, i) => `<div class="context-row${i === 1 ? " is-current" : ""}"><span>${i === 1 ? "当前句" : item}</span><b>${i === 1 ? "正在学习的字幕句子" : "字幕上下文占位"}</b></div>`).join("");
    const modes = c.captions.modes.map((item, i) => `<span class="mode${i === 2 ? " is-active" : ""}">${item}</span>`).join("");
    const vocabularyFlow = c.vocabulary.flow.map((item, i) => `<li><span>0${i + 1}</span><strong>${item}</strong>${i < c.vocabulary.flow.length - 1 ? `<i aria-hidden="true">→</i>` : ""}</li>`).join("");
    const records = c.records.items.map(item => `<li>${item}</li>`).join("");
    const iterations = c.iterations.map((item, i) => `<article class="iteration-item"><p class="case-index">迭代 0${i + 1}</p><h3>${item}</h3><div class="iteration-flow"><span>旧版</span><i>↓</i><span>发现的问题</span><i>↓</i><span>设计调整</span><i>↓</i><span>新版</span></div><div class="iteration-images">${caseMedia("旧版截图", "small")}${caseMedia("新版截图", "small")}</div><p class="placeholder">待补充真实迭代内容</p></article>`).join("");
    const finalDesign = c.finalDesign.map((item, i) => caseMedia(item, ["wide", "duo", "wide", "duo", "wide", "duo"][i])).join("");
    const reflection = c.reflection.map((item, i) => `<article><span>0${i + 1}</span><h3>${item}</h3><p class="placeholder">待补充真实内容</p></article>`).join("");

    const caseStudySlides = [1, 8, 11, 16, 17, 18, 19, 20, 22, 23, 25, 27, 28, 30];
    const slideMarkup = caseStudySlides.map((number, i) => `<figure class="case-study-slide"${[1, 11, 16, 22, 27].includes(number) ? ` data-chapter-start="true"` : ""}><img src="2x导出/Slide 16_9 - ${number}.png" alt="LinguaFlow Case Study 第 ${number} 页" loading="${i ? "lazy" : "eager"}"></figure>`).join("");
    if (caseStudySlides.length) {
      document.getElementById("project-detail").innerHTML = `<section class="case-study-slides" aria-label="LinguaFlow Case Study 页面">${slideMarkup}</section>`;
      return;
    }

    document.getElementById("project-detail").innerHTML = `<header class="case-hero container"><div class="case-hero-copy"><p class="case-kicker">个人产品 / UX/UI 设计</p><h1>${p.title}</h1><p class="case-lede">${p.subtitle}</p><dl class="case-facts"><div><dt>项目类型</dt><dd>${p.type}</dd></div><div><dt>我的角色</dt><dd>${p.role}</dd></div><div><dt>开发方式</dt><dd>${p.tools}</dd></div></dl></div>${caseMedia("LinguaFlow 主界面", "hero")}</header><nav class="case-index container" aria-label="案例章节导航"><a href="#background">背景</a><a href="#problems">核心问题</a><a href="#goals">设计目标</a><a href="#flow">核心流程</a><a href="#listening">句级精听</a><a href="#captions">字幕与上下文</a><a href="#vocabulary">个人词库</a><a href="#records">学习记录</a><a href="#iterations">关键迭代</a><a href="#final-design">最终体验</a><a href="#reality">真实产品</a><a href="#reflection">反思</a></nav><main class="case-study"><section id="background" class="case-section container"><div class="case-heading"><p class="case-index-label">01 / 项目背景</p><h2>${c.background.title}</h2></div><div class="case-prose case-prose--wide"><p>${c.background.body}</p><p class="case-note">${c.background.note}</p></div></section><section id="problems" class="case-section case-section--tight container"><div class="case-heading"><p class="case-index-label">02 / 核心问题</p><h2>精听真正被什么打断？</h2></div><div class="problem-grid">${c.problems.map((item, i) => `<article><span>0${i + 1}</span><h3>${item.title}</h3><p>${item.body}</p></article>`).join("")}</div></section><section id="goals" class="case-section container"><div class="case-heading"><p class="case-index-label">03 / 设计目标</p><h2>我希望把精听变成一条连续的学习流程</h2></div><ol class="goal-list">${goals}</ol></section><section id="flow" class="case-section container"><div class="case-heading"><p class="case-index-label">04 / 核心学习流程</p><h2>从看视频，到完成一次学习</h2></div><ol class="case-flow">${flow}</ol></section><section id="listening" class="case-section case-section--feature container"><div class="case-heading"><p class="case-index-label">05 / 核心体验</p><h2>${c.listening.title}</h2><p>${c.listening.body}</p></div><div class="feature-layout"><div><p class="case-mini-title">一次学习循环</p><ol class="loop-list">${c.listening.loop.map((item, i) => `<li><span>0${i + 1}</span>${item}</li>`).join("")}</ol><ul class="tag-list">${controls}</ul></div>${caseMedia("句级精听播放器", "feature")}</div></section><section id="captions" class="case-section container"><div class="case-heading"><p class="case-index-label">06 / 字幕与上下文</p><h2>${c.captions.title}</h2><p>${c.captions.body}</p></div><div class="caption-layout"><div class="caption-stack">${context}</div><div class="caption-side"><p class="case-mini-title">字幕模式</p><div class="mode-list">${modes}</div>${caseMedia("字幕界面细节", "small")}</div></div></section><section id="vocabulary" class="case-section container"><div class="case-heading"><p class="case-index-label">07 / 收藏与词库</p><h2>${c.vocabulary.title}</h2><p>${c.vocabulary.body}</p></div><ol class="case-flow case-flow--compact">${vocabularyFlow}</ol>${caseMedia("收藏单词与个人词库", "wide")}</section><section id="records" class="case-section container"><div class="case-heading"><p class="case-index-label">08 / 收藏句子与学习记录</p><h2>${c.records.title}</h2><p>${c.records.body}</p></div><div class="records-layout"><ul class="records-list">${records}</ul>${caseMedia("学习记录界面", "small")}</div></section><section id="iterations" class="case-section container"><div class="case-heading"><p class="case-index-label">09 / 关键迭代</p><h2>设计不是一次完成的</h2><p class="placeholder">以下先预留结构，旧版截图和具体调整原因待补充。</p></div><div class="iteration-grid">${iterations}</div></section><section id="final-design" class="case-section case-section--final container"><div class="case-heading"><p class="case-index-label">10 / 最终界面展示</p><h2>最终体验</h2></div><div class="final-grid">${finalDesign}</div></section><section id="reality" class="case-section case-section--dark container"><div class="case-heading"><p class="case-index-label">11 / 从设计到真实产品</p><h2>让设计真正运行起来</h2><p>${c.reality.body}</p></div><div class="reality-layout"><div><p class="case-mini-title">技术标签</p><ul class="tag-list tag-list--large">${c.reality.tags.map(item => `<li>${item}</li>`).join("")}</ul></div><div><p class="case-mini-title">落地能力</p><ul class="proof-list">${c.reality.proof.map(item => `<li>${item}</li>`).join("")}</ul></div></div></section><section id="reflection" class="case-section container"><div class="case-heading"><p class="case-index-label">12 / 反思与下一步</p><h2>这次项目让我学到了什么</h2><p class="placeholder">以下方向先保留，等真实内容补充后再展开。</p></div><div class="reflection-grid">${reflection}</div></section></main><a class="next-project container" href="project-detail.html?id=${next.id}"><span class="eyebrow">下一个项目</span><strong>${next.title} <span aria-hidden="true">→</span></strong></a>`;
  }
})();
