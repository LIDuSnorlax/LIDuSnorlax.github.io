const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
 const open = nav.classList.toggle('open');
 menu.setAttribute('aria-expanded', String(open));
 menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
 nav.classList.remove('open'); menu.setAttribute('aria-expanded','false');
}));

const cards = [...document.querySelectorAll('.project-card')];
const tabs = [...document.querySelectorAll('.filter')];
const pageLabel = document.getElementById('project-page');
const prev = document.getElementById('project-prev');
const next = document.getElementById('project-next');
let category = tabs[0].dataset.filter;
let page = 0;
const PER_PAGE = 2;
function renderProjects() {
 const matching = cards.filter(c => c.dataset.category === category);
 const pages = Math.max(1, Math.ceil(matching.length / PER_PAGE));
 page = Math.max(0, Math.min(page, pages - 1));
 cards.forEach(card => {card.hidden = true;});
 matching.slice(page * PER_PAGE, (page + 1)*PER_PAGE).forEach(card => {card.hidden = false;});
 pageLabel.textContent = `${String(page + 1).padStart(2,'0')} / ${String(pages).padStart(2,'0')}`;
 prev.disabled = page === 0; next.disabled = page >= pages - 1;
}
tabs.forEach(tab => tab.addEventListener('click', () => {
 category = tab.dataset.filter; page = 0;
 tabs.forEach(t => { const active=t===tab; t.classList.toggle('active',active); t.setAttribute('aria-pressed',String(active)); });
 renderProjects();
}));
prev.addEventListener('click', () => {page--; renderProjects();});
next.addEventListener('click', () => {page++; renderProjects();});
renderProjects();

const langButtons=[...document.querySelectorAll('.lang-option')];
const translatable=[...document.querySelectorAll('[data-i18n]')];
const htmlTranslatable=[...document.querySelectorAll('[data-i18n-html]')];
let messages={};
fetch('translations.json').then(r=>{if(!r.ok) throw Error('translation load failed');return r.json();}).then(data=>{messages=data;setLang(localStorage.getItem('li-du-language')||'en');}).catch(()=>{
 // Offline file:// preview fallback: multilingual strings embedded in translations.js
 if(window.PORTFOLIO_TRANSLATIONS){messages=window.PORTFOLIO_TRANSLATIONS;setLang(localStorage.getItem('li-du-language')||'en');}
});
function setLang(lang){
 if(!['en','ja','zh'].includes(lang))lang='en';
 translatable.forEach(el=>{
   const key=el.dataset.i18n;
   const suffix=el.textContent.endsWith(' ↗')?' ↗':el.textContent.endsWith(' ↑')?' ↑':'';
   if(messages[key])el.textContent=(messages[key][lang]||key)+suffix;
 });
 htmlTranslatable.forEach(el=>{
   const key=el.dataset.i18nHtml;
   if(messages[key]) el.innerHTML=messages[key][lang]||messages[key].en;
 });
 document.documentElement.lang=lang==='zh'?'zh-Hans':lang;
 document.title=({en:'LI Du — Graphics, AI & Software Engineer',ja:'LI Du — グラフィックス・AI・ソフトウェア',zh:'LI Du — 图形、人工智能与软件工程'})[lang];
 langButtons.forEach(b=>{const active=b.dataset.lang===lang;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 startHeroTyping();
 try{localStorage.setItem('li-du-language',lang);}catch(e){}
}
langButtons.forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
document.getElementById('year').textContent=new Date().getFullYear();

// V5: localized character-by-character hero title. Cancels any previous animation.
let heroTypingTimer = null;
function startHeroTyping() {
  if (heroTypingTimer !== null) clearInterval(heroTypingTimer);
  const first = document.querySelector('.typing-first');
  const second = document.querySelector('.typing-second');
  if (!first || !second) return;
  const partOne = Array.from(first.textContent);
  const partTwo = Array.from(second.textContent);
  const fullTitle = [...partOne, ' ', ...partTwo];
  const heading = document.querySelector('.hero-title');
  heading.setAttribute('aria-label', fullTitle.join(''));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const textOne = partOne.join('');
  const textTwo = partTwo.join('');
  first.textContent = '';
  second.textContent = '';
  let index = 0;
  const draw = () => {
    index++;
    first.textContent = Array.from(textOne).slice(0,index).join('');
    second.textContent = Array.from(textTwo).slice(0,Math.max(0,index-partOne.length-1)).join('');
    if (index >= fullTitle.length) { clearInterval(heroTypingTimer); heroTypingTimer=null; }
  };
  heroTypingTimer = setInterval(draw, 55);
}
