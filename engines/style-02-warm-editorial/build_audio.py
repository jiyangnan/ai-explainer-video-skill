"""Builds voice.wav (every line placed at its exact timeline offset) and sfx.wav (soft whoosh at each scene cut).
Usage: python3 build_audio.py <project_dir>   (needs timing.json from timing.py)"""
import json, subprocess, sys
W = sys.argv[1]; T = json.load(open(f'{W}/timing.json')); total = sum(s['dur'] for s in T)
def run(args): subprocess.run(['ffmpeg', '-v', 'error', '-y', *args], check=True)
ins, fl, off, k = [], [], 0.0, 0
for s in T:
    for st, f in zip(s['starts'], s['files']):
        ms = int((off + st) * 1000); ins += ['-i', f]
        fl.append(f'[{k}:a]aresample=44100,aformat=channel_layouts=stereo,adelay={ms}|{ms}[a{k}]'); k += 1
    off += s['dur']
fl.append(''.join(f'[a{i}]' for i in range(k)) + f'amix=inputs={k}:normalize=0:duration=longest,apad,atrim=0:{total:.3f}[v]')
run([*ins, '-filter_complex', ';'.join(fl), '-map', '[v]', '-c:a', 'pcm_s16le', f'{W}/voice.wav'])
# whoosh: band-passed pink noise with sine fades
run(['-f', 'lavfi', '-i', 'anoisesrc=color=pink:duration=0.7:amplitude=0.6,bandpass=f=900:width_type=o:w=2,afade=t=in:d=0.35:curve=qsin,afade=t=out:st=0.35:d=0.35:curve=qsin,aformat=channel_layouts=stereo,aresample=44100', f'{W}/whoosh.wav'])
cuts, o = [], 0.0
for s in T[:-1]: o += s['dur']; cuts.append(o - 0.35)
if cuts:
    ins, fl = [], []
    for i, t in enumerate(cuts):
        ins += ['-i', f'{W}/whoosh.wav']; ms = int(t * 1000); fl.append(f'[{i}:a]adelay={ms}|{ms}[w{i}]')
    fl.append(''.join(f'[w{i}]' for i in range(len(cuts))) + f'amix=inputs={len(cuts)}:normalize=0,apad,atrim=0:{total:.3f}[o]')
    run([*ins, '-filter_complex', ';'.join(fl), '-map', '[o]', f'{W}/sfx.wav'])
else:
    run(['-f', 'lavfi', '-i', f'anullsrc=r=44100:cl=stereo', '-t', f'{total:.3f}', f'{W}/sfx.wav'])
print(f'voice.wav + sfx.wav built, total {total:.1f}s')
