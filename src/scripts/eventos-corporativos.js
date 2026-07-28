/* Scripts — eventos-corporativos */

document.getElementById('yr').textContent = new Date().getFullYear();

// Menu fixo — muda de cor ao sair do hero (logo e botão são brancos)
(function(){
  const nav = document.getElementById('siteNav');
  const hero = document.getElementById('topo');
  if(!nav || !hero) return;
  const navIO = new IntersectionObserver(([entry])=>{
    nav.classList.toggle('scrolled', !entry.isIntersecting);
  }, { rootMargin: '-100px 0px 0px 0px' });
  navIO.observe(hero);
})();

// Carrosséis de fotos (Estrutura / Hospedagem) — setas de navegação manual
document.querySelectorAll('.carousel').forEach((wrap) => {
  const track = wrap.querySelector('.carousel-track');
  const prev = wrap.querySelector('.carousel-arrow.prev');
  const next = wrap.querySelector('.carousel-arrow.next');
  if(!track || !prev || !next) return;
  const scrollAmount = () => {
    const items = track.querySelectorAll('.carousel-item');
    let width = track.clientWidth * 0.9;
    for (const item of items) {
      if (item.offsetWidth > 0) { width = item.offsetWidth; break; }
    }
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
    return width + gap;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
});

// Máscara simples de data dd/mm/aaaa
document.getElementById('f-data')?.addEventListener('input', (ev) => {
  const dataInput = ev.target;
  let v = dataInput.value.replace(/\D/g,'').slice(0,8);
  if(v.length>4) v = v.slice(0,2)+'/'+v.slice(2,4)+'/'+v.slice(4);
  else if(v.length>2) v = v.slice(0,2)+'/'+v.slice(2);
  dataInput.value = v;
});

// Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.reveal,.stagger').forEach(el=>io.observe(el));

// Lightbox — todas as imagens de conteúdo ampliam em pop-up ao clicar
(function(){
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCaption = lb.querySelector('.lightbox-caption');
  const excluded = ['nav-logo','footer-logo'];

  function openLightbox(img){
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(()=>lb.classList.add('show'));
  }
  function closeLightbox(){
    lb.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(()=>{ lb.classList.remove('open'); lbImg.src=''; }, 300);
  }

  document.querySelectorAll('img').forEach(img=>{
    if (excluded.some(c=>img.classList.contains(c))) return;
    img.setAttribute('data-zoomable','');
    img.addEventListener('click', (e)=>{
      e.preventDefault();
      e.stopPropagation();
      openLightbox(img);
    });
  });

  lb.addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox-close').addEventListener('click', (e)=>{ e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && lb.classList.contains('open')) closeLightbox(); });
})();
