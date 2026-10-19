// ====== Menu ======
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });

// ====== Contact links ======
document.getElementById('fab').href = `https://wa.me/${WHATSAPP}`;
const wa = document.getElementById('wa');
wa.href = `https://wa.me/${WHATSAPP}`;
wa.textContent = `WhatsApp: ${WHATSAPP_TEXT}`;
document.querySelector('[data-social="facebook"]').href = FACEBOOK_URL;
document.querySelector('[data-social="instagram"]').href = INSTAGRAM_URL;

// ====== Tour page ======
const id = new URLSearchParams(location.search).get('id');
const t = TOURS[id];
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
};

if (!t) {
  document.getElementById('tpMain').innerHTML = '<a class="back" href="index.html#tours">← All tours</a><h1>Tour not found</h1><p class="lead">We could not find that tour. <a href="index.html#tours">See all our tours</a>.</p>';
} else {
  document.title = `${t.name} | Carlos Tours & Adventure`;
  document.getElementById('tTitle').textContent = t.name;
  document.getElementById('tShort').textContent = t.short || '';

  // Photos or color banner
  const media = document.getElementById('tMedia');
  if (t.images && t.images.length) {
    const big = el('img', 'tmain'); big.src = t.images[0]; big.alt = t.name;
    media.append(big);
    if (t.images.length > 1) {
      const th = el('div', 'thumbs');
      t.images.forEach(src => {
        const s = el('img'); s.src = src; s.alt = '';
        s.addEventListener('click', () => { big.src = src; });
        th.append(s);
      });
      media.append(th);
    }
  } else {
    media.append(el('div', 'tmedia-ph ' + t.g, t.emoji));
  }

  // Information cards
  const infos = document.getElementById('infos');
  const card = (title, ...nodes) => { const c = el('section', 'info'); c.append(el('h2', null, title), ...nodes); infos.append(c); return c; };
  const list = (items, cls) => { const u = el('ul', cls); items.forEach(i => u.append(el('li', null, i))); return u; };

  card('Description', ...t.description.map(p => el('p', null, p)));

  const basics = [['Ages', t.ages], ['Duration', t.duration], ['Guide', t.guide]].filter(r => r[1]);
  if (basics.length) {
    const ul = el('ul', 'facts');
    basics.forEach(([k, v]) => { const li = el('li'); li.append(el('strong', null, k + ': '), document.createTextNode(v)); ul.append(li); });
    card('Package details', ul);
  }

  const prices = el('div', 'plist'), pul = el('ul');
  ['adult', 'teen', 'child'].forEach(k => {
    const li = el('li'); li.append(el('span', null, AGES[k]), el('em'), el('b', null, money(priceFor(t, k)))); pul.append(li);
  });
  prices.append(pul);
  card('Prices per person', prices);

  const inc = card('What is included', list([...COMMON_INCLUDED, ...(t.includes || [])], 'ticks yes'));
  if (t.notIncluded && t.notIncluded.length) inc.append(el('h3', null, 'Not included'), list(t.notIncluded, 'ticks no'));
  card('What to expect', list(t.expect || COMMON_EXPECT, 'dots'));
  if (t.tips && t.tips.length) card('Good to know', list(t.tips, 'dots'));

  // Booking panel
  const state = { adult: 1, teen: 0, child: 0 };
  const total = document.getElementById('tTotal');
  const dateIn = document.getElementById('tDate');
  dateIn.min = new Date().toISOString().split('T')[0];
  const sum = () => Object.keys(state).reduce((s, k) => s + state[k] * priceFor(t, k), 0);
  const update = () => { total.textContent = money(sum()); };

  const counts = document.getElementById('counts');
  Object.keys(state).forEach(k => {
    const out = el('output', null, String(state[k]));
    const btn = (sym, d) => {
      const b = el('button', null, sym); b.type = 'button';
      b.setAttribute('aria-label', (d > 0 ? 'Add ' : 'Remove ') + AGES[k]);
      b.addEventListener('click', () => { state[k] = Math.max(k === 'adult' ? 1 : 0, Math.min(30, state[k] + d)); out.textContent = state[k]; update(); });
      return b;
    };
    const ctl = el('div', 'ctl'); ctl.append(btn('−', -1), out, btn('+', 1));
    const row = el('div', 'count'); row.append(el('span', null, `${AGES[k]} · ${money(priceFor(t, k))}`), ctl);
    counts.append(row);
  });
  update();

  document.getElementById('tForm').addEventListener('submit', e => {
    e.preventDefault();
    const amount = sum();
    const msg = `Hi, I'd like to book: ${t.service}. Date: ${dateIn.value}. Adults: ${state.adult}, Teenagers: ${state.teen}, Children: ${state.child}.` + (amount ? ` Estimated total: ${money(amount)}.` : '');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  // Other tours
  const more = document.getElementById('more');
  Object.entries(TOURS).filter(([k]) => k !== id).forEach(([k, o]) => {
    const a = el('a', 'chip'); a.href = `tour.html?id=${k}`;
    a.append(el('span', null, `${o.emoji} ${o.name}`), el('b', null, money(o.price)));
    more.append(a);
  });
}
