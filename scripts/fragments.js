(() => {
  const fragments = [
    { id: "responsive", title: "响应式网页", summary: "作品是采用响应式网页布局，内容区域保持统一最大宽度…", time: "09:42", tags: ["UI设计", "响应式"], body: "1440px 是设计参考尺寸，不是网页固定宽度。", type: "文本" },
    { id: "shortcut", title: "输入框换行", summary: "在输入框中使用 Shift + Enter 完成换行。", time: "09:41", tags: ["工作流"], body: "ChatGPT 输入框换行：Shift + Enter。", type: "文本" },
    { id: "claude", title: "模型选择", summary: "不同模型的定位，适合场景与选择建议…", time: "09:38", tags: ["AI工具", "模型"], body: "Claude Desktop 和 CLI 的区别", type: "图片" },
    { id: "inspiration", title: "灵感收藏", summary: "收集优秀的界面与交互灵感。", time: "昨天", tags: ["灵感"], body: "作品、界面与交互，值得持续观察和整理。", type: "文本" },
    { id: "workflow", title: "助手使用小记", summary: "关于文件传输的方式和工作流的一些想法…", time: "8/27", tags: ["工作流"], body: "把零散的想法先保存下来，再按时间和主题整理。", type: "文本" },
  ];
  const list = document.getElementById("fragment-items");
  const timeline = document.getElementById("fragment-timeline");
  const search = document.getElementById("fragment-search-input");
  const render = (query = "") => {
    const q = query.trim().toLowerCase();
    const visible = fragments.filter(item => !q || [item.title, item.summary, item.body, ...item.tags].join(" ").toLowerCase().includes(q));
    list.innerHTML = visible.map((item, index) => `<button class="fragment-item${index === 0 ? " is-active" : ""}" type="button" data-fragment-id="${item.id}"><span class="fragment-item-top"><strong>${item.title}</strong><time>${item.time}</time></span><p>${item.summary}</p><span class="fragment-tags">${item.tags.map(tag => `<span class="fragment-tag">${tag}</span>`).join("")}</span></button>`).join("");
    timeline.innerHTML = visible.map(item => `<article class="fragment-entry" data-fragment-entry="${item.id}"><time class="fragment-time">${item.time}</time><span class="fragment-dot" aria-hidden="true"></span><div class="fragment-card"><blockquote>${item.body}</blockquote><footer><span class="fragment-tag">${item.type}</span><span class="fragment-card-actions"><button type="button" aria-label="复制碎片">□</button><button type="button" aria-label="更多操作">⋮</button></span></footer></div></article>`).join("");
    list.querySelectorAll("[data-fragment-id]").forEach(button => button.addEventListener("click", () => {
      list.querySelectorAll(".fragment-item").forEach(item => item.classList.remove("is-active"));
      button.classList.add("is-active");
      document.querySelector(`[data-fragment-entry="${button.dataset.fragmentId}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }));
  };
  search.addEventListener("input", event => render(event.target.value));
  document.addEventListener("keydown", event => { if (event.key === "/" && document.activeElement !== search) { event.preventDefault(); search.focus(); } });
  render();
})();
