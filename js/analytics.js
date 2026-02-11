/* ============================================
   VALENTINELINK - Analytics Tracking
   ============================================
   
   This file handles all analytics tracking.
   It works with Google Analytics 4.
   
   Events Tracked:
   - Page views
   - Buy button clicks
   - Checkout initiated
   - Payment successful
   - Link generated
   - Valentine page viewed (recipient)
   
   ============================================ */

// Initialize Analytics
function initAnalytics() {
    const config = window.VALENTINE_CONFIG?.analytics;
    
    if (!config || !config.enabled) {
        console.log('📊 Analytics disabled');
        return;
    }
    
    // Check if tracking ID is configured
    if (config.trackingId.includes('REPLACE_WITH_YOUR_ID')) {
        console.warn('⚠️ Google Analytics not configured');
        return;
    }
    
    // Update GA script with correct tracking ID
    const gaScript = document.getElementById('ga-script');
    if (gaScript) {
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.trackingId}`;
    }
    
    console.log('📊 Analytics initialized');
}

// Track custom events
function trackEvent(eventName, params = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, params);
    }
    console.log(`📊 Event: ${eventName}`, params);
}

// Track conversion funnel
const FunnelTracker = {
    // Step 1: User lands on homepage
    landingPage() {
        trackEvent('landing_page_view', {
            'event_category': 'funnel',
            'event_label': 'Homepage'
        });
    },
    
    // Step 2: User clicks buy button
    clickBuy() {
        trackEvent('click_buy_button', {
            'event_category': 'funnel',
            'event_label': 'Buy Button',
            'value': 10
        });
    },
    
    // Step 3: User starts checkout
    startCheckout() {
        trackEvent('begin_checkout', {
            'event_category': 'funnel',
            'event_label': 'Checkout Started',
            'value': 10,
            'currency': 'CAD'
        });
    },
    
    // Step 4: Payment completed
    paymentSuccess(transactionId) {
        trackEvent('purchase', {
            'event_category': 'funnel',
            'event_label': 'Payment Complete',
            'value': 10,
            'currency': 'CAD',
            'transaction_id': transactionId || 'VAL_' + Date.now()
        });
    },
    
    // Step 5: Link generated
    linkGenerated(linkId) {
        trackEvent('generate_link', {
            'event_category': 'funnel',
            'event_label': 'Valentine Link Created',
            'link_id': linkId
        });
    },
    
    // Step 6: Recipient views page
    valentineViewed(recipientName) {
        trackEvent('valentine_viewed', {
            'event_category': 'engagement',
            'event_label': 'Recipient Viewed Page',
            'recipient': recipientName
        });
    },
    
    // Step 7: Recipient clicks yes
    valentineAccepted() {
        trackEvent('valentine_accepted', {
            'event_category': 'engagement',
            'event_label': 'They Said Yes!'
        });
    }
};

// Track user session data
const SessionTracker = {
    startTime: Date.now(),
    
    getDuration() {
        return Math.floor((Date.now() - this.startTime) / 1000);
    },
    
    trackSessionEnd() {
        trackEvent('session_end', {
            'event_category': 'session',
            'duration_seconds': this.getDuration()
        });
    }
};

// Track on page unload
window.addEventListener('beforeunload', () => {
    SessionTracker.trackSessionEnd();
});

// Initialize
initAnalytics();

// Export for use in other files
window.Analytics = {
    trackEvent,
    FunnelTracker,
    SessionTracker
};
