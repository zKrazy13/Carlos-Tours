// ====== SETTINGS ======
// Change this to the company's WhatsApp number (country code + number, no + or spaces)
const WHATSAPP = '50489520750';          // used for the links and the booking/review messages
const WHATSAPP_TEXT = '+504 8952-0750';   // how the number is shown in the footer
const FACEBOOK_URL = 'https://www.facebook.com/carlostours1/';
const INSTAGRAM_URL = 'https://www.instagram.com/carlostours_/';

// Gallery: add your photos here (save them in the img/galeria/ folder)
// Example: { src: 'img/galeria/snorkel.jpg', alt: 'Snorkeling on the reef' },
const GALERIA = [
  { src: 'img/galeria/mangrove-boat.jpg', alt: 'Guests on a boat tour through a tunnel of mangroves' },
  { src: 'img/galeria/tarpon-sea-pen.jpg', alt: 'Guests wading among large silver fish in a clear Roatán sea pen' },
  { src: 'img/galeria/sea-turtle.jpg', alt: 'A guest holding a sea turtle in clear shallow water' },
  { src: 'img/galeria/mangrove-water.jpg', alt: 'Crystal-clear turquoise water beside the mangroves' },
];

// Reviews: add the ones you approve here, they will show under the gallery
// Example: { name: 'Jane D.', place: 'Texas, USA', rating: 5, text: 'Our best day in Roatán!', tour: 'Island Tour' },
const REVIEWS = [
];

// ====== Mobile menu and top bar ======
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');

burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });

// ====== Gallery with enlarge view ======
const gal = document.getElementById('gal');
const soon = document.getElementById('soon');
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });

if (!GALERIA.length) {
  gal.innerHTML = '<div class="ph" aria-hidden="true">📷</div>'.repeat(6);
} else {
  soon.hidden = true;
  GALERIA.forEach(f => {
    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = f.src; img.alt = f.alt || ''; img.loading = 'lazy';
    img.addEventListener('click', () => { lbImg.src = f.src; lbImg.alt = img.alt; lightbox.showModal(); });
    fig.appendChild(img); gal.appendChild(fig);
  });
}

// ====== "Book this tour" preselects the service ======
const select = document.getElementById('servicio');
document.querySelectorAll('[data-tour]').forEach(link =>
  link.addEventListener('click', () => { select.value = link.dataset.tour; }));

// ====== Form: opens WhatsApp with the message ready ======
const form = document.getElementById('form');
form.fecha.min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const msg = `Hi, I'm ${d.get('nombre')}. I'd like to book: ${d.get('servicio')}. Date: ${d.get('fecha')}. People: ${d.get('personas')}.`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// ====== Reviews: display ======
const revs = document.getElementById('revs');
if (!REVIEWS.length) {
  revs.innerHTML = '<div class="rev-empty"><p>Reviews from our travelers will appear here. Be the first to share your experience!</p><a class="btn btn-sm" href="#review">Leave a review</a></div>';
} else {
  REVIEWS.forEach(r => {
    const card = document.createElement('article');
    card.className = 'rev';
    const st = document.createElement('div'); st.className = 'st'; st.textContent = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const p = document.createElement('p'); p.textContent = r.text;
    const who = document.createElement('strong'); who.textContent = r.name;
    const sm = document.createElement('small'); sm.textContent = [r.place, r.tour].filter(Boolean).join(' · ');
    card.append(st, p, who, sm); revs.appendChild(card);
  });
}

// ====== Reviews: form (sent by WhatsApp until the backend is ready) ======
const reviewForm = document.getElementById('reviewForm');
const reviewService = document.getElementById('reviewService');
reviewService.innerHTML = '<option value="">Select one (optional)</option>' + select.innerHTML;

reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(reviewForm);
  const service = reviewService.value ? ` Service: ${reviewService.selectedOptions[0].text}.` : '';
  const msg = `New review from ${d.get('nombre')}. Rating: ${d.get('rating')}/5.${service} "${d.get('texto')}"`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  reviewForm.reset();
});

// ====== WhatsApp and social links ======
document.getElementById('fab').href = `https://wa.me/${WHATSAPP}`;
const wa = document.getElementById('wa');
wa.href = `https://wa.me/${WHATSAPP}`;
wa.textContent = `WhatsApp: ${WHATSAPP_TEXT}`;
document.querySelector('[data-social="facebook"]').href = FACEBOOK_URL;
document.querySelector('[data-social="instagram"]').href = INSTAGRAM_URL;

// ====== Aparición suave al hacer scroll (se desactiva si el visitante prefiere menos movimiento) ======
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    setTimeout(() => el.classList.add('in'), el.dataset.delay || 0);
    // al terminar, quita las clases para no interferir con los efectos hover
    setTimeout(() => el.classList.remove('reveal', 'in'), 1000 + Number(el.dataset.delay || 0));
    io.unobserve(el);
  }), { threshold: .15 });
  document.querySelectorAll('.grid, .checks, .rev-grid').forEach(group =>
    [...group.children].forEach((el, i) => { el.classList.add('reveal'); el.dataset.delay = i * 90; io.observe(el); }));
}
