// TODO: replace with the WhatsApp number that will receive orders.
// Format: country code and number, digits only. Example India: 919876543210.
const BRAND_NAME = 'NOORÉ'; // TODO: replace with your real brand name
const WHATSAPP_NUMBER = '910000000000';
const PLACEHOLDER_IMAGE = 'assets/fabric-placeholder.svg';
const CART_KEY = 'noore-cod-cart-v1';
const money = (amount, currency) => new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
const grid = document.querySelector('#product-grid');
const cartDialog = document.querySelector('.cart-dialog');
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

function renderProducts(filter = 'all') {
  const products = PRODUCT_LIST.filter(product => filter === 'all' || product.category === filter);
  grid.innerHTML = products.map(product => `
    <article class="product-card" data-category="${product.category}">
      <div class="product-image product-photo"><img src="${product.image}" alt="${escapeHtml(product.name)} suit product photo" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'">${product.label ? `<span class="product-tag">${escapeHtml(product.label)}</span>` : ''}${product.image === PLACEHOLDER_IMAGE ? '<span class="photo-hint">Replace with your photo</span>' : ''}</div>
      <div class="product-info"><div><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description)}</p></div><span class="price">${money(product.price, product.currency)}</span></div>
      <div class="product-buy"><label class="size-label">Size <select class="size-select" aria-label="Choose size for ${escapeHtml(product.name)}">${product.sizes.map(size => `<option>${escapeHtml(size)}</option>`).join('')}</select></label><button class="add-button" data-add="${escapeHtml(product.id)}" type="button">Add to bag <span>＋</span></button></div>
    </article>`).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function renderCart() {
  cart = cart.filter(line => PRODUCT_LIST.some(product => product.id === line.id));
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.querySelectorAll('.cart-count').forEach(element => element.textContent = cart.reduce((sum, line) => sum + line.quantity, 0));
  const items = document.querySelector('#cart-items');
  const total = cart.reduce((sum, line) => sum + PRODUCT_LIST.find(p => p.id === line.id).price * line.quantity, 0);
  const currency = cart.length ? PRODUCT_LIST.find(p => p.id === cart[0].id).currency : 'INR';
  items.innerHTML = cart.length ? cart.map(line => {
    const product = PRODUCT_LIST.find(p => p.id === line.id);
    return `<div class="cart-line"><div><b>${escapeHtml(product.name)}</b><small>Size ${escapeHtml(line.size)} · ${money(product.price, product.currency)} each</small><div class="quantity-controls"><button data-quantity="-1" data-id="${escapeHtml(line.id)}" data-size="${escapeHtml(line.size)}" aria-label="Remove one ${escapeHtml(product.name)}">−</button><span>${line.quantity}</span><button data-quantity="1" data-id="${escapeHtml(line.id)}" data-size="${escapeHtml(line.size)}" aria-label="Add one ${escapeHtml(product.name)}">＋</button><button class="remove-line" data-remove="${escapeHtml(line.id)}" data-size="${escapeHtml(line.size)}">Remove</button></div></div><strong>${money(product.price * line.quantity, product.currency)}</strong></div>`;
  }).join('') : '<p class="empty-cart">Your bag is empty. Add a suit to get started.</p>';
  document.querySelector('#cart-total').textContent = money(total, currency);
  document.querySelector('#place-order').disabled = cart.length === 0;
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => { item.classList.remove('is-active'); item.setAttribute('aria-pressed', 'false'); });
  button.classList.add('is-active'); button.setAttribute('aria-pressed', 'true');
  renderProducts(button.dataset.filter);
}));

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const card = button.closest('.product-card');
  const product = PRODUCT_LIST.find(item => item.id === button.dataset.add);
  const size = card.querySelector('.size-select').value;
  const line = cart.find(item => item.id === product.id && item.size === size);
  if (line) line.quantity += 1;
  else cart.push({ id: product.id, size, quantity: 1 });
  renderCart();
  button.textContent = 'Added ✓';
  window.setTimeout(() => { button.innerHTML = 'Add to bag <span>＋</span>'; }, 1100);
});

document.querySelectorAll('.cart-open').forEach(button => button.addEventListener('click', () => { renderCart(); cartDialog.showModal(); }));
document.querySelector('.cart-close').addEventListener('click', () => cartDialog.close());
document.querySelector('.cart-continue').addEventListener('click', () => cartDialog.close());
document.querySelector('#cart-items').addEventListener('click', event => {
  const target = event.target.closest('[data-quantity], [data-remove]');
  if (!target) return;
  const line = cart.find(item => item.id === target.dataset.id && item.size === target.dataset.size);
  if (!line) return;
  if (target.hasAttribute('data-remove')) cart = cart.filter(item => item !== line);
  else { line.quantity += Number(target.dataset.quantity); if (line.quantity <= 0) cart = cart.filter(item => item !== line); }
  renderCart();
});

document.querySelector('#place-order').addEventListener('click', () => {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (phone === '910000000000' || phone.length < 8) { alert('The shop owner needs to add the real WhatsApp number in script.js before orders can be sent.'); return; }
  const total = cart.reduce((sum, line) => sum + PRODUCT_LIST.find(p => p.id === line.id).price * line.quantity, 0);
  const currency = PRODUCT_LIST.find(p => p.id === cart[0].id).currency;
  const lines = cart.map(line => { const product = PRODUCT_LIST.find(p => p.id === line.id); return `• ${product.name} — size ${line.size} × ${line.quantity}: ${money(product.price * line.quantity, product.currency)}`; });
  const message = `Hello ${BRAND_NAME}! I would like to place this cash-on-delivery order:\n\n${lines.join('\n')}\n\nItems total: ${money(total, currency)}\n\nPlease confirm availability, delivery charges and the final total. I will send my delivery details here.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelectorAll('.whatsapp-link').forEach(link => {
  if (WHATSAPP_NUMBER === '910000000000') {
    link.href = '#contact';
    link.addEventListener('click', event => { event.preventDefault(); alert('The shop owner needs to add the real WhatsApp number in script.js before customers can message.'); });
  } else {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi ${BRAND_NAME}! I have a question about your suits.`)}`;
  }
});
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.filter[data-filter="all"] span').textContent = String(PRODUCT_LIST.length).padStart(2, '0');
renderProducts();
renderCart();
