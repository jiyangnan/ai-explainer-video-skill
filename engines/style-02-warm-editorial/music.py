"""Procedurally synthesize an original lo-fi background track (no samples, no copyrighted material).
Usage: python music.py <seconds> <out.wav> [bpm=84] [seed=7]
Needs numpy. Layers: pad chords (Am7-Fmaj7-Cmaj7-G6), plucked arpeggio with echo, sine bass, soft kick/snap/hat.
Intro = pad + arp only (4 bars), main = full kit, outro = last 6 bars without drums, 4 s fade out."""
import sys, wave
import numpy as np

SR = 44100
DUR = float(sys.argv[1])          # seconds
OUT = sys.argv[2]
BPM = float(sys.argv[3]) if len(sys.argv) > 3 else 84
beat = 60 / BPM
bar = 4 * beat
rng = np.random.default_rng(int(sys.argv[4]) if len(sys.argv) > 4 else 7)
N = int(SR * (DUR + 2))
L = np.zeros(N); R = np.zeros(N)

def midi(m): return 440 * 2 ** ((m - 69) / 12)

def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR)
    if i >= N: return
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * (1 - pan) / 2 * 2 ** 0.5
    R[i:i + len(sig)] += sig * gain * (1 + pan) / 2 * 2 ** 0.5

def env(n, a, r):
    e = np.ones(n); na = max(1, int(a * SR)); nr = max(1, int(r * SR))
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr); return e

def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR); y = np.empty_like(x); s = 0.0
    # vectorised-ish one-pole via scipy-free loop on chunks
    for k in range(len(x)):
        s = (1 - a) * x[k] + a * s; y[k] = s
    return y

def pad(notes, length):
    n = int(length * SR); t = np.arange(n) / SR; out = np.zeros(n)
    for m in notes:
        for det in (-0.08, 0.0, 0.08):
            f = midi(m + det)
            ph = (t * f) % 1.0
            out += (2 * np.abs(2 * ph - 1) - 1) * 0.6 + np.sin(2 * np.pi * f * t) * 0.4  # triangle+sine
    out *= env(n, 0.8, 1.2) * (1 + 0.08 * np.sin(2 * np.pi * 0.25 * t))
    return out / (len(notes) * 3)

def pluck(m, length=0.5):
    n = int(length * SR); t = np.arange(n) / SR; f = midi(m)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)
    return s * np.exp(-t * 7) * env(n, 0.004, 0.05)

def bass(m, length):
    n = int(length * SR); t = np.arange(n) / SR; f = midi(m)
    return (np.sin(2 * np.pi * f * t) + 0.2 * np.sin(4 * np.pi * f * t)) * env(n, 0.01, 0.12) * np.exp(-t * 1.2)

def kick():
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 50 + 90 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)

def hat():
    n = int(0.06 * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n); x = x - np.concatenate(([0], x[:-1]))  # crude highpass
    return x * np.exp(-t * 70) * 0.25

def snap():
    n = int(0.18 * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    return (x * 0.5 + np.sin(2 * np.pi * 190 * t)) * np.exp(-t * 22) * 0.5

# progression: Am7 - Fmaj7 - Cmaj7 - G6 (vi-IV-I-V), one bar each
prog = [
    (57, [57, 60, 64, 67]),
    (53, [53, 57, 60, 64]),
    (48, [55, 60, 64, 71]),
    (55, [55, 59, 62, 64]),
]
arp_pat = [0, 2, 1, 3, 2, 1, 3, 2]
nbars = int(DUR / bar) + 2
for b in range(nbars):
    t0 = b * bar
    root, ch = prog[b % 4]
    sec = 0 if b < 4 else (1 if b < nbars - 6 else 2)  # intro / main / outro
    add(pad(ch, bar + 1.2), t0, 0.55, 0)
    if sec >= 1 or b >= 2:
        for k in range(8):
            m = ch[arp_pat[k]] + 12
            add(pluck(m), t0 + k * beat / 2, 0.16 if k % 2 == 0 else 0.11, -0.35 if k % 2 else 0.35)
            # simple echo
            add(pluck(m), t0 + k * beat / 2 + beat * 0.75, 0.05, 0.6 if k % 2 else -0.6)
    if sec == 1:
        for q in range(4):
            add(bass(root - 12, beat * 0.95), t0 + q * beat, 0.45 if q in (0, 2) else 0.3)
            if q in (0, 2): add(kick(), t0 + q * beat, 0.55)
            if q in (1, 3): add(snap(), t0 + q * beat, 0.18, 0.1)
            add(hat(), t0 + q * beat + beat / 2, 0.5, 0.3)
            if b % 2: add(hat(), t0 + q * beat + beat * 0.75, 0.25, -0.3)

# gentle warmth: lowpass the full mix a little
mix = np.stack([L, R])
mix = np.stack([lowpass(c, 6500) for c in mix])
mix = mix[:, : int(DUR * SR)]
fade_in, fade_out = int(1.5 * SR), int(4 * SR)
mix[:, :fade_in] *= np.linspace(0, 1, fade_in)
mix[:, -fade_out:] *= np.linspace(1, 0, fade_out)
mix /= np.max(np.abs(mix)) + 1e-9
mix *= 0.85
pcm = (mix.T * 32767).astype(np.int16)
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('wrote', OUT, DUR)
