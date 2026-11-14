import assert from 'node:assert/strict';
import fs from 'node:fs';
export function tests(){
 const results=[];const test=(name,fn)=>{try{fn();results.push({name,status:'PASS'});}catch(e){results.push({name,status:'FAIL',error:e.message});}};
 // A deliberately small reference model checks the invariants represented in the diagrams.
 const pages=[{lba:'A',valid:false},{lba:'B',valid:true},{lba:'C',valid:true},{lba:'D',valid:false},null,null,null,null];
 const map={A:4,B:1,C:2};pages[4]={lba:'A',valid:true};
 const erase=()=>{assert(!pages.slice(0,4).some(p=>p?.valid),'live pages must be migrated');pages.fill(null,0,4);};
 test('Page/Block：不能單頁 erase，拒絕擦除仍含有效資料的 Block',()=>assert.throws(erase));
 test('FTL：A 更新後讀取新頁，舊頁保持 invalid',()=>{assert.equal(map.A,4);assert.equal(pages[map.A].lba,'A');assert.equal(pages[0].valid,false);});
 test('GC：先搬 B/C 並更新 mapping，再整體 erase',()=>{for(const [from,to] of [[1,5],[2,6]]){pages[to]={...pages[from]};map[pages[to].lba]=to;pages[from].valid=false;}erase();assert(pages.slice(0,4).every(p=>p===null));assert.equal(pages[map.B].lba,'B');assert.equal(pages[map.C].lba,'C');});
 test('TRIM：logical invalidation 不會直接 erase Block',()=>{const old=map.A;delete map.A;pages[old].valid=false;assert(pages[old]!==null);assert.equal(map.A,undefined);});
 test('WAF：一致頁大小的 6 / 4 = 1.5',()=>assert.equal((4+2)/4,1.5));
 const html=fs.readFileSync('index.html','utf8'),cards=JSON.parse(fs.readFileSync('content/evidence.json','utf8'));
 test('12 頁與 12 組證據標記',()=>{assert.equal((html.match(/<section\b[^>]*data-slide=/g)||[]).length,12);assert.equal((html.match(/<section\b[^>]*data-evidence=/g)||[]).length,12);});
 test('GC 圖示順序與有效頁相符',()=>{assert(html.includes('② 搬移到 B1，更新 B / C mapping'));assert(html.includes('③ B0 才能 erase'));});
 test('關鍵限制寫入 Wiki：Page / LBA、TRIM、GC',()=>{assert(cards.find(c=>c.id==='E06').caveat.includes('LBA 大小不一定等於 Page'));assert(cards.find(c=>c.id==='E09').claim.includes('不保證立即擦除'));assert(cards.find(c=>c.id==='E07').claim.includes('更新 mapping，才 erase'));});
 return results;
}
if(process.argv[1]?.endsWith('test.mjs')){const r=tests();console.log(JSON.stringify(r,null,2));if(r.some(x=>x.status==='FAIL'))process.exitCode=1;}
