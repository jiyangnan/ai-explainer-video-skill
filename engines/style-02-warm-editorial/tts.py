"""Per-line Chinese narration with edge-tts.
Usage: python tts.py <project_dir>
Env: VOICE (default zh-CN-YunxiNeural), RATE (default +12%), HTTPS_PROXY (passed explicitly: aiohttp ignores proxy env vars).
Optional <project_dir>/say.json: {"written form": "spoken form"} replacements for TTS only (subtitles keep the written form).
"""
import asyncio, json, os, sys, edge_tts
W = sys.argv[1]; proxy = os.environ.get('HTTPS_PROXY') or None
VOICE = os.environ.get('VOICE', 'zh-CN-YunxiNeural'); RATE = os.environ.get('RATE', '+12%')
sc = json.load(open(f'{W}/script.json'))
say = json.load(open(f'{W}/say.json')) if os.path.exists(f'{W}/say.json') else {}
os.makedirs(f'{W}/aud', exist_ok=True)
sem = asyncio.Semaphore(4)
async def one(si, li, text):
    out = f'{W}/aud/{si:02d}_{li:02d}.mp3'
    if os.path.exists(out) and os.path.getsize(out) > 1000: return
    for k, v in say.items(): text = text.replace(k, v)
    async with sem:
        for a in range(4):
            try:
                await edge_tts.Communicate(text, VOICE, rate=RATE, proxy=proxy).save(out); return
            except Exception as e:
                print('retry', si, li, e); await asyncio.sleep(2 * (a + 1))
        raise SystemExit(f'TTS failed for {si}_{li}')
async def main():
    await asyncio.gather(*[one(si, li, t) for si, s in enumerate(sc) for li, t in enumerate(s['lines'])])
asyncio.run(main())
print('tts done')
