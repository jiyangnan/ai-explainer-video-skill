# ai-explainer-video-skill

把一个概念、一篇文章或一条帖子，做成小红书 / TikTok 风格竖屏 AI 科普短视频的 Agent Skill：
**一个隐喻贯穿全片 + AI 生成动画镜头 + 同一角色贯穿 + 配音 + 烧录字幕 + 封面 + 尾部关注钩子。**

## 它解决什么问题

科普视频最常见的失败模式是「会动的 PPT」：程序画几个框图卡片、逐页切换、旁白念定义。这个 skill 把 2026-11-03 一次真实迭代（v1 被否决 → 研究 X 上优秀科普片 → v2/v3 验收通过）的标准、参数和踩坑全部沉淀下来，让任何 agent 照着做都能达到同一水准：

- **质量红线**：禁止程序化框图当主体；隐喻必须被演出来而不是贴标签；讲到哪演到哪；镜头一直在动；钩子在前、答案在后。
- **完整管线**：素材研判（畅想 ≠ 发布必须明说）→ 定隐喻写脚本 → AI 生成镜头（风格锁+角色锁+事件）→ 抽帧验收 → TTS 按段配音 → ffmpeg 合成（时长对齐、字幕计时、转场参数）→ 尾部关注钩子 → 封面（真实帧+黑罩+大字）→ 六点交付验收。
- **可扩展风格库**：每种验收通过的新风格以 `references/style-NN-*.md` 独立存档并登记索引，只增不改。当前已有 Style 01「永不打烊的 AI 公司」（扁平矢量动画，机器人团队演完整个 Agent 概念），含全部提示词与脚本全文；Style 02「暖色编辑插画 · 类比动画」（程序化插画动画，每个机制一个生活类比，附可复制引擎）。

## 文件

| 文件 | 内容 |
|---|---|
| `SKILL.md` | 主流程、红线、合成参数、封面与尾钩规范、验收清单 |
| `skill.yaml` | Skill 元信息 |
| `references/styles-index.md` | 风格索引与新增风格流程 |
| `references/style-01-never-closing-office.md` | Style 01 全档案：风格锁、角色锁、逐段提示词、脚本、实测参数、踩坑记录 |
| `references/style-02-warm-editorial.md` | Style 02 全档案：与主流程差异、视觉规范、动效词汇、类比手册与类比库、分镜写法、技术参数、踩坑、脚本全文 |
| `engines/style-02-warm-editorial/` | Style 02 可复制引擎：逐帧渲染、逐句配音、原创配乐、混音、封面模板、一键 `build.sh`，附完整示例 |
| `demo/` | Demo 成片（压缩预览版 MP4）与封面图 |

## Demo：《超级智能体》

用本 skill 制作的第一支完整成片，源自 DeepSeek Harness 2026-11-01 在 X 发布的 Super-agent 设计长文（架构畅想，非产品发布，片中已明说）。

[![《超级智能体》Demo 封面](demo/super-agent-cover.jpg)](demo/super-agent-explainer-v3.mp4)

▶ **[观看 Demo 视频（MP4）](demo/super-agent-explainer-v3.mp4)**

- **隐喻**：超级智能体 = 一家永不打烊的 AI 公司；普通聊天 AI = 打卡下班的临时工。全片六段都发生在这家公司里，结尾以电表飞转（代价）和清晨交付一摞报告（回收隐喻）收束。
- **风格**：Style 01「永不打烊的 AI 公司」——同一批小机器人员工贯穿全片，AI 生成动画镜头，讲到哪演到哪。
- **规格**：原片竖屏 720×1280、69.8 秒（含 4.6 秒「关注我」尾钩）；仓库内为 540×960 压缩预览版，文件在 `demo/super-agent-explainer-v3.mp4`，封面在 `demo/super-agent-cover.jpg`。
- **管线**：原文研判 → 定隐喻写脚本 → 6+1 段 AI 生成镜头 → 抽帧验收 → 按段 TTS 配音 → ffmpeg 合成（时长对齐、烧录字幕、淡入淡出）→ 真实帧封面 → 六点验收交付。
- **迭代故事**：第一版用程序绘制的框图卡片制作，被用户以「太粗糙、像 PPT 放幻灯片」否决；按本 skill 的质量红线重做后验收通过。这条红线就来自这次教训。

## Demo 2：《Super-agent》Style 02 版

同一篇 DeepSeek Harness 长文，用 Style 02 制作：程序化插画动画，不依赖 AI 视频生成。

[![Style 02 封面](demo/style-02-super-agent-cover.png)](demo/style-02-super-agent-preview.mp4)

▶ **[观看 Demo 视频（MP4）](demo/style-02-super-agent-preview.mp4)**

- **类比**：同时带 5 个实习生（多开窗口）、餐厅经理与后厨（Router/Worker）、门铃与门禁（事件过滤）、办公桌与档案柜（Inline/Spill）、侦探线索墙（Chain of Recall）、洗衣机（全双工）、泳池救生员（Watchdog）。
- **规格**：原片 1080×1920、30fps、4:52、-16.3 LUFS；仓库内为 540×960 压缩预览版。
- **迭代故事**：第一版是深色卡片配音，被否决为“纯 PPT 幻灯片”；改成逐句同步的插画动画和类比脚本之后，用户认可。
- 帧预览：`demo/style-02-frames.jpg`

## 使用

把本仓库放入你的 agent 的 skills 目录（或让 agent 直接读取 `SKILL.md`），然后说：「把这篇文章做成科普视频」即可触发。
