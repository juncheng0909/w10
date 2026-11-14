import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';
const results=[];const root=process.cwd();
function fixture(){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'w10-gates-'));for(const p of ['scripts','wiki','content','reports','index.html'])fs.cpSync(path.join(root,p),path.join(dir,p),{recursive:true});return dir;}
function run(dir,resume=false){return spawnSync(process.execPath,['scripts/workflow.mjs',...(resume?['--resume']:[])],{cwd:dir,encoding:'utf8'});}
function state(dir){return JSON.parse(fs.readFileSync(path.join(dir,'reports/state.json'),'utf8'));}
for(const [name,fn] of [
 ['來源不足退回檢索、三輪失敗後 STOP，第四次禁止繼續',()=>{const d=fixture(),p=path.join(d,'wiki/sources/catalog.json');fs.writeFileSync(p,'[]');assert.equal(run(d).status,1);assert.equal(state(d).loop,'source');for(let i=1;i<=3;i++){run(d,true);assert.equal(state(d).rounds.source,i);}assert.equal(state(d).status,'STOP');assert.equal(run(d,true).status,2);assert(!fs.existsSync(path.join(d,'reports/release-ready.json')));}],
 ['證據錯誤退回證據卡',()=>{const d=fixture(),p=path.join(d,'content/evidence.json'),c=JSON.parse(fs.readFileSync(p));c[0].claim='故意注入的測試錯誤';fs.writeFileSync(p,JSON.stringify(c));run(d);assert.equal(state(d).returnTo,'證據卡 / 對應 Wiki');}],
 ['逐頁稿缺證據退回逐頁稿',()=>{const d=fixture();fs.writeFileSync(path.join(d,'content/slide-script.md'),'');run(d);assert.equal(state(d).returnTo,'逐頁稿');}],
 ['HTML 雜湊變更使瀏覽器報告失效，退回 HTML',()=>{const d=fixture();fs.appendFileSync(path.join(d,'index.html'),'\n<!-- isolated stale-report test -->');run(d);assert.equal(state(d).loop,'layout');assert.equal(state(d).status,'NEEDS_REPAIR');}]
]){try{fn();results.push({name,status:'PASS'});}catch(e){results.push({name,status:'FAIL',error:e.message});}}
fs.writeFileSync('reports/workflow-contract-tests.json',JSON.stringify({time:new Date().toISOString(),note:'Intentional faults were injected only into temporary copies, not the submitted teaching content.',results},null,2));console.log(JSON.stringify(results,null,2));if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
