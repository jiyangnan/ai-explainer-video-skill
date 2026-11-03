#!/usr/bin/env bash
# One-shot pipeline. Run from a project dir that contains a copy of engine/* plus your scenes.js (+ optional say.json).
#   bash build.sh            -> full build: tts, timing, preview stills, render, audio, mix, cover
#   STEP=preview bash build.sh  -> stop after preview stills (inspect out/p*_*.png before the long render)
# Env: PY (python with edge-tts + numpy), VOICE, RATE, BPM, WORKERS, OUT (final file name)
set -euo pipefail
W="$(cd "$(dirname "$0")" && pwd)"; cd "$W"
PY="${PY:-python3}"; OUT="${OUT:-final.mp4}"; BPM="${BPM:-84}"
[ -d node_modules/@fontsource/noto-serif-sc ] || npm i -s @fontsource/noto-serif-sc @fontsource/noto-sans-sc >/dev/null
node -e "const {SCENES}=require('./scenes.js');require('fs').writeFileSync('script.json',JSON.stringify(SCENES.map(s=>({id:s.id,lines:s.lines})),null,1));console.log('scenes',SCENES.length,'lines',SCENES.reduce((a,s)=>a+s.lines.length,0))"
"$PY" -I tts.py "$W"
python3 timing.py "$W"
node render.js preview
[ "${STEP:-}" = "preview" ] && { echo "preview done -> out/p*_*.png"; exit 0; }
node render.js all ${WORKERS:-}
: > concat.txt; for f in out/scene_*.mp4; do echo "file '$W/$f'" >> concat.txt; done
ffmpeg -v error -y -f concat -safe 0 -i concat.txt -c copy video_only.mp4
python3 build_audio.py "$W"
TOTAL=$(python3 -c "import json;print(round(sum(s['dur'] for s in json.load(open('timing.json'))),3))")
"$PY" -I music.py "$TOTAL" bgm.wav "$BPM"
# voice -> -16 LUFS; music -> -24 LUFS then sidechain-ducked by the voice; whoosh at 35%; limiter at -1 dBFS
ffmpeg -v error -y -i video_only.mp4 -i voice.wav -i bgm.wav -i sfx.wav -filter_complex \
 "[1:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100,asplit=2[v][sc];[2:a]loudnorm=I=-24:TP=-3,aresample=44100[m];[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=600[md];[3:a]volume=0.35[fx];[v][md][fx]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.89[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1440}});await p.goto('file://$W/cover.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);await p.screenshot({path:'$W/cover.png'});await b.close()})()"
ffmpeg -hide_banner -i "$OUT" -af ebur128=framelog=quiet -f null - 2>&1 | grep -A1 "Integrated" | tail -1
ffprobe -v error -show_entries format=duration:stream=width,height -of default=nw=1 "$OUT"
echo "done -> $W/$OUT + $W/cover.png"
