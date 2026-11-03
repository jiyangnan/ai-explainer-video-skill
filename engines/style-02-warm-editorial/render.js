// Deterministic frame renderer: seeks every CSS/WAAPI animation to t, screenshots, pipes JPEG frames to ffmpeg.
// Usage (run inside the project dir that holds stage.html + scenes.js + timing.json):
//   node render.js preview            -> out/p<scene>_<line>.png, one still near the end of every narration line
//   node render.js scenes '[0,3]'     -> out/scene_00.mp4, out/scene_03.mp4
//   node render.js all [workers]      -> renders every scene, balanced across worker processes (default: CPU count)
const {chromium}=require('playwright');const fs=require('fs');const os=require('os');const {spawn}=require('child_process');
const W=__dirname;const T=JSON.parse(fs.readFileSync(W+'/timing.json'));const FPS=+(process.env.FPS||30);
const VW=+(process.env.VW||1080),VH=+(process.env.VH||1920);
fs.mkdirSync(W+'/out',{recursive:true});
async function page(b){const p=await b.newPage({viewport:{width:VW,height:VH}});await p.goto('file://'+W+'/stage.html');await p.evaluate(()=>document.fonts.ready);return p;}
async function prep(p,si){await p.evaluate(([si,s,d,n])=>{setup(si,s,d,n);},[si,T[si].starts,T[si].dur,T.length]);
 // force-load every CJK subset actually used in this scene (fontsource splits CJK into unicode-range chunks)
 await p.evaluate(async()=>{const txt=document.body.innerText+document.getElementById('sub').textContent;await Promise.all(['Noto Serif SC','Noto Sans SC'].flatMap(f=>['400','700','900'].map(w=>document.fonts.load(`${w} 40px "${f}"`,txt))));});}
async function renderScenes(scenes){const b=await chromium.launch();const p=await page(b);
 for(const si of scenes){await prep(p,si);
  // preload fonts for every subtitle line of the scene too
  await p.evaluate(async(lines)=>{await Promise.all(['Noto Sans SC'].flatMap(f=>['700'].map(w=>document.fonts.load(`${w} 40px "${f}"`,lines.join('')))));},(await p.evaluate(si=>SCENES[si].lines,si)));
  const n=Math.round(T[si].dur*FPS);const outf=`${W}/out/scene_${String(si).padStart(2,'0')}.mp4`;
  const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-r',String(FPS),outf]);
  for(let f=0;f<n;f++){await p.evaluate(t=>seek(t),f/FPS);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
  ff.stdin.end();const code=await new Promise(r=>ff.on('close',r));console.log(`scene ${si} frames ${n} ffmpeg_exit ${code}`);}
 await b.close();}
(async()=>{const mode=process.argv[2];
 if(mode==='preview'){const b=await chromium.launch();const p=await page(b);
  for(let si=0;si<T.length;si++){await prep(p,si);const s=T[si].starts;
   for(let li=0;li<s.length;li++){const end=(li+1<s.length?s[li+1]:T[si].dur)-0.5;await p.evaluate(t=>seek(t),end);await p.waitForTimeout(30);await p.screenshot({path:`${W}/out/p${si}_${li}.png`});}}
  await b.close();console.log('preview stills written to out/p*_*.png');}
 else if(mode==='scenes'){await renderScenes(JSON.parse(process.argv[3]));}
 else if(mode==='all'){const N=+(process.argv[3]||os.cpus().length);
  // greedy balance by duration, longest first
  const order=T.map((s,i)=>[s.dur,i]).sort((a,b)=>b[0]-a[0]);const g=Array.from({length:N},()=>({t:0,s:[]}));
  for(const [d,i] of order){g.sort((a,b)=>a.t-b.t);g[0].t+=d;g[0].s.push(i);}
  await Promise.all(g.filter(x=>x.s.length).map(x=>new Promise((res,rej)=>{const c=spawn('node',[__filename,'scenes',JSON.stringify(x.s)],{stdio:'inherit'});c.on('close',k=>k?rej(new Error('worker failed '+k)):res());})));
  console.log('all scenes rendered');}
 else {console.error('usage: node render.js preview | scenes \'[0,1]\' | all [workers]');process.exit(2);}
})().catch(e=>{console.error(e);process.exit(1);});
