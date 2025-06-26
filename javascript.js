
document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
  
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartPanel = document.getElementById('cart-panel');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const placeOrderBtn = document.getElementById('place-order');
  
    const notifIcon = document.getElementById('notif-icon');
    const notifCount = document.getElementById('notif-count');
    const notifPanel = document.getElementById('notif-panel');
    const notifList = document.getElementById('notif-list');
    let notifCounter = 0;
  
    cartIcon.addEventListener('click', () => {
      cartPanel.classList.toggle('hidden');
    });
  
    notifIcon.addEventListener('click', () => {
      notifPanel.classList.toggle('hidden');
    });
  
    document.querySelectorAll('.add-cart').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
  
        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name, price, qty: 1 });
        }
  
        updateCartUI();
      });
    });
  
    function updateCartUI() {
      cartItems.innerHTML = '';
      let total = 0;
      let count = 0;
  
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="flex: 1;">${item.name}</span>
            <div style="display: flex; align-items: center;">
              <button class="qty-btn" data-index="${index}" data-action="decrease" style="margin: 0 5px;">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-index="${index}" data-action="increase" style="margin: 0 5px;">+</button>
            </div>
            <span style="margin-left: 10px;">₱${(item.price * item.qty).toFixed(2)}</span>
          </div>
        `;
        cartItems.appendChild(li);
  
        total += item.price * item.qty;
        count += item.qty;
      });
  
      cartTotal.textContent = total.toFixed(2);
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'inline-block' : 'none';
  
      document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const index = parseInt(btn.getAttribute('data-index'));
          const action = btn.getAttribute('data-action');
  
          if (action === 'increase') {
            cart[index].qty++;
          } else if (action === 'decrease') {
            cart[index].qty--;
            if (cart[index].qty <= 0) {
              cart.splice(index, 1);
            }
          }
  
          updateCartUI();
        });
      });
    }
  
    placeOrderBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
  
      const confirmOrder = confirm('Are you sure you want to place your order?');
  
      if (confirmOrder) {
        addNotification();
        cart = [];
        updateCartUI();
        cartPanel.classList.add('hidden');
        alert('Your order was placed!');
      }
    });
  
    function addNotification() {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateString = now.toLocaleDateString();
      const estimated = "2–3 days";
  
      const li = document.createElement('li');
      li.textContent = `Order placed on ${dateString} at ${timeString}. Estimated delivery: ${estimated}.`;
      notifList.prepend(li);
  
      notifCounter++;
      notifCount.textContent = notifCounter;
      notifCount.style.display = 'inline-block';
    }
  });
  
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  setInterval(nextSlide, 6000);

  function handleResponsiveLayout() {
    const width = window.innerWidth;
    const body = document.body;

    if (width < 480) {
      body.classList.add("mobile");
      body.classList.remove("tablet", "desktop");
    } else if (width >= 480 && width < 1024) {
      body.classList.add("tablet");
      body.classList.remove("mobile", "desktop");
    } else {
      body.classList.add("desktop");
      body.classList.remove("mobile", "tablet");
    }
  }

  window.addEventListener('resize', handleResponsiveLayout);
  handleResponsiveLayout(); 