import fs from 'node:fs';
import crypto from 'node:crypto';
import {tests} from './test.mjs';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p)),hash=p=>crypto.createHash('sha256').update(read(p)).digest('hex');
fs.mkdirSync('reports',{recursive:true});
const resume=process.argv.includes('--resume');
let state=resume&&fs.existsSync('reports/state.json')?json('reports/state.json'):{runId:new Date().toISOString(),rounds:{source:0,fidelity:0,layout:0},status:'RUNNING'};
if(state.status==='STOP'){console.error('STOP: repair budget exhausted. See reports/state.json');process.exit(2);}
if(resume&&state.loop)state.rounds[state.loop]++;
const rows=[];let failure;
const gate=(name,loop,returnTo,fn)=>{if(failure)return;try{fn();rows.push({name,status:'PASS'});}catch(e){failure={name,loop,returnTo,error:e.message};rows.push({...failure,status:'FAIL'});}};
const ok=(v,msg)=>{if(!v)throw Error(msg);};
let sources,cards,slides;
gate('來源整理 → Wiki Ingest → 來源檢查','source','來源整理 / 重新檢索',()=>{sources=json('wiki/sources/catalog.json');ok(sources.length>=5,'至少五份已讀來源');ok(new Set(sources.map(s=>new URL(s.url).hostname)).size>=5,'來源須涵蓋五個網域');for(const s of sources){ok(s.status==='read'&&s.summary&&s.locator&&s.date&&s.name,'來源欄位不完整');const t=read(`wiki/sources/${s.id}.md`);ok(t.includes(s.url)&&t.includes(s.summary),'來源尚未正式 ingest');}ok(read('reports/ingest-log.md').includes('S5'),'缺 ingest log');});
gate('證據卡與 Wiki 忠實度','fidelity','證據卡 / 對應 Wiki',()=>{cards=json('content/evidence.json');for(const c of cards){const wiki=read(c.wiki);ok(wiki.includes(c.claim)&&wiki.includes(c.caveat),`${c.id} 與 Wiki 不符`);for(const r of c.sources)ok(wiki.includes(`sources/${r}.md`)&&sources.some(s=>s.id===r),`${c.id} 無法追溯 ${r}`);}});
gate('教學大綱 → 逐頁內容 → 忠實度檢查','fidelity','逐頁稿',()=>{slides=json('content/slides.json');ok(slides.length===12,'頁數不符');for(const s of slides){ok(read('content/outline.md').includes(s.title),'大綱缺主題');for(const e of s.evidence){const c=cards.find(c=>c.id===e);ok(c,'無效證據');ok(read('content/slide-script.md').includes(c.claim),'逐頁稿缺證據');}}});
gate('HTML 與關鍵觀念模型','fidelity','逐頁稿或對應證據',()=>{for(const t of tests())ok(t.status==='PASS',`${t.name}: ${t.error}`);const html=read('index.html'),sections=html.match(/<section\b[\s\S]*?<\/section>/g)||[];const escape=t=>t.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');for(const [i,s] of slides.entries())for(const e of s.evidence){const c=cards.find(c=>c.id===e);ok(sections[i]?.includes(c.wiki),`第 ${i+1} 頁 HTML 缺 Wiki 連結`);if(i>0)ok(sections[i].includes(escape(c.claim)),`第 ${i+1} 頁 HTML 技術稿與證據不符`);}for(const s of sources)ok(html.includes(s.url),'HTML 缺來源');});
gate('版面與功能測試','layout','HTML templates 排版 / 功能',()=>{ok(fs.existsSync('reports/browser-tests.json'),'缺實際瀏覽器報告');const b=json('reports/browser-tests.json');ok(b.htmlSha256===hash('index.html'),'瀏覽器報告不是目前 HTML 版本');for(const width of [1280,390,360]){const matches=b.viewports.filter(v=>v.width===width);ok(matches.length===1&&matches[0].slides.length===12,`缺 ${width}px 全部 12 頁`);ok(matches[0].slides.every(s=>s.pass),`${width}px 有版面溢出`);}ok(b.functions.every(f=>f.pass)&&b.functions.length>=7,'功能測試未通過或不完整');});
const event={time:new Date().toISOString(),runId:state.runId,rounds:state.rounds,rows,htmlSha256:fs.existsSync('index.html')?hash('index.html'):null};
if(failure){state={...state,...failure,status:state.rounds[failure.loop]>=3?'STOP':'NEEDS_REPAIR'};if(fs.existsSync('reports/release-ready.json'))fs.unlinkSync('reports/release-ready.json');}
else {state={...state,status:'PASS',loop:null,returnTo:null};fs.writeFileSync('reports/release-ready.json',JSON.stringify({htmlSha256:hash('index.html'),runId:state.runId,time:event.time},null,2));rows.push({name:'發布關卡',status:'PASS',note:'允許發布；部署結果另記'});}
fs.writeFileSync('reports/state.json',JSON.stringify(state,null,2));fs.appendFileSync('reports/workflow-runs.jsonl',JSON.stringify({...event,status:state.status})+'\n');
const history=read('reports/workflow-runs.jsonl').trim().split('\n').map(JSON.parse);
fs.writeFileSync('reports/validation-report.md',`# Validation report\n\n每次記錄均由實際執行產生。技術模型檢查不能取代來源判讀；另見 ingest log。\n\n${history.map((h,i)=>`## 執行 ${i+1} · ${h.time}\n\n狀態：${h.status}。修正輪數：${JSON.stringify(h.rounds)}\n\n|關卡|結果|原因|\n|---|---|---|\n${h.rows.map(r=>`|${r.name}|${r.status}|${String(r.error||r.note||'通過').replaceAll('\n',' ').replaceAll('|','／')}|`).join('\n')}`).join('\n\n')}\n\n## 測試範圍\n\n- 可執行參考模型：Page/Block、FTL 更新、GC 搬移前禁止 erase、TRIM 邏輯失效、WAF。\n- 結構與追溯：五份來源、Wiki 與證據卡一致、12 頁與各頁引用。\n- 瀏覽器：見 browser-tests.json 的當前 HTML SHA-256、尺寸、逐頁與功能結果。\n- 未做：實體 SSD 量測、韌體模擬、跨瀏覽器相容性認證。\n`);
console.log(JSON.stringify({status:state.status,rounds:state.rounds,rows},null,2));if(failure)process.exitCode=1;

