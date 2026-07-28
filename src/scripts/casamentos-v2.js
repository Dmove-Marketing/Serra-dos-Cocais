/* Scripts extraídos de casamentos-v2.html */

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

// Campo condicional "Nome dos noivos" — aparece para Casamento/Bodas
(function(){
  const tipoEvento = document.getElementById('tipoEvento');
  const nomeNoivos = document.getElementById('nomeNoivos');
  if(!tipoEvento || !nomeNoivos) return;
  const group = nomeNoivos.closest('.form-group');
  if(!group) return;

  function sync(){
    const show = tipoEvento.value === 'Casamento' || tipoEvento.value === 'Bodas';
    group.classList.toggle('show-field', show);
    nomeNoivos.required = show;
  }
  tipoEvento.addEventListener('change', sync);
  sync();
})();

// Placeholder da Mensagem — muda para Confraternização social / Outros
(function(){
  const tipoEvento = document.getElementById('tipoEvento');
  const mensagem = document.getElementById('mensagemField');
  if(!tipoEvento || !mensagem) return;
  const placeholderCasamento = 'Conte um pouco sobre o casamento que vocês imaginam';
  const placeholderEvento = 'Conte um pouco sobre o evento que vocês imaginam';

  function sync(){
    const outroTipo = tipoEvento.value === 'Confraternização social' || tipoEvento.value === 'Outros';
    mensagem.placeholder = outroTipo ? placeholderEvento : placeholderCasamento;
  }
  tipoEvento.addEventListener('change', sync);
  sync();
})();

// Carrossel "entre-gal" (mobile) — setas de navegação manual
(function(){
  const wrap = document.getElementById('entreGal');
  if(!wrap) return;
  const track = wrap.querySelector('.entre-gal-track');
  const prev = wrap.querySelector('.entre-gal-arrow.prev');
  const next = wrap.querySelector('.entre-gal-arrow.next');
  if(!track || !prev || !next) return;

  prev.addEventListener('click', ()=> track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
  next.addEventListener('click', ()=> track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }));
})();

// Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.reveal,.stagger').forEach(el=>io.observe(el));

// Máscara simples de data dd/mm/aaaa
document.getElementById('f-data')?.addEventListener('input', (ev) => {
  const dataInput = ev.target;
  let v = dataInput.value.replace(/\D/g,'').slice(0,8);
  if(v.length>4) v = v.slice(0,2)+'/'+v.slice(2,4)+'/'+v.slice(4);
  else if(v.length>2) v = v.slice(0,2)+'/'+v.slice(2);
  dataInput.value = v;
});

// Envio do formulário
document.getElementById('leadForm')?.addEventListener('submit',(ev)=>{
  ev.preventDefault();
  const f = ev.target;
  if(!f.nome.value.trim() || !f.telefone.value.trim() || !f.email.value.trim()){
    f.reportValidity();
    return;
  }
  Array.from(f.children).forEach(child => {
    if (child.id !== 'formOk') {
      child.style.display = 'none';
    }
  });
  const ok = document.getElementById('formOk');
  if (ok) {
    ok.style.display = 'block';
    ok.style.textAlign = 'center';
    ok.style.padding = '32px 16px';
    ok.style.fontSize = '18px';
    ok.style.background = 'rgba(255,255,255,0.08)';
    ok.style.border = '1px solid rgba(255,255,255,0.2)';
    ok.style.borderRadius = '4px';
    ok.style.color = '#fff';
  }
});

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