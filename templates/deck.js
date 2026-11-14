const slides=[...document.querySelectorAll('.slide')];
const counter=document.querySelector('#counter'),progress=document.querySelector('progress');
let current=0;
function show(n){current=Math.max(0,Math.min(slides.length-1,n));slides.forEach((s,i)=>{s.classList.toggle('active',i===current);s.hidden=i!==current;s.setAttribute('aria-hidden',i!==current);});counter.textContent=`${current+1} / ${slides.length}`;progress.value=current+1;document.querySelector('#prev').disabled=current===0;document.querySelector('#next').disabled=current===slides.length-1;history.replaceState(null,'',`#${current+1}`);document.title=`${current+1}. ${slides[current].querySelector('h1').textContent} · Inside SSD`;}
document.querySelector('#prev').onclick=()=>show(current-1);
document.querySelector('#next').onclick=()=>show(current+1);
document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT|SUMMARY/.test(e.target.tagName)||e.ctrlKey||e.altKey||e.metaKey)return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(current+1);}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1);}if(e.key==='Home'){e.preventDefault();show(0);}if(e.key==='End'){e.preventDefault();show(slides.length-1);}});
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>window.scrollTo(0,0)));
document.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','PageDown','PageUp','Home','End',' '].includes(e.key)&&e.target.tagName!=='SUMMARY')window.scrollTo(0,0);});
window.addEventListener('hashchange',()=>show((parseInt(location.hash.slice(1))||1)-1));
show((parseInt(location.hash.slice(1))||1)-1);
