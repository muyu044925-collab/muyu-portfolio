# Design QA

source visual truth path: `C:/Users/14596/AppData/Local/Temp/codex-clipboard-9daafe9e-21be-4552-a003-bc692b978701.png`
implementation screenshot paths: `C:/Users/14596/Documents/ChatGPT/个人作品集网站/qa-1366.png`, `qa-1440.png`, `qa-1680.png`, `qa-1920.png`
viewport: 1366x900, 1440x900, 1680x900, 1920x900
state: static portfolio framework, dark theme

## Comparison evidence

The reference image was opened and used to implement the visual direction: near-black background, violet active state, rounded dark panels, compact three-project grid, and project detail hierarchy. Browser-rendered screenshots were captured at four desktop widths after the layout fix. The 1920px run confirms a 1440px centered content area with approximately 232px outer gutters.

## Findings

- [P2] Initial implementation used a full-width container at smaller desktop widths, leaving insufficient safety gutters. Fixed by applying `width: calc(100% - 96px)` with a 1440px maximum.

## Fidelity surfaces

- Fonts and typography: CSS keeps a system sans stack with large responsive display type; exact reference font was not identified.
- Spacing and layout rhythm: reference-inspired max-width panels, compact card grid, rounded corners, and mobile breakpoints were added in `styles/reference.css`; desktop gutters are defined in `styles/layout.css`.
- Colors and visual tokens: near-black canvas and violet accent are defined as reusable tokens.
- Image quality and asset fidelity: existing project cover placeholders remain placeholders because no real project assets were provided.
- Copy and content: all project, identity, experience, and contact content remains placeholder-only.

## Implementation checklist

- [x] Home, About, Resume, and project detail routes return HTTP 200.
- [x] Reference style override is isolated in `styles/reference.css`.
- [x] Responsive breakpoints exist for tablet and mobile widths.
- [x] Capture browser screenshots at 1366, 1440, 1680, and 1920 widths.
- [x] Verify DOM widths, computed max-width, three-column project grid, transform, zoom, and document overflow.
- [ ] Capture a mobile screenshot in a later content pass.

final result: passed

## 2026-08-26 碎片工作区

- 新增 `fragments/index.html`，参考用户提供的截图实现“全部碎片 / 本周碎片”双栏工作区。
- 全局导航新增“碎片”入口；进入该页时自动同步 active 状态。
- 左侧搜索、列表选择与右侧时间线使用本地示例数据，未引入外部服务。
