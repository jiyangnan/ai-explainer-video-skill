// Example project for Style 02 (warm-editorial): DeepSeek Harness "Super-agent" explainer, 2026-11, 11 scenes, 4:52.
// Usage: cp -r engines/style-02-warm-editorial/. <proj>/ && cp <proj>/example/scenes.js <proj>/ ; then replace SCENES/META.
// Scene definitions: narration lines + animated illustration markup.
// Attribute helper: A(lineIndex, anim, delaySeconds, extra)
const A = (at, a = 'fu', d = 0, x = '') => ` data-at="${at}" data-a="${a}" data-d="${d}" ${x}`;
const C = { ink: '#141413', clay: '#D97757', clayd: '#C6613F', sage: '#788C5D', sky: '#6A9BCC', kraft: '#D4A27F', oat: '#E3DACC', paper: '#F0EEE6', ivory: '#FAF9F5', fig: '#C46686', heather: '#CBCADB', mute: '#87867F' };

// simple person: head + rounded body, ink outline
const person = (x, y, s = 1, col = C.clay, extra = '') => `
<g transform="translate(${x},${y}) scale(${s})" ${extra}>
  <rect x="-46" y="20" width="92" height="96" rx="40" fill="${col}" stroke="${C.ink}" stroke-width="5"/>
  <circle cx="0" cy="-12" r="34" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/>
  <circle cx="-11" cy="-14" r="4" fill="${C.ink}"/><circle cx="11" cy="-14" r="4" fill="${C.ink}"/>
  <path d="M-10 2 Q0 9 10 2" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
</g>`;
const win = (x, y, w, h, col, label) => `
<g transform="translate(${x},${y})">
  <rect width="${w}" height="${h}" rx="18" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/>
  <rect width="${w}" height="34" rx="16" fill="${col}" stroke="${C.ink}" stroke-width="5"/>
  <circle cx="22" cy="17" r="5" fill="${C.ink}"/><circle cx="40" cy="17" r="5" fill="${C.ink}"/>
  <rect x="20" y="54" width="${w * 0.6}" height="10" rx="5" fill="${C.oat}"/>
  <rect x="20" y="76" width="${w * 0.75}" height="10" rx="5" fill="${C.oat}"/>
  ${label ? `<text x="${w / 2}" y="${h - 22}" text-anchor="middle" font-size="26" font-weight="700" fill="${C.ink}">${label}</text>` : ''}
</g>`;
const svg = (inner, w = 936, h = 880) => `<svg class="ill" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg>`;
const card = (x, y, w, inner, at, a = 'pop', d = 0, bg = C.ivory) =>
  `<div class="card"${A(at, a, d)} style="left:${x}px;top:${y}px;width:${w}px;background:${bg}">${inner}</div>`;

const SCENES = [
/* 1 ---------------------------------------------------------------- */
{ id: 'hook', chap: '开场', title: 'AI 越能干，<br>你怎么<em>越忙</em>？',
  lines: [
    '你有没有这种感觉：AI 越来越能干，你却越来越忙？',
    '开五个对话窗口，就像同时带五个实习生，每个都得你盯着。',
    'DeepSeek Harness 团队发现，一个人最多只能盯住三到五个会话。',
    '瓶颈不在 AI，而在你的注意力。他们的解法，叫 Super-agent。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'pop', .2)}><g class="loop-bob">${person(468, 470, 1.5, C.clay)}</g></g>
    <g${A(0, 'fi', .6)}><path d="M420 330 q-10 -40 20 -50 M470 320 q0 -45 30 -50 M520 330 q15 -40 40 -38" class="draw" pathLength="1" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></g>
    ${[[60, 80, C.sky, '实习生 1'], [640, 70, C.sage, '实习生 2'], [20, 420, C.kraft, '实习生 3'], [690, 430, C.fig, '实习生 4'], [340, 640, C.heather, '实习生 5']].map(([x, y, c, l], i) =>
      `<g${A(1, 'pop', .15 + i * .22)}><g class="loop-shake" style="animation-delay:${-i * .37}s">${win(x, y, 230, 170, c, l)}
       <g transform="translate(${x + 210},${y - 6})"><circle r="24" fill="${C.clay}" stroke="${C.ink}" stroke-width="4"/><text y="10" text-anchor="middle" font-size="30" font-weight="900" fill="${C.ivory}">!</text></g></g></g>`).join('')}
  `)}</div>
  <div class="abs big-num"${A(2, 'pop', .3)} data-out="3" style="left:250px;top:300px;width:440px;text-align:center">3–5<div class="cap">个会话 = 注意力上限</div></div>
  <div class="abs stamp"${A(3, 'stamp', 1.6)} style="left:170px;top:360px">Super-agent</div>
  `,
  dims: [[2, '.ill']], },

/* 2 ---------------------------------------------------------------- */
{ id: 'problem', chap: '问题', title: '今天的 AI，<br>像<em>一次只接一个电话</em>的客服',
  lines: [
    '今天的 AI 助手，像一个一次只能接一个电话的客服。',
    '每个会话都是一间隔离的小房间，房间之间不通气，你得自己跑来跑去传话。',
    '它干长活的时候，你说什么它都听不见；你的电脑一合盖，它也跟着下班。',
    '所以单个任务看模型能力，多任务，全看你一个人的脑子够不够用。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'pop', .2)}>
      <rect x="330" y="20" width="270" height="150" rx="26" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/>
      <g class="loop-ring" style="transform-origin:400px 95px"><path d="M370 120 q0 -60 60 -60 l20 0 q10 0 10 12 l0 18 q0 10 -10 10 l-20 0 q-14 0 -14 14 l0 6" fill="${C.clay}" stroke="${C.ink}" stroke-width="5"/></g>
      <text x="520" y="108" text-anchor="middle" font-size="34" font-weight="800" fill="${C.clayd}">占线中…</text>
    </g>
    ${[0, 1, 2].map(i => `<g${A(1, 'pop', .1 + i * .2)}><rect x="${40 + i * 300}" y="230" width="250" height="210" rx="20" fill="${[C.sky, C.sage, C.kraft][i]}" fill-opacity=".35" stroke="${C.ink}" stroke-width="5"/>
       <rect x="${135 + i * 300}" y="340" width="60" height="100" rx="8" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/>
       <text x="${165 + i * 300}" y="295" text-anchor="middle" font-size="30" font-weight="800">会话 ${'ABC'[i]}</text></g>`).join('')}
    <g${A(1, 'fi', 1.2)}><g class="runner">${person(0, 0, .55, C.clay)}</g></g>
    <path id="runpath" d="M165 500 C 300 560, 380 560, 465 500 S 650 440, 765 500" fill="none" stroke="${C.mute}" stroke-width="4" stroke-dasharray="10 12"${A(1, 'fi', .9)}/>
    <g${A(2, 'fu', .1)} transform="translate(60,600)">
      <path d="M0 0 h110 l-40 70 l40 70 h-110 l40 -70 z" fill="${C.oat}" stroke="${C.ink}" stroke-width="5"/>
      <g class="loop-sand"><path d="M25 12 h60 l-30 50 z" fill="${C.kraft}"/></g>
      <text x="160" y="80" font-size="30" font-weight="700">长任务：听不见你</text>
    </g>
    <g${A(2, 'fu', 1.6)} transform="translate(560,600)">
      <rect x="0" y="120" width="260" height="22" rx="8" fill="${C.ink}"/>
      <g class="lid" style="transform-origin:130px 122px"><rect x="20" y="0" width="220" height="122" rx="12" fill="${C.heather}" stroke="${C.ink}" stroke-width="5"/></g>
      <text x="230" y="40" font-size="40" font-weight="900" fill="${C.sky}" class="zzz">z z z</text>
    </g>
  `)}</div>
  <div class="abs"${A(3, 'pop', .2)} style="left:180px;top:300px;width:576px">
    <div class="card" style="position:relative;text-align:center;padding:36px">
      <div style="font-size:40px;font-weight:800">🧠 你的注意力</div>
      <div class="meter"><i class="fillbar"${A(3, 'grow', .6)}></i></div>
      <div style="font-size:30px;color:${C.clayd};font-weight:800;margin-top:14px">已超载</div>
    </div></div>`,
  dims: [[3, '.ill']], },

/* 3 ---------------------------------------------------------------- */
{ id: 'define', chap: '概念', title: '从“一次性对话”<br>到<em>全职助理</em>',
  lines: [
    'Super-agent 想做的，是把 AI 从“一次性的对话”，变成一个“全职助理”。',
    '它一直是同一个它：不管你在群聊、GitHub 还是邮件里找它，它都记得前因后果。',
    '它有四个特点：持续、高效、主动、常驻。',
    '就像一个靠谱的老同事：记得事、干得快、有眼力见、不掉线。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'pop', .1)} data-out="2">
      <g class="loop-bob">${person(468, 300, 1.7, C.clay)}</g>
      <rect x="378" y="430" width="180" height="50" rx="12" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4"/>
      <text x="468" y="465" text-anchor="middle" font-size="28" font-weight="800">全职助理</text>
    </g>
    ${[['💬 群聊', 90, 640], ['🐙 GitHub', 468, 720], ['✉️ 邮件', 846, 640]].map(([l, x, y], i) => `
      <g${A(1, 'fi', .2 + i * .3)} data-out="2"><path d="M${x} ${y - 40} L468 ${470}" class="draw" pathLength="1" stroke="${C.ink}" stroke-width="5" stroke-dasharray="1" fill="none"/>
      <circle r="10" fill="${C.clay}" class="dot" style="offset-path:path('M${x} ${y - 40} L468 470')"/></g>
      <g${A(1, 'pop', i * .3)} data-out="2"><rect x="${x - 110}" y="${y - 40}" width="220" height="80" rx="40" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/><text x="${x}" y="${y + 12}" text-anchor="middle" font-size="32" font-weight="700">${l}</text></g>`).join('')}
  `)}</div>
  ${[['持续', '记得事', C.sky, '在哪找它都是同一个它'], ['高效', '干得快', C.sage, '多任务并行推进'], ['主动', '有眼力见', C.clay, '自己留意该做的事'], ['常驻', '不掉线', C.kraft, '一直在线、自动恢复']].map(([k, a, c, d], i) =>
    card(i % 2 ? 484 : 0, 40 + Math.floor(i / 2) * 400, 452, `<div class="swatch" style="background:${c}"></div><div class="k">${k}</div><div class="d">${d}</div><div class="analogy"${A(3, 'fu', .3 + i * .45)}>≈ ${a}</div>`, 2, 'pop', .2 + i * .25)).join('')}`,
},

/* 4 ---------------------------------------------------------------- */
{ id: 'twolevel', chap: '第一招', title: '两层架构：<br>一家<em>餐厅</em>',
  lines: [
    '第一招，两层架构。想象一家餐厅。',
    'Router 是前厅经理：招呼客人、记下需求、把单子派给后厨，自己从不下厨。',
    'Worker 是后厨的厨师：每人一个灶台，专心做一道菜，互不干扰。',
    '厨师不直接跟客人说话，菜好了交给经理端出去，所以你始终只面对一个人。',
    '高峰期经理还会把排队的单子一次性合并处理，就像电梯一次载多人，越忙越划算。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'fi', .2)}><path d="M40 360 H896" stroke="${C.ink}" stroke-width="5" stroke-dasharray="14 12"/><text x="40" y="340" font-size="26" fill="${C.mute}" font-weight="700">前厅 · Router 层</text><text x="40" y="400" font-size="26" fill="${C.mute}" font-weight="700">后厨 · Worker 层</text></g>
    <g${A(1, 'pop', 0)}>
      <rect x="300" y="200" width="336" height="80" rx="14" fill="${C.kraft}" stroke="${C.ink}" stroke-width="5"/>
      <g class="loop-bob">${person(468, 110, 1.05, C.clay)}</g>
      <text x="468" y="252" text-anchor="middle" font-size="30" font-weight="900">经理 Router</text>
    </g>
    <g${A(1, 'fi', 1.3)}><text x="690" y="130" font-size="28" font-weight="700" fill="${C.clayd}">🚫🍳 不下厨</text></g>
    ${[0, 1, 2].map(i => { const x = 160 + i * 308; return `
      <g${A(2, 'pop', .1 + i * .25)}>
        ${person(x, 520, .95, [C.sky, C.sage, C.fig][i])}
        <rect x="${x - 110}" y="660" width="220" height="70" rx="12" fill="${C.oat}" stroke="${C.ink}" stroke-width="5"/>
        <g class="flame" style="transform-origin:${x}px 660px"><path d="M${x - 24} 660 q0 -40 24 -60 q24 20 24 60 z" fill="${C.clay}" stroke="${C.ink}" stroke-width="4"/></g>
        <text x="${x}" y="706" text-anchor="middle" font-size="26" font-weight="800">Worker ${'ABC'[i]}</text>
      </g>
      <g${A(1, 'fi', 1.8 + i * .3)}><rect width="54" height="66" rx="6" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4" class="mover" style="offset-path:path('M468 290 C ${468} 380, ${x} 350, ${x} 450');offset-rotate:0deg"/></g>
      <g${A(3, 'fi', .4 + i * .4)}><g class="mover-slow" style="offset-path:path('M${x} 600 C ${x} 420, 468 420, 468 300');offset-rotate:0deg"><ellipse rx="40" ry="16" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4"/><path d="M-26 -6 q26 -36 52 0" fill="${C.kraft}" stroke="${C.ink}" stroke-width="4"/></g></g>`; }).join('')}
  `)}</div>
  <div class="abs"${A(4, 'sr', 0)} style="left:520px;top:-10px;width:416px">
    <div class="card" style="position:relative;padding:22px 26px">
      <div style="font-size:30px;font-weight:800">🛗 高峰期：合并处理</div>
      <div class="row" style="gap:10px;margin-top:14px">${[0, 1, 2, 3].map(i => `<span class="ticket"${A(4, 'merge', .6 + i * .15)}></span>`).join('')}<span style="font-size:34px;margin-left:6px"${A(4, 'pop', 1.6)}>→ 1 批</span></div>
    </div></div>`,
},

/* 5 ---------------------------------------------------------------- */
{ id: 'events', chap: '第二招', title: '事件驱动：<br>听见<em>门铃</em>就开门',
  lines: [
    '第二招，事件驱动。它不等你开口，而是自己留意周围发生的事。',
    '群消息、邮件、日历提醒、代码评审、CI 结果，都是触发它的“门铃”，叫 Trigger。',
    '但门铃太多了。先让“门禁”用代码规则刷掉大部分噪音，拿不准的再请“前台”大模型来判断。',
    '已经有人负责的事，比如同一个 PR 的后续消息，就像快递直接送到收件人工位，不用再过前台。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'pop', .2)}>
      <path d="M368 380 L468 290 L568 380 Z" fill="${C.clay}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <rect x="388" y="380" width="160" height="130" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/>
      <rect x="448" y="440" width="40" height="70" rx="6" fill="${C.kraft}" stroke="${C.ink}" stroke-width="4"/>
      <g class="loop-eye"><circle cx="430" cy="415" r="10" fill="${C.ink}"/><circle cx="506" cy="415" r="10" fill="${C.ink}"/></g>
    </g>
    ${[['💬', 80, 60], ['✉️', 260, 20], ['📅', 468, 0], ['🔍', 676, 20], ['✅ CI', 856, 60]].map(([e, x, y], i) => `
      <g${A(1, 'pop', i * .2)}><g class="bell" style="transform-origin:${x}px ${y + 40}px;animation-delay:${-i * .2}s"><circle cx="${x}" cy="${y + 60}" r="52" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/><text x="${x}" y="${y + 74}" text-anchor="middle" font-size="${e.length > 2 ? 26 : 42}" font-weight="800">${e}</text></g></g>`).join('')}
    <g${A(2, 'fi', 0)}>
      <rect x="40" y="560" width="260" height="110" rx="18" fill="${C.sage}" fill-opacity=".3" stroke="${C.ink}" stroke-width="5"/>
      <text x="170" y="608" text-anchor="middle" font-size="30" font-weight="900">⚡ 门禁</text><text x="170" y="648" text-anchor="middle" font-size="24">代码规则 · 快</text>
      <rect x="636" y="560" width="260" height="110" rx="18" fill="${C.clay}" fill-opacity=".25" stroke="${C.ink}" stroke-width="5"/>
      <text x="766" y="608" text-anchor="middle" font-size="30" font-weight="900">🧠 前台</text><text x="766" y="648" text-anchor="middle" font-size="24">大模型 · 慢而准</text>
      <path d="M300 615 H636" stroke="${C.ink}" stroke-width="5" stroke-dasharray="12 10"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle r="11" fill="${i % 4 === 3 ? C.clay : C.mute}" class="${i % 4 === 3 ? 'pass' : 'drop'}" style="offset-path:path('M170 520 L170 615 ${i % 4 === 3 ? 'L766 615' : 'Q 200 700 ' + (120 + i * 18) + ' 800'}');animation-delay:${i * .45}s"/>`).join('')}
      <text x="170" y="720" text-anchor="middle" font-size="24" fill="${C.mute}">🗑️ 噪音被刷掉</text>
    </g>
  `)}</div>
  <div class="abs"${A(3, 'fu', .2)} style="left:60px;top:740px;width:816px">
    <div class="card" style="position:relative;padding:20px 28px;display:flex;align-items:center;gap:18px">
      <div class="pkg">📦</div><div style="font-size:30px;line-height:1.4"><b>订阅直通</b>：同一个 PR 的后续消息，<br>直接送到负责它的 Worker 工位</div></div></div>`,
  dims: [[3, '.ill']], },

/* 6 ---------------------------------------------------------------- */
{ id: 'context', chap: '上下文', title: '上下文窗口<br>是一张<em>办公桌</em>',
  lines: [
    '怎么喂给 AI 信息？他们把上下文窗口当成一张办公桌。',
    '马上要用的文件，直接摊在桌面上，这叫 Inline；',
    '太厚的资料，放进档案柜，桌上只留一张写着编号的便签，这叫 Spill。',
    '每样东西都有编号，AI 可以像侦探一样顺着线索墙一路往回查，这叫 Chain of Recall。',
    '它还会先斩后奏：有人报 bug，它先在后台悄悄复现、修好，确认了才开口。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'fu', .2)} data-out="3">
      <rect x="60" y="300" width="560" height="40" rx="10" fill="${C.kraft}" stroke="${C.ink}" stroke-width="5"/>
      <rect x="90" y="340" width="26" height="200" fill="${C.kraft}" stroke="${C.ink}" stroke-width="5"/><rect x="564" y="340" width="26" height="200" fill="${C.kraft}" stroke="${C.ink}" stroke-width="5"/>
      <text x="340" y="590" text-anchor="middle" font-size="28" font-weight="700" fill="${C.mute}">上下文窗口 = 桌面（空间有限）</text>
    </g>
    ${[0, 1, 2].map(i => `<g${A(1, 'drop', .2 + i * .25)} data-out="3"><rect x="${110 + i * 150}" y="${200 + (i % 2) * 14}" width="120" height="96" rx="8" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4" transform="rotate(${[-6, 3, -2][i]} ${170 + i * 150} 250)"/><text x="${170 + i * 150}" y="${258 + (i % 2) * 14}" text-anchor="middle" font-size="24" font-weight="800">Inline</text></g>`).join('')}
    <g${A(2, 'sr', 0)} data-out="3">
      <rect x="680" y="160" width="200" height="380" rx="12" fill="${C.oat}" stroke="${C.ink}" stroke-width="5"/>
      ${[0, 1, 2].map(i => `<rect x="700" y="${185 + i * 120}" width="160" height="100" rx="8" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4"/><rect x="755" y="${225 + i * 120}" width="50" height="12" rx="6" fill="${C.ink}"/>`).join('')}
      <text x="780" y="590" text-anchor="middle" font-size="28" font-weight="800">档案柜 · Spill</text>
    </g>
    <g${A(2, 'pop', 1.2)} data-out="3"><rect x="440" y="196" width="130" height="100" fill="#F5D77A" stroke="${C.ink}" stroke-width="4" transform="rotate(5 505 246)"/><text x="505" y="240" text-anchor="middle" font-size="22" font-weight="800">→ #T-217</text><text x="505" y="270" text-anchor="middle" font-size="20">摘要…</text></g>
    <g${A(3, 'fi', 0)} data-out="4">
      <rect x="40" y="40" width="856" height="560" rx="20" fill="${C.kraft}" fill-opacity=".35" stroke="${C.ink}" stroke-width="5"/>
      ${[['当前消息', 140, 470], ['Thread', 340, 260], ['Worker', 600, 420], ['评审讨论', 760, 150]].map(([l, x, y], i) => `
        <g${A(3, 'pop', .3 + i * .5)}><rect x="${x - 90}" y="${y - 45}" width="180" height="90" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4" transform="rotate(${[-3, 2, -2, 3][i]} ${x} ${y})"/><circle cx="${x}" cy="${y - 45}" r="10" fill="${C.clay}" stroke="${C.ink}" stroke-width="3"/><text x="${x}" y="${y + 10}" text-anchor="middle" font-size="26" font-weight="800">${l}</text></g>`).join('')}
      <path d="M140 425 L340 215 L600 375 L760 105" fill="none" stroke="${C.clayd}" stroke-width="5" class="draw-slow" pathLength="1"${A(3, 'drawa', .6)}/>
      <text x="468" y="560" text-anchor="middle" font-size="28" font-weight="800">🔎 Chain of Recall：顺藤摸瓜</text>
    </g>
    <g${A(4, 'fu', 0)} transform="translate(0,170)">
      ${[['🐞', '有人报 bug'], ['🔁', '后台复现'], ['🔧', '悄悄修好'], ['✅', '确认才开口']].map(([e, l], i) => `
        <g${A(4, 'pop', .3 + i * .55)}><circle cx="${117 + i * 234}" cy="150" r="80" fill="${[C.oat, C.heather, C.sky, C.sage][i]}" fill-opacity=".6" stroke="${C.ink}" stroke-width="5"/><text x="${117 + i * 234}" y="172" text-anchor="middle" font-size="64">${e}</text><text x="${117 + i * 234}" y="280" text-anchor="middle" font-size="28" font-weight="800">${l}</text></g>
        ${i < 3 ? `<path d="M${200 + i * 234} 150 h68" stroke="${C.ink}" stroke-width="5" marker-end="url(#ah)"${A(4, 'fi', .6 + i * .55)}/>` : ''}`).join('')}
      <text x="468" y="380" text-anchor="middle" font-size="30" font-weight="700" fill="${C.clayd}"${A(4, 'fi', 2.6)}>先斩后奏：没把握就保持安静</text>
    </g>
  `)}</div>`,
},

/* 7 ---------------------------------------------------------------- */
{ id: 'duplex', chap: '第三招', title: '全双工：<br>从打电话到<em>洗衣机</em>',
  lines: [
    '第三招，全双工。传统 AI 像打电话：它说话的时候，你插不上嘴。',
    '新的做法像开洗衣机：按下启动立刻走人，洗好了它会叫你，中间你随时可以吩咐别的事。',
    '它还懂得看场合说话：在群里像同事一样简短，一条不超过一百字；',
    '到了 GitHub 和邮件里，就写背景、改动、验证结构完整的正式报告。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'fu', .2)} data-out="2">
      ${person(150, 170, 1, C.sky)}
      <g transform="translate(260,60)"><rect width="300" height="110" rx="30" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/><text x="150" y="70" text-anchor="middle" font-size="34" font-weight="800">🤖 说个不停…</text></g>
      <g transform="translate(600,160)"${A(0, 'pop', 1.6)}><rect width="240" height="90" rx="26" fill="${C.oat}" stroke="${C.ink}" stroke-width="5" stroke-dasharray="10 8"/><text x="120" y="58" text-anchor="middle" font-size="30" fill="${C.mute}">你：那个…</text></g>
    </g>
    <g${A(1, 'fu', 0)} data-out="2">
      <rect x="80" y="330" width="300" height="340" rx="26" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/>
      <rect x="80" y="330" width="300" height="70" rx="24" fill="${C.oat}" stroke="${C.ink}" stroke-width="5"/>
      <circle cx="320" cy="365" r="16" fill="${C.clay}" stroke="${C.ink}" stroke-width="4"${A(1, 'pop', .8)}/>
      <circle cx="230" cy="530" r="100" fill="${C.sky}" fill-opacity=".35" stroke="${C.ink}" stroke-width="5"/>
      <g class="spin" style="transform-origin:230px 530px"><path d="M170 530 q30 -50 60 0 t60 0" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><circle cx="230" cy="470" r="10" fill="${C.clay}"/></g>
      <text x="230" y="720" text-anchor="middle" font-size="30" font-weight="800">start() → “已启动”</text>
      <g${A(1, 'pop', 1.4)}><rect x="450" y="380" width="400" height="90" rx="45" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/><text x="650" y="438" text-anchor="middle" font-size="30" font-weight="700">你：顺便查下日程 📅</text></g>
      <g${A(1, 'pop', 3.0)}><rect x="450" y="500" width="400" height="90" rx="45" fill="${C.sage}" fill-opacity=".35" stroke="${C.ink}" stroke-width="5"/><text x="650" y="558" text-anchor="middle" font-size="30" font-weight="700">AI：好的，马上 ✓</text></g>
      <g${A(1, 'pop', 4.6)}><rect x="450" y="620" width="400" height="90" rx="45" fill="${C.clay}" fill-opacity=".3" stroke="${C.ink}" stroke-width="5"/><text x="650" y="678" text-anchor="middle" font-size="30" font-weight="800">🔔 叮！洗好了</text></g>
    </g>
  `)}</div>
  <div class="abs"${A(2, 'sl', .1)} style="left:0;top:40px;width:430px">
    <div class="phone"><div class="ph-top">群聊</div>
      <div class="bub l"${A(2, 'pop', .8)}>测试又挂了？</div>
      <div class="bub r"${A(2, 'pop', 1.6)}>看了，是超时配置，已修 ✓</div>
      <div class="tagx"${A(2, 'stamp', 2.6)}>≤ 100 字</div></div></div>
  <div class="abs"${A(3, 'sr', .1)} style="left:470px;top:40px;width:466px">
    <div class="doc"><div class="doc-h">PR #482 · 修复超时</div>
      ${['## 背景', '## 改动', '## 验证'].map((h, i) => `<div${A(3, 'fu', .6 + i * .6)}><b>${h}</b><i style="width:${[86, 70, 78][i]}%"></i><i style="width:${[60, 80, 50][i]}%"></i></div>`).join('')}
      <div class="tagx" style="background:${C.sky}"${A(3, 'stamp', 2.8)}>结构完整</div></div></div>`,
},

/* 8 ---------------------------------------------------------------- */
{ id: 'separate', chap: '第四、五招', title: '大脑上云，<br>双手<em>留在原地</em>',
  lines: [
    '第四招，把大脑和双手分开。',
    '大脑，也就是 AI 的主循环，搬到云端常驻，记忆存进数据库，你关电脑它也不下线。',
    '双手留在你的电脑上：代码、环境、密钥都不用搬，只装一个小小的遥控器，按需远程干活。',
    '第五招，看门狗。就像泳池救生员，不只看人还在不在水里，还要看他是不是在原地扑腾。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(1, 'fu', 0)} data-out="3"><g class="loop-bob">
      <path d="M250 240 a80 80 0 0 1 150 -60 a100 100 0 0 1 180 20 a70 70 0 0 1 20 140 h-330 a60 60 0 0 1 -20 -100z" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/>
      <text x="420" y="290" text-anchor="middle" font-size="80">🧠</text></g>
      <g${A(1, 'pop', 1.6)}><ellipse cx="760" cy="200" rx="80" ry="24" fill="${C.oat}" stroke="${C.ink}" stroke-width="5"/><path d="M680 200 v110 a80 24 0 0 0 160 0 v-110" fill="${C.oat}" stroke="${C.ink}" stroke-width="5"/><text x="760" y="290" text-anchor="middle" font-size="26" font-weight="800">记忆库</text></g>
      <text x="420" y="430" text-anchor="middle" font-size="30" font-weight="800">☁️ 云端常驻：关电脑也在线</text>
    </g>
    <g${A(2, 'fu', 0)} data-out="3">
      <rect x="250" y="560" width="340" height="200" rx="14" fill="${C.heather}" stroke="${C.ink}" stroke-width="5"/>
      <rect x="200" y="760" width="440" height="26" rx="10" fill="${C.ink}"/>
      <text x="420" y="650" text-anchor="middle" font-size="28" font-weight="800">💻 你的电脑</text>
      <text x="420" y="700" text-anchor="middle" font-size="24">代码 · 环境 · 密钥</text>
      <g${A(2, 'pop', 1.5)}><rect x="640" y="590" width="90" height="150" rx="20" fill="${C.clay}" stroke="${C.ink}" stroke-width="5"/><circle cx="685" cy="635" r="18" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4"/><text x="685" y="790" text-anchor="middle" font-size="24" font-weight="800">小遥控器</text></g>
      ${[0, 1, 2].map(i => `<path d="M${640 - i * 0} ${520 - i * 30} q45 -40 90 0" fill="none" stroke="${C.clay}" stroke-width="6" stroke-linecap="round" class="wave" style="animation-delay:${i * .3}s;transform-origin:685px 560px"/>`).join('')}
      <path d="M420 440 V555" stroke="${C.ink}" stroke-width="5" stroke-dasharray="10 10" class="flow"/>
    </g>
    <g${A(3, 'fi', 0)}>
      <rect x="0" y="420" width="936" height="400" rx="30" fill="${C.sky}" fill-opacity=".35"/>
      ${[0, 1, 2].map(i => `<path d="M${40 + i * 300} ${470 + i * 8} q40 -20 80 0 t80 0" fill="none" stroke="${C.ivory}" stroke-width="6" class="wavex" style="animation-delay:${-i}s"/>`).join('')}
      <rect x="80" y="160" width="40" height="260" fill="${C.kraft}" stroke="${C.ink}" stroke-width="5"/><rect x="40" y="130" width="180" height="40" rx="8" fill="${C.clay}" stroke="${C.ink}" stroke-width="5"/>
      ${person(130, 60, .9, C.clay)}
      <g class="scan" style="transform-origin:180px 60px"><path d="M180 60 L700 520 L560 600 Z" fill="#F5D77A" fill-opacity=".35"/></g>
      <g class="splash" style="transform-origin:640px 560px"><circle cx="640" cy="540" r="34" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/><path d="M590 540 l-30 -30 M690 540 l30 -30" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>
      <text x="640" y="660" text-anchor="middle" font-size="28" font-weight="800">在原地扑腾？🌀</text>
      <g${A(3, 'pop', 2.4)}><rect x="400" y="190" width="500" height="150" rx="24" fill="${C.ivory}" stroke="${C.ink}" stroke-width="5"/><text x="650" y="250" text-anchor="middle" font-size="32" font-weight="900">🐕 Watchdog</text><text x="650" y="300" text-anchor="middle" font-size="25">盯进度、防跑偏、自动修复</text></g>
    </g>
  `)}</div>`,
},

/* 9 ---------------------------------------------------------------- */
{ id: 'data', chap: '实验', title: '效果怎么样？<br><em>数据说话</em>',
  lines: [
    '效果如何？团队用约三百条模拟消息，做了对比实验。',
    'Super-agent 的 95 分位完成时间是 15.7 分钟；',
    '单会话方案最慢拖到 29.5 分钟，差不多是两倍。',
    '消息越密集，Router 每次决策反而越快，从 6.4 秒降到了 1.6 秒。'],
  html: () => `
  <div class="abs"${A(0, 'fu', .1)} style="left:0;top:0;width:936px">
    <div class="row" style="gap:12px;flex-wrap:wrap">${Array.from({ length: 30 }, (_, i) => `<span class="msg"${A(0, 'pop', .3 + i * .05)} style="background:${i % 7 === 3 ? C.clay : C.oat}"></span>`).join('')}</div>
    <div style="font-size:28px;color:${C.mute};margin-top:16px">≈300 条群聊 + CI 消息 · 约 20 个工作请求 · 每种方案跑 5 次（初步实验）</div></div>
  <div class="abs" style="left:0;top:230px;width:936px">
    <div${A(1, 'fu', 0)}><div class="lbl">Super-agent · 95 分位</div><div class="hbar" style="--w:${15.7 / 29.5 * 100}%;background:${C.sage}"${A(1, 'growx', .3)}><span class="cnt" data-count="15.7" data-at="1" data-d=".3" data-dur="1.6">0</span> 分钟 🐇</div></div>
    <div${A(2, 'fu', 0)} style="margin-top:34px"><div class="lbl">单会话 + 子代理 · 95 分位</div><div class="hbar" style="--w:100%;background:${C.clay}"${A(2, 'growx', .3)}><span class="cnt" data-count="29.5" data-at="2" data-d=".3" data-dur="2.2">0</span> 分钟 🐢</div></div>
  </div>
  <div class="abs card"${A(3, 'pop', 0)} style="left:0;top:610px;width:936px;padding:30px 36px">
    <div style="font-size:30px;color:${C.mute}">Router 每次决策平均耗时（消息 1→40 条/分钟）</div>
    <div class="row" style="align-items:center;gap:30px;margin-top:10px">
      <span class="serif" style="font-size:110px;font-weight:900;color:${C.clayd}"><span class="cnt" data-count="1.6" data-from="6.4" data-at="3" data-d=".8" data-dur="2.4">6.4</span>s</span>
      <div style="font-size:30px;line-height:1.5">🛗 像电梯：<br>人越多，<b>每人</b>越省时间</div></div></div>`,
},

/* 10 --------------------------------------------------------------- */
{ id: 'open', chap: '难题', title: '还没解决的<br><em>四个问号</em>',
  lines: [
    '当然，还有不少难题没解决。',
    '跑上几个月，长期记忆怎么办？没有会话窗口，人又该怎么和它协作？',
    '不同团队的 AI 之间怎么安全对话？钥匙怎样做到能用、但 AI 看不见？',
    '提醒一下：原文讨论的是架构思路，原型也不是 DeepSeek 的正式产品。'],
  html: () => `
  ${[['🧠', '长期记忆', '跑几个月后怎么记？', C.sky], ['🪟', '没有会话窗口', '人怎么和它协作？', C.sage], ['🤝', 'AI 之间对话', '跨团队如何安全通信？', C.kraft], ['🔑', '看不见的钥匙', '凭证能用，但模型看不见', C.fig]].map(([e, k, d, c], i) =>
    `<div class="card flip"${A(1 + (i > 1 ? 1 : 0), 'flip', (i % 2) * 1.6)} style="left:${i % 2 ? 484 : 0}px;top:${Math.floor(i / 2) * 330}px;width:452px;height:290px"><div style="font-size:72px" class="loop-bob">${e}</div><div class="k">${k}</div><div class="d">${d}</div><div class="qm" style="color:${c}">?</div></div>`).join('')}
  <div class="abs note"${A(3, 'fu', .1)} style="left:40px;top:690px;width:856px">⚠️ 原文是<b>架构思路</b>探讨；原型插件 dsh-superagent-prototype <b>并非</b> DeepSeek 正式产品</div>
  <div class="abs"${A(0, 'pop', .2)} data-out="1" style="left:330px;top:200px;font-size:260px;font-weight:900;color:${C.clay}" class="serif">?</div>`,
},

/* 11 --------------------------------------------------------------- */
{ id: 'outro', chap: '总结', title: '从<em>盯着 AI</em><br>到<em>AI 替你盯着</em>',
  lines: [
    '一句话总结：以前是你盯着 AI 干活，',
    '以后是 AI 替你盯着这些事，只在需要你拍板的时候来找你。',
    '你从操作工，变成了签字的那个人。',
    '你想要这样一个 AI 同事吗？评论区聊聊。'],
  html: () => `
  <div class="abs" style="left:0;top:0">${svg(`
    <g${A(0, 'fu', .1)} data-out="1">
      ${person(468, 330, 1.4, C.sky)}
      ${[0, 1, 2, 3, 4].map(i => `<g class="loop-shake" style="animation-delay:${-i * .3}s">${win(40 + i * 175, 520 + (i % 2) * 60, 160, 120, [C.sky, C.sage, C.kraft, C.fig, C.heather][i], '')}</g>`).join('')}
      <text x="468" y="120" text-anchor="middle" font-size="34" font-weight="800">😵 以前：你盯着 AI</text>
    </g>
    <g${A(1, 'fu', 0)} data-out="3">
      <text x="468" y="100" text-anchor="middle" font-size="34" font-weight="800">😌 以后：AI 替你盯着</text>
      <g class="loop-bob">${person(250, 330, 1.3, C.sky)}</g>
      <g class="orbit" style="transform-origin:640px 360px"><g class="cr">${person(640, 190, .9, C.clay)}</g></g>
      <circle cx="640" cy="360" r="170" fill="none" stroke="${C.mute}" stroke-width="3" stroke-dasharray="8 10"/>
      <g${A(1, 'pop', 2.4)}><rect x="300" y="180" width="200" height="70" rx="35" fill="${C.ivory}" stroke="${C.ink}" stroke-width="4"/><text x="400" y="226" text-anchor="middle" font-size="26" font-weight="800">需要你拍板 🙋</text></g>
    </g>
    <g${A(2, 'stamp', .6)} data-out="3"><g transform="translate(468,640) rotate(-8)"><rect x="-190" y="-70" width="380" height="140" rx="16" fill="none" stroke="${C.clayd}" stroke-width="10"/><text y="22" text-anchor="middle" font-size="64" font-weight="900" fill="${C.clayd}" class="serif">批 准 ✓</text></g></g>
  `)}</div>
  <div class="abs"${A(3, 'pop', .1)} style="left:0;top:180px;width:936px;text-align:center">
    <div class="serif" style="font-size:76px;font-weight:900;line-height:1.3">你想要这样一个<br><span style="color:${C.clayd}">AI 同事</span>吗？</div>
    <div class="row" style="justify-content:center;gap:26px;margin-top:60px;font-size:40px;font-weight:800">
      <span class="pillx"${A(3, 'pop', .8)}>💬 评论区聊聊</span><span class="pillx"${A(3, 'pop', 1.1)}>⭐ 收藏</span><span class="pillx"${A(3, 'pop', 1.4)}>➕ 关注</span></div>
    <div class="loop-bob" style="font-size:90px;margin-top:40px">👇</div></div>`,
},
];
const META = { series: 'AI 架构科普', author: '白羊武士', source: 'DeepSeek Harness 团队《Exploring Super-agent Design》' };
if (typeof module !== 'undefined') module.exports = { SCENES, META };
