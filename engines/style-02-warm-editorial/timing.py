import json,subprocess,sys
W=sys.argv[1]; sc=json.load(open(f'{W}/script.json')); LEAD=.7; GAP=.3; TAIL=.6; out=[]
for si,s in enumerate(sc):
    t=LEAD; starts=[]; files=[]
    for li,_ in enumerate(s['lines']):
        f=f'{W}/aud/{si:02d}_{li:02d}.mp3'
        d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
        starts.append(round(t,3)); files.append(f); t+=d+GAP
    out.append({'starts':starts,'files':files,'dur':round(t-GAP+TAIL,3)})
json.dump(out,open(f'{W}/timing.json','w'),indent=1)
print('total',round(sum(o['dur'] for o in out),1),[o['dur'] for o in out])
