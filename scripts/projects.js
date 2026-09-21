/* Single source of truth for project content. Replace placeholders here; the template stays unchanged. */
window.projects = [
  {
    id: "project-01",
    title: "LinguaFlow",
    subtitle: "为英语学习者设计的视频精听工具，通过句级播放、双语字幕、词汇收藏与学习记录，让精听过程更连续。",
    type: "英语视频精听桌面工具",
    year: "待补充",
    role: "产品设计 / 真实开发落地",
    timeline: "待补充",
    tools: "Electron / Python / SQLite",
    cover: "assets/projects/project-01.svg",
    description: "从自身真实学习场景出发的个人产品。",
    caseStudy: {
      background: {
        title: "为什么做 LinguaFlow",
        body: "我在使用 TED、YouTube 等视频学习英语时发现，真正进行精听时，需要不断暂停、回退、找上一句、查看翻译，再次播放。内容本身没有问题，问题更多发生在视频播放器与精听学习方式之间。",
        note: "这是一个从自身真实学习场景出发的个人产品。"
      },
      problems: [
        { title: "重复操作成本高", body: "为了重复听一句话，需要不断拖动进度条和重新定位。" },
        { title: "字幕阅读割裂", body: "英文、中文、上下文之间频繁切换，注意力不断离开当前句子。" },
        { title: "学习结果难以沉淀", body: "听到的生词、好句和学习记录容易随着视频结束而消失。" }
      ],
      goals: ["减少播放控制操作", "让用户聚焦当前句子", "保留必要的上下文", "让听到的内容可以进入收藏和复习", "尽量减少模式切换"],
      flow: ["发现内容", "进入精听", "逐句学习", "收藏单词 / 句子", "进入词库", "查看学习记录 / 复习"],
      listening: {
        title: "把学习单位从视频缩小到一句话",
        body: "传统播放器以“视频播放”为中心。LinguaFlow 改为以“当前句”为学习单位，让一次学习循环围绕一句话完成。",
        loop: ["听", "重复", "停顿理解", "进入下一句"],
        controls: ["句级循环", "1 / 2 / 3 遍", "0 / 3 / 5 / 8 秒停顿", "自动进入下一句", "当前句高亮"]
      },
      captions: {
        title: "既聚焦当前句，也不丢失上下文",
        body: "精听不能只看到孤立的一句话，但同时又不能让整段字幕分散注意力。因此界面保留有限上下文，并持续把当前句放在视觉中心。",
        context: ["前 2 句", "当前句", "后 2 句"],
        modes: ["中文", "英文", "双语"]
      },
      vocabulary: {
        title: "听到的内容，需要真正留下来",
        body: "“收藏”不是结束，而是学习资产进入下一阶段的入口。",
        flow: ["视频中遇到生词", "收藏", "选择词库", "形成个人词汇库", "后续复习"]
      },
      records: {
        title: "一次精听结束后，学习仍然可以继续",
        body: "这些功能的目的不是制造数据感，而是帮助用户知道今天学了什么、学了多久、哪些内容值得回来复习。",
        items: ["收藏句子", "今日学习时间", "学习日历", "连续学习", "最近学习"]
      },
      iterations: ["播放器控制区", "收藏单词流程", "信息层级 / 首页内容结构"],
      finalDesign: ["首页 / 总览", "TED 内容页", "精听播放器", "收藏单词", "个人词库", "学习统计"],
      reality: {
        body: "我不仅完成了界面设计，还通过 AI 辅助开发将核心体验落地成可运行桌面产品，并在真实使用过程中持续发现问题和迭代。",
        tags: ["Electron", "Python", "SQLite", "AI-assisted Development"],
        proof: ["TED 视频接入", "字幕同步", "本地词库", "学习数据存储"]
      },
      reflection: ["产品设计上的收获", "真实开发带来的限制与取舍", "下一步可以继续验证的问题"]
    },
    sections: {
      overview: { problem: "传统播放器与精听学习方式之间存在操作断点。", goal: "让精听围绕当前句连续进行。", role: "产品设计与真实开发落地。" },
      research: "研究、访谈与数据：待补充真实资料。",
      process: ["信息架构", "用户流程", "线框图", "设计探索", "界面设计"],
      finalDesign: ["full", "duo", "trio", "mockup", "image-text", "image"],
      reflection: { learned: "项目收获：待补充真实内容。", next: "下一步：待补充真实内容。" }
    }
  },
  {
    id: "project-02", title: "两步路改版", subtitle: "[项目一句话介绍占位]", type: "[项目类型]", year: "[年份]", role: "[角色占位]", timeline: "[时间占位]", tools: "[工具占位]", cover: "assets/projects/project-02.svg", description: "[项目简短描述占位]",
    detailImages: [
      "assets/projects/project-02/01-cover.png",
      "assets/projects/project-02/02-background.png",
      "assets/projects/project-02/03-feedback.png"
    ],
    sections: { overview: { problem: "[Problem placeholder]", goal: "[Goal placeholder]", role: "[My role placeholder]" }, research: "[User research, data, and user pain points placeholder]", process: ["Information Architecture", "User Flow", "Wireframes", "Design Exploration", "UI Design"], finalDesign: ["full", "duo", "trio", "mockup", "image-text", "image"], reflection: { learned: "[What I learned placeholder]", next: "[Next steps placeholder]" } }
  },
  {
    id: "project-03", title: "第三个项目", subtitle: "[项目一句话介绍占位]", type: "[项目类型]", year: "[年份]", role: "[角色占位]", timeline: "[时间占位]", tools: "[工具占位]", cover: "assets/projects/project-03.svg", description: "[项目简短描述占位]",
    sections: { overview: { problem: "[Problem placeholder]", goal: "[Goal placeholder]", role: "[My role placeholder]" }, research: "[User research, data, and user pain points placeholder]", process: ["Information Architecture", "User Flow", "Wireframes", "Design Exploration", "UI Design"], finalDesign: ["full", "duo", "trio", "mockup", "image-text", "image"], reflection: { learned: "[What I learned placeholder]", next: "[Next steps placeholder]" } }
  }
];
