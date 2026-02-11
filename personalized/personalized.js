/* ============================================
   PERSONALIZED VALENTINE PAGE - JavaScript
   ============================================ */

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const linkId = urlParams.get('id');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initFloatingHearts();
    loadPersonalization();
    trackPageView();
});

// Initialize floating hearts
function initFloatingHearts() {
    const container = document.getElementById('heartsBackground');
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

// Load personalization data
function loadPersonalization() {
    if (!linkId) {
        console.log('No link ID provided - showing default');
        return;
    }
    
    // Get data from localStorage
    const data = localStorage.getItem(linkId);
    
    if (data) {
        const valentineData = JSON.parse(data);
        
        // Update title with recipient's name
        if (valentineData.recipientName) {
            const titleElement = document.getElementById('valentineTitle');
            titleElement.innerHTML = `${valentineData.recipientName}, will you be my Valentine? 💕`;
        }
        
        // Update from text
        if (valentineData.senderName) {
            document.getElementById('fromText').textContent = `From: ${valentineData.senderName}`;
        }
        
        // Store custom message and image for success page
        window.valentineData = valentineData;
    }
}

// Track page view
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': 'Personalized Valentine Page',
            'page_location': window.location.href,
            'custom_parameter_1': linkId || 'default'
        });
    }
    
    // Track in our funnel
    if (window.Analytics && window.Analytics.FunnelTracker) {
        const recipientName = window.valentineData?.recipientName || 'Unknown';
        window.Analytics.FunnelTracker.valentineViewed(recipientName);
    }
}

// Move No button to random position
function moveNoButton() {
    const noButton = document.getElementById('noButton');
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    
    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Apply new position
    noButton.style.position = 'fixed';
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
    noButton.style.zIndex = '1000';
    
    // Add a little rotation for fun
    const rotation = (Math.random() - 0.5) * 30;
    noButton.style.transform = `rotate(${rotation}deg)`;
}

// Handle Yes button click
function handleYes() {
    // Generate confetti
    generateConfetti();
    
    // Track acceptance
    if (typeof gtag !== 'undefined') {
        gtag('event', 'valentine_accepted', {
            'event_category': 'engagement',
            'event_label': 'They Said Yes!'
        });
    }
    
    if (window.Analytics && window.Analytics.FunnelTracker) {
        window.Analytics.FunnelTracker.valentineAccepted();
    }
    
    // Show success page after delay
    setTimeout(() => {
        showSuccessPage();
    }, 800);
}

// Generate confetti
function generateConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff0000', '#ffffff', '#ffd700', '#4caf50'];
    
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Show success page
function showSuccessPage() {
    const mainContent = document.getElementById('mainContent');
    const successContent = document.getElementById('successContent');
    
    // Hide main content
    mainContent.style.display = 'none';
    
    // Update success page with custom data
    if (window.valentineData) {
        // Update success title
        if (window.valentineData.recipientName) {
            document.getElementById('successTitle').textContent = 
                `Yay ${window.valentineData.recipientName}! I knew you'd say yes! 🎉`;
        }
        
        // Update custom message
        if (window.valentineData.customMessage) {
            document.getElementById('successMessage').textContent = window.valentineData.customMessage;
        }
        
        // Show custom image if uploaded
        if (window.valentineData.imageData) {
            const imageContainer = document.getElementById('customImageContainer');
            const customImage = document.getElementById('customImage');
            customImage.src = window.valentineData.imageData;
            imageContainer.style.display = 'block';
        }
        
        // Update love text with sender name
        if (window.valentineData.senderName) {
            document.getElementById('loveText').textContent = 
                `I Love You, ${window.valentineData.recipientName}! 💕`;
        }
    }
    
    // Show success content
    successContent.style.display = 'flex';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle window resize - reset no button position
window.addEventListener('resize', function() {
    const noButton = document.getElementById('noButton');
    if (noButton.style.position === 'fixed') {
        // Keep button in bounds
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 80;
        const currentX = parseInt(noButton.style.left);
        const currentY = parseInt(noButton.style.top);
        
        if (currentX > maxX) noButton.style.left = maxX + 'px';
        if (currentY > maxY) noButton.style.top = maxY + 'px';
    }
});
