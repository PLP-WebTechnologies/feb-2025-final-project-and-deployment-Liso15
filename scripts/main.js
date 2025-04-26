// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
    
    // Initialize cart count
    updateCartCount();
    
    // Load products on home page
    if (document.querySelector('.products-grid')) {
        loadProducts();
    }
    
    // Testimonial slider functionality
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // Contact form validation
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
});

// Product data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 99.99,
        image: 'wireless_headphones.jpg'
    },
    {
        id: 2,
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health monitoring.',
        price: 199.99,
        image: 'smart_watch.jpg'
    },
    {
        id: 3,
        name: 'Bluetooth Speaker',
        description: 'Portable bluetooth speaker with 20h battery life.',
        price: 79.99,
        image: 'Bluetooth_speaker.jpg'
    },
    {
        id: 4,
        name: 'Laptop Backpack',
        description: 'Durable backpack with USB charging port.',
        price: 49.99,
        image: 'laptop_bag.jpg'
    },
    {
        id: 5,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with silent clicks.',
        price: 29.99,
        image: 'wireless_mouse.jpg'
    },
    {
        id: 6,
        name: 'Phone Stand',
        description: 'Adjustable phone stand for desk or bed.',
        price: 19.99,
        image: 'Phone_stand.jpg'
    }
];

// Load products into the grid
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-img" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Cart functionality
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show a quick notification
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
}

// Contact Form Validation
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError('name-error', 'Name is required');
            isValid = false;
        } else {
            hideError('name-error');
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError('email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError('email-error', 'Please enter a valid email');
            isValid = false;
        } else {
            hideError('email-error');
        }
        
        // Validate subject
        if (subjectInput.value.trim() === '') {
            showError('subject-error', 'Subject is required');
            isValid = false;
        } else {
            hideError('subject-error');
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showError('message-error', 'Message is required');
            isValid = false;
        } else {
            hideError('message-error');
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            form.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
            
            // Reset form (optional)
            form.reset();
        }
    });
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(id) {
    const errorElement = document.getElementById(id);
    errorElement.style.display = 'none';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}