const products = [
  { id: 'strawberries', name: 'Peak-season strawberries', detail: 'Organic · 1 pint', price: 5.49, category: 'Produce', image: 'photo-1464965911861-746a04b4bca6', tag: 'JUST PICKED' },
  { id: 'sourdough', name: 'Country sourdough', detail: 'Local bakery · 1 loaf', price: 7.25, category: 'Bakery', image: 'photo-1585478259715-876acc5be8eb', tag: 'BAKED TODAY' },
  { id: 'tomatoes', name: 'Heirloom tomatoes', detail: 'Farm fresh · 1 lb', price: 4.99, category: 'Produce', image: 'photo-1546094096-0df4bcaaa337', tag: 'FARM FAVORITE' },
  { id: 'pasta', name: 'Sunday tomato pasta kit', detail: 'Serves 2 · 20 min', price: 14.5, category: 'Prepared', image: 'photo-1473093295043-cdd812d0e601', tag: 'DINNER, SORTED' },
  { id: 'olive-oil', name: 'Cold-pressed olive oil', detail: 'Extra virgin · 500 ml', price: 12.5, category: 'Pantry', image: 'photo-1471943311424-646960669fbc', tag: 'PANTRY PICK' },
  { id: 'avocados', name: 'Ready-to-eat avocados', detail: 'Ripe & ready · 2 ct', price: 3.99, category: 'Produce', image: 'photo-1523049673857-eb18f1d7b578', tag: 'A LITTLE EXTRA' },
  { id: 'eggs', name: 'Pasture-raised eggs', detail: 'North Field Farm · 12 ct', price: 6.75, category: 'Dairy & eggs', image: 'photo-1518569656558-1f25e69d93d7', tag: 'HAPPY HENS' },
  { id: 'oranges', name: 'Sweet cara cara oranges', detail: 'California grown · 3 lb', price: 6.25, category: 'Produce', image: 'photo-1547514701-42782101795e', tag: 'IN SEASON' },
  { id: 'granola', name: 'Maple oat granola', detail: 'Small batch · 12 oz', price: 8.25, category: 'Pantry', image: 'photo-1517093157656-b9ec61aefb50', tag: 'SMALL BATCH' },
  { id: 'milk', name: 'Creamy whole milk', detail: 'Glass bottle · 32 oz', price: 4.5, category: 'Dairy & eggs', image: 'photo-1563636619-e9143da7973b', tag: 'LOCAL DAIRY' },
]

const cart = new Map()
try {
  const savedCart = JSON.parse(localStorage.getItem('good-things-cart') || '[]')
  if (Array.isArray(savedCart)) {
    savedCart.forEach(([id, quantity]) => {
      if (products.some((product) => product.id === id) && Number.isInteger(quantity) && quantity > 0) cart.set(id, quantity)
    })
  }
} catch {
  localStorage.removeItem('good-things-cart')
}
let activeCategory = 'Everything'
let searchTerm = ''

const money = (amount) => `$${amount.toFixed(2)}`

document.querySelector('#app').innerHTML = `
  <div class="announcement"><span class="announcement-spark">✳</span> Fresh, local & in season — now delivering to your neighborhood! <span>Free delivery on orders over $50</span> <a href="#shop">Shop fresh <span aria-hidden="true">↗</span></a></div>
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Good Things Market home"><span class="wordmark-mark">g<span>✳</span></span><span>good things<small>MARKET & DELI</small></span></a>
    <nav class="main-nav" aria-label="Main navigation"><a href="#top" class="nav-current">Home</a><a href="#shop">Shop</a><a href="#categories">Categories</a><a href="#our-promise">About</a><a href="#newsletter">Contact</a></nav>
    <div class="header-actions"><button class="search-toggle" aria-label="Search products" title="Search products">⌕</button><button class="cart-toggle" aria-expanded="false" aria-controls="cart-panel"><span class="cart-icon">▱</span><span>My basket</span><span class="cart-count" aria-label="0 items">0</span></button><button class="menu-toggle" aria-label="Open menu">☰</button></div>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> YOUR NEIGHBORHOOD GROCERY & DELI</p>
        <h1 id="hero-title">Good food.<br><em>Good mood.</em><br><span>At your door.</span></h1>
        <p class="hero-description">Fresh produce, bakery, dairy, pantry essentials and dinner kits, all in one place.</p>
        <div class="hero-actions"><a class="button button-primary" href="#shop">Shop fresh produce <span aria-hidden="true">→</span></a><span class="delivery-note"><span class="delivery-icon">◷</span> Delivery available in your area<br><small>Today, 10 AM – 8 PM</small></span></div>
        <div class="hero-proof"><div class="avatar-stack"><span>J</span><span>M</span><span>A</span></div><p><strong>4.9 out of 5</strong><br><span>from 2,400+ happy neighbors</span></p><span class="proof-stars" aria-label="5 stars">★★★★★</span></div>
      </div>
      <div class="hero-visual">
        <div class="hero-photo"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=88" alt="Fresh seasonal produce in a neighborhood grocery market" /></div>
        <div class="photo-stamp"><span>FRESH<br>IS A FEELING</span><b>✳</b></div>
        <div class="floating-item float-orange" tabindex="0" role="button" aria-label="Tap the orange for a little surprise">🍊</div>
        <div class="floating-item float-avocado" tabindex="0" role="button" aria-label="Tap the avocado for a little surprise">🥑</div>
        <div class="floating-item float-leaf" tabindex="0" role="button" aria-label="Tap the leafy greens for a little surprise">🥬</div>
        <div class="delivery-card"><span class="delivery-card-icon">↗</span><span><strong>On its way!</strong><small>From our store to your door</small></span><span class="delivery-card-dot"></span></div>
      </div>
      <div class="hero-bottom-note"><span>01 / 04</span><span>GOOD THINGS ARE GROWING</span><span>↓</span></div>
    </section>

    <section class="category-shelf" id="categories" aria-label="Shop by category">
      <button class="category-tile" data-category="Produce"><img src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=240&q=80" alt="" /><strong>Fresh Produce</strong><span>Shop now →</span></button>
      <button class="category-tile" data-category="Bakery"><img src="https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=240&q=80" alt="" /><strong>Bakery</strong><span>Shop now →</span></button>
      <button class="category-tile" data-category="Dairy & eggs"><img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=240&q=80" alt="" /><strong>Dairy</strong><span>Shop now →</span></button>
      <button class="category-tile" data-category="Pantry"><img src="https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=240&q=80" alt="" /><strong>Pantry Essentials</strong><span>Shop now →</span></button>
      <button class="category-tile" data-category="Prepared"><img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=240&q=80" alt="" /><strong>Dinner Kits</strong><span>Shop now →</span></button>
    </section>

    <section class="shop-section" id="shop">
      <div class="section-heading"><div><p class="eyebrow"><span></span> GOOD THINGS, PICKED FOR YOU</p><h2>Fresh picks</h2><p class="section-subtitle">Quality ingredients. Great prices. Always fresh.</p></div><a class="text-link" href="#products">See all products <span aria-hidden="true">↗</span></a></div>
      <div class="shop-tools"><div class="category-list" role="group" aria-label="Filter by category"><button class="category-chip is-active" data-category="Everything">All products <span>10</span></button><button class="category-chip" data-category="Produce">Produce</button><button class="category-chip" data-category="Bakery">Bakery</button><button class="category-chip" data-category="Dairy & eggs">Dairy</button><button class="category-chip" data-category="Pantry">Pantry</button><button class="category-chip" data-category="Prepared">Dinner kits</button></div><label class="search-field"><span aria-hidden="true">⌕</span><input id="product-search" type="search" placeholder="Search products..." aria-label="Search groceries" /></label></div>
      <div class="product-grid" id="products" aria-live="polite"></div>
      <p class="empty-state" hidden>No good things found. Try another search.</p>
      <div class="shop-bottom"><span>Small batches. Big good energy.</span><a href="#our-promise" class="text-link">Meet your market <span aria-hidden="true">↗</span></a></div>
    </section>

    <section class="promise-section" id="our-promise"><div class="promise-image"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=84" alt="Colorful fresh vegetables ready for your weekly shop" loading="lazy" /><span class="promise-sticker">GROWN<br>NEARBY<br><b>✳</b></span></div><div class="promise-copy"><p class="eyebrow"><span></span> A MARKET WITH A LITTLE MORE HEART</p><h2>Good food has<br><em>a good story.</em></h2><p>We work with farms, bakers, and makers who care about what goes into your bag. That means seasonal produce, thoughtfully raised staples, and the kind of bread you plan your day around.</p><a href="#shop" class="button button-outline">Get to know your market <span aria-hidden="true">↗</span></a><div class="promise-footnote"><span>✳</span> 82% of what we stock comes from independent makers.</div></div></section>
    <section class="newsletter"><div><p class="eyebrow"><span></span> NOTES FROM THE NEIGHBORHOOD</p><h2>A little good in<br><em>your inbox.</em></h2></div><form id="newsletter-form"><label for="email-address">Seasonal picks, new arrivals & the occasional really good recipe.</label><div class="email-control"><input id="email-address" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe">↗</button></div><p class="newsletter-status" aria-live="polite">Only the good stuff. Unsubscribe whenever.</p></form></section>
  </main>
  <footer class="site-footer"><a class="wordmark footer-wordmark" href="#top"><span class="wordmark-mark">g<span>✳</span></span><span>good things<small>MARKET & DELI</small></span></a><p>Good food, good neighbors, good on your doorstep.</p><span>© 2025 Good Things Market</span></footer>

  <div class="cart-backdrop" hidden></div><aside class="cart-panel" id="cart-panel" aria-label="Your basket" aria-hidden="true"><div class="cart-header"><div><p class="eyebrow"><span></span> YOUR GOOD THINGS</p><h2>Your basket <span class="cart-panel-count">(0)</span></h2></div><button class="cart-close" aria-label="Close basket">×</button></div><div class="cart-items"></div><div class="cart-empty"><span>🧺</span><h3>Your basket is taking a breather.</h3><p>Add a few good things and we’ll bring them right to you.</p><button class="button button-primary cart-shop">Find your favorites <span aria-hidden="true">↗</span></button></div><div class="cart-summary" hidden><div class="subtotal"><span>Subtotal</span><strong>$0.00</strong></div><div class="delivery-total"><span>Delivery</span><strong class="delivery-cost">$0.00</strong></div><div class="order-total"><span>Total</span><strong class="order-cost">$0.00</strong></div><p class="delivery-progress">Free delivery on orders over $50.</p><button class="button button-primary checkout-button">Continue to checkout <span aria-hidden="true">→</span></button><form class="checkout-form" hidden><h3>Delivery details</h3><label>Full name<input name="name" autocomplete="name" required /></label><label>Delivery address<input name="address" autocomplete="street-address" required /></label><label>Email address<input name="email" type="email" autocomplete="email" required /></label><button class="button button-primary" type="submit">Place demo order</button><small>Demo checkout only. No payment is collected.</small></form><small class="checkout-message" aria-live="polite"></small></div><div class="cart-confirmation" hidden><span aria-hidden="true">✓</span><h3>Order confirmed</h3><p>Your demo order is ready. No payment was collected.</p><p>Order number <strong class="order-number"></strong></p><button class="button button-outline continue-shopping">Continue shopping</button></div></aside>
  <div class="toast" role="status" aria-live="polite"></div>
`

const productGrid = document.querySelector('.product-grid')
const toast = document.querySelector('.toast')
let toastTimer

function renderProducts() {
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Everything' || product.category === activeCategory
    const matchesSearch = `${product.name} ${product.detail} ${product.category}`.toLowerCase().includes(searchTerm)
    return matchesCategory && matchesSearch
  })

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card" data-product="${product.id}">
      <div class="product-image-wrap"><img src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=82" alt="${product.name}" loading="lazy" /><span class="product-tag">${product.tag}</span></div>
      <div class="product-details"><div><h3>${product.name}</h3><p>${product.detail}</p><strong>${money(product.price)}</strong></div></div>
      <button class="add-to-basket" data-add="${product.id}" aria-label="Add ${product.name} to basket"><span aria-hidden="true">+</span> Add to basket</button>
    </article>
  `).join('')
  document.querySelector('.empty-state').hidden = visibleProducts.length > 0
}

function cartQuantity() {
  return [...cart.values()].reduce((total, quantity) => total + quantity, 0)
}

function renderCart() {
  const quantity = cartQuantity()
  const count = document.querySelector('.cart-count')
  count.textContent = quantity
  count.setAttribute('aria-label', `${quantity} ${quantity === 1 ? 'item' : 'items'}`)
  document.querySelector('.cart-panel-count').textContent = `(${quantity})`
  const items = [...cart.entries()].map(([id, amount]) => {
    const product = products.find((item) => item.id === id)
    return `<article class="cart-item"><img src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=160&q=75" alt="" /><div class="cart-item-info"><h3>${product.name}</h3><p>${money(product.price)} each</p><div class="quantity-control"><button data-quantity="${id}" data-change="-1" aria-label="Remove one ${product.name}">−</button><span>${amount}</span><button data-quantity="${id}" data-change="1" aria-label="Add one ${product.name}">+</button></div></div><strong>${money(product.price * amount)}</strong></article>`
  }).join('')
  document.querySelector('.cart-items').innerHTML = items
  document.querySelector('.cart-empty').hidden = quantity > 0
  document.querySelector('.cart-summary').hidden = quantity === 0
  const subtotal = [...cart.entries()].reduce((total, [id, amount]) => total + products.find((item) => item.id === id).price * amount, 0)
  document.querySelector('.subtotal strong').textContent = money(subtotal)
  const delivery = subtotal === 0 || subtotal >= 50 ? 0 : 4.99
  document.querySelector('.delivery-cost').textContent = delivery === 0 ? 'Free' : money(delivery)
  document.querySelector('.order-cost').textContent = money(subtotal + delivery)
  document.querySelector('.delivery-progress').textContent = subtotal >= 50 ? 'Your order qualifies for free delivery.' : `Add ${money(50 - subtotal)} more for free delivery.`
  localStorage.setItem('good-things-cart', JSON.stringify([...cart]))
}

function showToast(message) {
  toast.textContent = message
  toast.classList.add('is-visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200)
}

function setCartOpen(isOpen) {
  const panel = document.querySelector('.cart-panel')
  panel.classList.toggle('is-open', isOpen)
  panel.setAttribute('aria-hidden', String(!isOpen))
  document.querySelector('.cart-toggle').setAttribute('aria-expanded', String(isOpen))
  document.querySelector('.cart-backdrop').hidden = !isOpen
  document.body.classList.toggle('cart-is-open', isOpen)
}

renderProducts()
renderCart()

document.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add]')
  const quantityButton = event.target.closest('[data-quantity]')
  const categoryButton = event.target.closest('[data-category]')

  if (addButton) {
    const id = addButton.dataset.add
    cart.set(id, (cart.get(id) || 0) + 1)
    renderCart()
    showToast(`${products.find((product) => product.id === id).name} added to your basket`)
  }

  if (quantityButton) {
    const id = quantityButton.dataset.quantity
    const nextQuantity = (cart.get(id) || 0) + Number(quantityButton.dataset.change)
    if (nextQuantity > 0) cart.set(id, nextQuantity)
    else cart.delete(id)
    renderCart()
  }

  if (categoryButton) {
    activeCategory = categoryButton.dataset.category
    document.querySelectorAll('.category-chip').forEach((button) => button.classList.toggle('is-active', button === categoryButton))
    renderProducts()
  }

  if (event.target.closest('.cart-toggle')) setCartOpen(true)
  if (event.target.closest('.cart-close') || event.target.classList.contains('cart-backdrop')) setCartOpen(false)
  if (event.target.closest('.cart-shop')) {
    setCartOpen(false)
    document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' })
  }
  if (event.target.closest('.checkout-button')) {
    document.querySelector('.checkout-button').hidden = true
    document.querySelector('.checkout-form').hidden = false
    document.querySelector('.checkout-form [name="name"]').focus()
  }
  if (event.target.closest('.continue-shopping')) setCartOpen(false)
  if (event.target.closest('.search-toggle')) {
    document.querySelector('#product-search').focus()
    document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' })
  }
  if (event.target.closest('.menu-toggle')) document.querySelector('.main-nav').classList.toggle('nav-open')
})

document.querySelector('#product-search').addEventListener('input', (event) => {
  searchTerm = event.target.value.trim().toLowerCase()
  renderProducts()
})

document.querySelector('.checkout-form').addEventListener('submit', (event) => {
  event.preventDefault()
  if (!event.currentTarget.reportValidity()) return
  const orderNumber = `GT-${Date.now().toString().slice(-6)}`
  cart.clear()
  renderCart()
  document.querySelector('.cart-summary').hidden = true
  document.querySelector('.cart-confirmation').hidden = false
  document.querySelector('.order-number').textContent = orderNumber
  event.currentTarget.reset()
})

document.querySelectorAll('.floating-item').forEach((item) => {
  const react = () => {
    item.classList.remove('is-popped')
    void item.offsetWidth
    item.classList.add('is-popped')
    setTimeout(() => item.classList.remove('is-popped'), 700)
  }
  item.addEventListener('pointerenter', react)
  item.addEventListener('click', react)
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      react()
    }
  })
})

document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault()
  document.querySelector('.newsletter-status').textContent = 'You’re on the list. Good things are headed your way!'
  event.currentTarget.reset()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setCartOpen(false)
})
