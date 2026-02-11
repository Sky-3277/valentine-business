/* ============================================
   VALENTINELINK - Main JavaScript
   ============================================ */

// Initialize floating hearts background
function initFloatingHearts() {
    const container = document.getElementById('heartsBackground');
    if (!container) return;
    
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (4 + Math.random() * 3) + 's';
        container.appendChild(heart);
    }
}

// Track Buy Button Click
function trackBuyClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'begin_checkout', {
            'event_category': 'ecommerce',
            'event_label': 'Buy Button Clicked',
            'value': 10.00,
            'currency': 'CAD'
        });
    }
    console.log('📊 Tracked: Buy button clicked');
}

// Initialize Stripe Checkout
function initiateCheckout() {
    const config = window.VALENTINE_CONFIG;
    
    // Check if Stripe is configured
    if (config.stripe.publishableKey.includes('REPLACE_WITH_YOUR_KEY')) {
        alert('⚠️ Payment system not configured yet!\n\nPlease follow the setup instructions in SETUP_GUIDE.md');
        return;
    }
    
    // Track checkout initiation
    if (typeof gtag !== 'undefined') {
        gtag('event', 'begin_checkout', {
            'event_category': 'ecommerce',
            'event_label': 'Stripe Checkout Started',
            'value': 10.00,
            'currency': 'CAD'
        });
    }
    
    // For Stripe Checkout Session approach (RECOMMENDED)
    // You need to create a checkout session on your server
    // OR use Stripe Payment Links (easier for beginners)
    
    // OPTION 1: Using Stripe Payment Link (EASIEST - No server needed!)
    // Create a payment link in your Stripe Dashboard and paste it here:
    const stripePaymentLink = 'https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK';
    
    if (!stripePaymentLink.includes('REPLACE_WITH_YOUR_PAYMENT_LINK')) {
        // Add success parameter to redirect back
        const successUrl = encodeURIComponent(config.stripe.successUrl + '?paid=true');
        window.location.href = stripePaymentLink + '?success_url=' + successUrl;
        return;
    }
    
    // OPTION 2: Using Stripe Checkout with client-only (for testing)
    // This requires Stripe Checkout Session created server-side
    // For production, use the Payment Link method above
    
    alert('🎯 To complete setup:\n\n' +
         '1. Go to your Stripe Dashboard\n' +
         '2. Create a Payment Link for $10\n' +
         '3. Copy the link and paste it in js/config.js\n\n' +
         'See SETUP_GUIDE.md for detailed instructions.');
}

// Track payment success
function trackPaymentSuccess() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
            'event_category': 'ecommerce',
            'event_label': 'Payment Successful',
            'value': 10.00,
            'currency': 'CAD',
            'transaction_id': 'VAL_' + Date.now()
        });
    }
    console.log('📊 Tracked: Payment successful');
}

// Track page views with additional data
function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': pageName,
            'page_location': window.location.href
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    
    // Check for payment success/cancel
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
        trackPaymentSuccess();
    }
    
    console.log('💕 ValentineLink loaded successfully!');
});

// Export functions for use in other scripts
window.ValentineApp = {
    trackBuyClick,
    initiateCheckout,
    trackPaymentSuccess,
    trackPageView
};
