/* ============================================
   VALENTINELINK - Configuration File
   ============================================
   https://buy.stripe.com/8x2cN6aYN72o1920DO0RG00
   IMPORTANT: Update the values below with your own credentials
   
   Step 1: Get Stripe Account (FREE to create)
   - Go to https://stripe.com
   - Sign up for free
   - Complete verification (takes 1-2 days)
   - Go to Developers > API Keys
   - Copy your Publishable Key (starts with pk_live_ or pk_test_)
   pk_live_51SzRcFK5aPdD8C0BV2UlnuWtkByGq9DDEhtx9wiwvYJB1qvzwVHnHyktjlpokgavdUsS8UglGyVtV9pz0ywAF4vL00u5ri7swK
   Step 2: Create a Stripe Checkout Session
   - Go to Developers > Checkout
   - Or use Stripe Dashboard to create a payment link
   
   Step 3: Get Google Analytics (FREE)
   - Go to https://analytics.google.com
   - Create account and property
   - Get your Tracking ID (starts with G-)
   
   ============================================ */

const CONFIG = {
    // ========================================
    // STRIPE PAYMENT CONFIGURATION
    // ========================================
    stripe: {
        // REPLACE THIS with your Stripe Publishable Key
        // Get it from: https://dashboard.stripe.com/apikeys
        // Example: 'pk_live_51ABC123...' for live payments
        // Example: 'pk_test_51ABC123...' for testing
        publishableKey: 'pk_live_51SzRcFK5aPdD8C0BV2UlnuWtkByGq9DDEhtx9wiwvYJB1qvzwVHnHyktjlpokgavdUsS8UglGyVtV9pz0ywAF4vL00u5ri7swK',
        // publishableKey: 'pk_test_51SzRcFK5aPdD8C0BeVMynSMhVDv78ei4ajoJ5MMBtfnVrzgsejcl112ZYkemxitonPpY9lndtNsthLe9oYyAQT4f00O0nMukkC',
        // Payment amount in cents (1000 = $10.00 CAD)
        amount: 1000,
        currency: 'cad',
        
        // Product name shown on Stripe checkout
        productName: 'ValentineLink - Custom Valentine Page',
        
        // Success URL - where users go after payment
        // This should point to your payment-success page
        successUrl: window.location.origin + '/payment-success/',
        
        // Cancel URL - where users go if they cancel payment
        cancelUrl: window.location.origin + '/?payment=cancelled',
    },
    
    // ========================================
    // GOOGLE ANALYTICS CONFIGURATION
    // ========================================
    analytics: {
        // REPLACE THIS with your Google Analytics Tracking ID
        // Get it from: https://analytics.google.com
        // Example: 'G-ABC123DEF45'
        trackingId: 'G-REPLACE_WITH_YOUR_ID',
        
        // Enable/disable analytics
        enabled: true,
    },
    
    // ========================================
    // BUSINESS SETTINGS
    // ========================================
    business: {
        // Your business name
        name: 'ValentineLink',
        
        // Support email
        supportEmail: 'support@yourdomain.com',
        
        // Price display
        price: '$10',
        currency: 'CAD',
        
        // Social links (optional)
        instagram: 'https://instagram.com/yourhandle',
        facebook: 'https://facebook.com/yourpage',
    },
    
    // ========================================
    // FEATURE FLAGS
    // ========================================
    features: {
        // Enable image upload feature
        imageUpload: true,
        
        // Maximum image size in MB
        maxImageSize: 5,
        
        // Enable custom message feature
        customMessage: true,
        
        // Show testimonials
        showTestimonials: true,
    }
};

// ============================================
// DO NOT EDIT BELOW THIS LINE
// ============================================

// Make config available globally
window.VALENTINE_CONFIG = CONFIG;

// Initialize Stripe if key is provided
function initializeStripe() {
    if (CONFIG.stripe.publishableKey.includes('REPLACE_WITH_YOUR_KEY')) {
        console.warn('⚠️ Stripe key not configured! Please update js/config.js');
        return null;
    }
    
    // Load Stripe.js dynamically
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => {
        window.stripe = Stripe(CONFIG.stripe.publishableKey);
        console.log('✅ Stripe initialized');
    };
    document.head.appendChild(script);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeStripe);
