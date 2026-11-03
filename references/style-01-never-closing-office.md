# Style 01 — 永不打烊的 AI 公司（Never-Closing Office）

代表作：《超级智能体》小红书科普视频 v2/v3（2026-11-03，用户验收通过）。素材：DeepSeek Harness 的 Super-agent 设计长文。成片 720×1280，v2 为 65 秒，v3 加尾钩 69.8 秒。

## 适用题材
- Agent / 系统架构 / 软件概念科普：凡是能翻译成「一群角色分工协作」的抽象系统都适用（多智能体、自动化流程、平台机制）。
- 不适用：需要真实产品界面演示的实操教程（那类用实拍录屏）；严肃新闻播报。

## 隐喻设计
- 目标概念 = 一家永不打烊的 AI 公司；旧范式（聊天框 AI）= 打卡下班的临时工。
- 概念映射：Router = 值班经理（只派活不干活）；Workers = 一排执行者；事件驱动 = 半夜飘来的报错把人叫醒；Watchdog = 天花板上的监工无人机；算力成本 = 电费/飞转的电表；落地交付 = 清晨老板看到一摞做完的报告。
- 回收方式：最后一段先演电表飞转（代价），再演日出交付（答案），旁白最后一句点题。

## 风格锁（每条提示词逐字复用）
```text
Vertical 9:16 premium flat vector motion-graphics animation, tech explainer style, deep navy-blue palette with cyan and warm orange accents, smooth continuous camera movement, no text, no letters, no words anywhere.
```

## 角色锁（逐字复用）
```text
small round white robot employee with a glowing cyan screen face
```
变体：值班经理 = `a taller manager robot with a cyan visor`；监工 = `a small flying patrol drone with one big watchful eye`；主角临时工另加 `a tiny orange scarf` 做区分。

## 配色
深海军蓝底（夜办公室）+ 青色（屏幕光/角色脸）+ 暖橙（灯光/任务卡/警示）。清晨段转金色日出光做结尾情绪释放。

## 逐段提示词全文（风格锁+角色锁在生成时拼在每条最前面，下为各段事件部分）
1. 临时工下班：`Scene: a small round white robot employee with a glowing cyan screen face and a tiny orange scarf sits alone at a desk typing in a dark office at the end of the day. A wall clock's hands spin quickly to evening. The robot powers down, its face screen goes black, it stands up, hangs its scarf on a hook, walks away, and the office lights shut off one by one, leaving an empty chair and a silent dark desk. Lonely, quiet mood.`
2. 永不打烊：`Scene: camera pushes in toward a tall city office building at midnight, dark and quiet, then one entire floor suddenly lights up warm and bright. Through the windows, many small round white robot employees with glowing cyan screen faces are happily working at desks with coffee cups and plants, full of lively night-shift energy. The camera glides through the window into the buzzing office. Hopeful, magical mood.`
3. 派活：`Scene: inside a glowing night office, a taller manager robot with a cyan visor stands at a round command desk in the center. Glowing orange task cards fly from its hands in graceful arcs to rows of small round white worker robots at desks, who catch the cards and immediately start typing in parallel, screens lighting up one after another like a wave. Coordinated, energetic team mood, camera slowly orbiting the command desk.`
4. 事件唤醒：`Scene: a quiet dark corner of a night office, a small round white robot employee with a glowing cyan screen face sleeps at its desk. A glowing red alert envelope flies in together with a ringing golden bell. The robot snaps awake, jumps up, rushes across the office to a huge broken glowing gear, grabs a wrench and repairs the gear until it spins smoothly and glows green. Heroic, helpful mood.`
5. 监工：`Scene: inside a night office, a small flying patrol drone with one big watchful eye glides along the ceiling like a security guard, scanning rows of working robot employees with a soft light beam. It spots one small round white robot frozen mid-typing, glitching with little sparks and a flickering screen face. The drone swoops down and taps it gently; the robot reboots, its face lights up bright and happy, and it immediately resumes typing. Relieved, warm mood.`
6. 电费+交付：`Scene: an electricity meter on an office wall spins faster and faster, glowing. Then golden sunrise light floods through big office windows. A human man walks in holding a coffee cup and stops in amazement: on the main desk sits a tall, neat stack of finished report folders, and a team of small round white robot employees with glowing cyan screen faces waves proudly at him. Warm, hopeful ending mood.`
7. 尾钩：`Scene: inside the bright warm morning office, the whole team of small round white robot employees with glowing cyan screen faces gathers together facing the camera, waving enthusiastically and giving thumbs up, one robot in front points invitingly at the viewer and then at an empty glowing space above the team, cheerful and welcoming, camera slowly pushing in.`

## 脚本全文（配音分段，TTS zh / speed 108）
- S1：现在的AI，像个临时工。你一关对话框，它就打卡下班，椅子空了，灯也灭了。你不说话，它绝不多干一分钟。（9.4s）
- S2：但DeepSeek团队最近畅想的超级智能体，完全是另一个物种。它不想当临时工，它要开一家永不打烊的AI公司。（8.5s）
- S3：公司里坐着个值班经理，记住所有事，专门对接你。它从不亲自干活，只派活。任务卡一张张飞出去，一排执行者同时开工，各干各的，互不打架。（11.9s）
- S4：这家公司还不用你催。半夜飘来一封报错，铃一响，睡着的员工立刻惊醒，冲过去把坏掉的齿轮修好。你都没点名，它已经干完了。（10.6s）
- S5：怕它翻车？天花板上飘着个监工无人机，全程巡逻。哪个员工卡死冒了火花，它飞过去拍一下，重启成功，立刻接着干。（9.5s）
- S6：当然，这家公司电费不便宜，灯一直亮着，就一直烧算力。说清楚，这还只是设计图加样板间，不是正式开业。但方向已经变了，AI的下半场，比的不是谁更会聊天，是谁能一直在场干活。（12.3s）
- S7 尾钩：关注我，带你了解更多AI干货。（2.8s）

## 合成参数（实测）
- 段目标时长 = 配音 + 0.5s；setpts 拉伸比：S1 0.988 / S2 0.900 / S3 1.243 / S4 1.106 / S5 0.996 / S6 1.276；尾钩不拉伸、截前 4.6s。
- 字幕切句与样式见 SKILL.md 第 5 步；第一段钩子大字「关掉对话框 / AI 就下班了？」72px，0.4–3.6s。
- 封面：取尾段 63s 处真实帧（老板+机器人团队+报告摞），1080×1440，黑罩 52%，大字「AI 要变成 / 24 小时值班 / 员工了？」112px 白黄白，胶囊副标题「DeepSeek 超级智能体畅想」。裁切避开底图字幕区（resize 后取 y 180–1620）。

## 踩过的坑（v1 教训，勿重蹈）
- 程序化 PIL 画框图逐页切换 → 被判「PPT 放幻灯片」直接否决。
- 每个概念贴一个标签框 ≠ 讲解；概念必须变成角色正在做的动作。
- Noto CJK 字体画 emoji 出豆腐块；生成画面里也不要让模型写字。
- 封面若用带标题的帧作底图，帧内文字会和封面大字打架；选无字帧或强黑罩+换构图。
