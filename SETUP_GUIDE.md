# ValentineLink - Complete Setup Guide

🎉 **Welcome!** This guide will walk you through setting up your ValentineLink business in **ONE DAY**.

---

## 📋 Table of Contents

1. [What You're Building](#what-youre-building)
2. [Prerequisites](#prerequisites)
3. [Step 1: Set Up Stripe Payment](#step-1-set-up-stripe-payment)
4. [Step 2: Set Up Google Analytics](#step-2-set-up-google-analytics)
5. [Step 3: Update Configuration](#step-3-update-configuration)
6. [Step 4: Test Locally](#step-4-test-locally)
7. [Step 5: Deploy to Production](#step-5-deploy-to-production)
8. [Understanding the Flow](#understanding-the-flow)
9. [Troubleshooting](#troubleshooting)
10. [Next Steps](#next-steps)

---

## What You're Building

A complete Valentine's Day business where customers:
1. Visit your landing page
2. Pay $10 CAD via Stripe
3. Customize their Valentine link (name, optional photo, message)
4. Share the unique link with their loved one
5. The recipient sees an interactive page where the "No" button runs away!

**Your Revenue:** $10 per sale (minus Stripe fees ~2.9% + $0.30 = ~$9.41 net)

---

## Prerequisites

Before starting, you'll need:
- A computer with internet
- Basic text editor (VS Code recommended, or Notepad)
- About 2-3 hours for complete setup

---

## Step 1: Set Up Stripe Payment

Stripe is the BEST choice for Toronto because:
- ✅ Free to sign up
- ✅ Supports CAD (Canadian Dollars)
- ✅ Easy integration (no coding needed for basic setup)
- ✅ Deposits to Canadian bank accounts
- ✅ Only 2.9% + $0.30 per transaction

### 1.1 Create Stripe Account (5 minutes)

1. Go to **https://stripe.com**
2. Click **"Start now"** or **"Sign up"**
3. Enter your email and create a password
4. Verify your email
5. Complete the business profile:
   - Business type: Individual/Sole Proprietor
   - Business name: ValentineLink (or your choice)
   - Website: (you can add later)
   - Industry: Digital Goods

### 1.2 Get Your API Keys (2 minutes)

1. In Stripe Dashboard, click **"Developers"** in left sidebar
2. Click **"API keys"**
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`) ← **YOU NEED THIS**
   - Secret key (don't share this)
4. **COPY the Publishable key** - you'll paste it in Step 3

### 1.3 Create a Payment Link (EASIEST METHOD - 5 minutes)

This is the **SIMPLEST** way to accept payments without any server code:

1. In Stripe Dashboard, click **"Payment Links"** in left sidebar
2. Click **"+ Create"**
3. Set up your product:
   - **Name:** "ValentineLink - Custom Valentine Page"
   - **Description:** "Create a magical interactive Valentine's experience"
   - **Price:** $10.00 CAD
   - **Type:** One-time payment
4. Click **"Create link"**
5. You'll get a URL like: `https://buy.stripe.com/abc123`
6. **COPY this URL** - you'll paste it in Step 3

**⚠️ IMPORTANT:** The Payment Link method is the EASIEST for beginners. No server needed!

---

## Step 2: Set Up Google Analytics

Google Analytics tracks:
- How many people visit your site
- How many click "Buy"
- How many complete payment
- Where your visitors come from

### 2.1 Create Google Analytics Account (5 minutes)

1. Go to **https://analytics.google.com**
2. Click **"Start measuring"**
3. Sign in with your Google account
4. Create an account:
   - Account name: ValentineLink
   - Click **"Next"**
5. Create a property:
   - Property name: ValentineLink Website
   - Time zone: Toronto (GMT-05:00)
   - Currency: Canadian Dollar
   - Click **"Next"**
6. Answer the business questions (can skip)
7. Accept terms of service

### 2.2 Get Your Tracking ID (2 minutes)

1. In Google Analytics, click the **gear icon** (Admin) at bottom left
2. Make sure you're in the right property
3. Click **"Data Streams"**
4. Click **"Web"**
5. Enter your website URL (you can update later)
6. Click **"Create stream"**
7. You'll see a **Measurement ID** like `G-ABC123DEF45`
8. **COPY this ID** - you'll paste it in Step 3

---

## Step 3: Update Configuration

Now you'll update the code with your credentials.

### 3.1 Open config.js (5 minutes)

1. Open the file: `js/config.js`
2. Find these lines and replace them:

```javascript
// BEFORE (placeholder):
stripe: {
    publishableKey: 'pk_test_REPLACE_WITH_YOUR_KEY',
    ...
}

// AFTER (with your actual key):
stripe: {
    publishableKey: 'pk_live_YOUR_ACTUAL_KEY_HERE',
    ...
}
```

```javascript
// BEFORE (placeholder):
analytics: {
    trackingId: 'G-REPLACE_WITH_YOUR_ID',
    ...
}

// AFTER (with your actual ID):
analytics: {
    trackingId: 'G-YOUR_ACTUAL_ID_HERE',
    ...
}
```

### 3.2 Update Payment Link (2 minutes)

In `js/main.js`, find this line:

```javascript
// BEFORE:
const stripePaymentLink = 'https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK';

// AFTER:
const stripePaymentLink = 'https://buy.stripe.com/your-actual-link-here';
```

### 3.3 Update Google Analytics in HTML files (3 minutes)

You need to update the tracking ID in 3 HTML files:

1. **index.html** - Find `GA_TRACKING_ID` and replace with your actual ID
2. **payment-success/index.html** - Same replacement
3. **personalized/index.html** - Same replacement

Replace:
```html
<!-- BEFORE -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>

<!-- AFTER -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_ID"></script>
```

And:
```javascript
// BEFORE
gtag('config', 'GA_TRACKING_ID');

// AFTER
gtag('config', 'G-YOUR_ACTUAL_ID');
```

---

## Step 4: Test Locally

### 4.1 Start Local Server

Open terminal/command prompt and navigate to your project folder:

```bash
cd /path/to/valentine-business
python3 -m http.server 8880
```

You should see: `Serving HTTP on :: port 8880`

### 4.2 Test the Site

1. Open browser and go to: **http://localhost:8880**
2. You should see the landing page
3. Click around to test:
   - "See Example" button
   - Navigation links
   - The example Valentine page

### 4.3 Test Payment Flow (Important!)

**For Testing (before going live):**

1. In Stripe Dashboard, make sure you're in **"Test mode"** (toggle at top right)
2. Use these test card numbers:
   - **Card number:** `4242 4242 4242 4242`
   - **Expiry:** Any future date (e.g., 12/25)
   - **CVC:** Any 3 digits (e.g., 123)
   - **ZIP:** Any 5 digits

3. Click "Buy Now" on your site
4. Complete the test payment
5. You should be redirected to the customization page
6. Fill in a name and generate a link
7. Test the generated link

---

## Step 5: Deploy to Production

### 5.1 Choose a Hosting Provider

**For Beginners (Free Options):**

| Provider | Cost | Difficulty | Best For |
|----------|------|------------|----------|
| **Netlify** | Free | Easy | Beginners |
| **Vercel** | Free | Easy | Beginners |
| **GitHub Pages** | Free | Medium | Developers |
| **Firebase** | Free tier | Medium | Scale |

**Recommended: Netlify (Easiest)**

### 5.2 Deploy on Netlify (10 minutes)

1. Go to **https://netlify.com**
2. Sign up (can use GitHub/Google)
3. Drag and drop your `valentine-business` folder onto the Netlify dashboard
4. Wait for deployment (30 seconds)
5. You'll get a free URL like `https://valentinelink-abc123.netlify.app`
6. **COPY this URL** - this is your live site!

### 5.3 Update Stripe Payment Link

1. Go back to Stripe Dashboard
2. Find your Payment Link
3. Click **"Edit"**
4. Update the Success URL to: `https://your-netlify-url.netlify.app/payment-success/?payment=success`
5. Save changes

### 5.4 Update Google Analytics

1. Go to Google Analytics
2. Click Admin (gear icon)
3. Click Data Streams
4. Click your web stream
5. Update the website URL to your Netlify URL
6. Save

---

## Understanding the Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Landing Page   │────▶│  Stripe Payment │────▶│  Customization  │
│  (Your Site)    │     │  ($10 CAD)      │     │  (Enter Name)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  They Say YES!  │◀────│  Valentine Page │◀────│  Generate Link  │
│  (Confetti!)    │     │  (Recipient)    │     │  (Unique URL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Troubleshooting

### Issue: "Payment system not configured yet" error

**Solution:** You haven't updated the Stripe key in `js/config.js`. Follow Step 3.

### Issue: Google Analytics not tracking

**Solution:** 
1. Check that you replaced ALL instances of `GA_TRACKING_ID`
2. Wait 24-48 hours for data to appear
3. Use the Realtime report to see live visitors

### Issue: "No" button not moving

**Solution:** Check browser console for JavaScript errors. Make sure `personalized.js` is loading.

### Issue: Custom image not showing

**Solution:** Images are stored in browser memory (localStorage). This is for demo purposes. For production, you'd need a database or image hosting service.

### Issue: Link doesn't work after closing browser

**Solution:** The current setup uses localStorage which clears when browser closes. For production, you need:
- A backend server (Node.js, Python, etc.)
- A database (MongoDB, PostgreSQL, etc.)
- Or use a service like Firebase

**For MVP/Launch:** This localStorage approach works for immediate sharing (same browser session).

---

## Next Steps

### To Make This Production-Ready:

1. **Add a Backend** (for persistent storage):
   - Use Firebase (easiest) or
   - Build a simple Node.js/Express server
   - Store Valentine data in database

2. **Add Email Notifications**:
   - Send confirmation email after purchase
   - Use SendGrid or Mailgun (free tiers available)

3. **Improve SEO**:
   - Add meta tags
   - Create social media preview images

4. **Add More Features**:
   - Multiple templates/themes
   - Music playback
   - Video upload option

5. **Scale Marketing**:
   - Run Facebook/Instagram ads (see MARKETING_GUIDE.md)
   - Partner with influencers
   - Create TikTok content

---

## Cost Breakdown

| Item | Cost |
|------|------|
| Stripe Account | FREE |
| Google Analytics | FREE |
| Netlify Hosting | FREE |
| Domain (optional) | ~$15/year |
| **Total Startup Cost** | **$0** |

**Per Transaction:**
- Sale: $10.00
- Stripe Fee: $0.59 (2.9% + $0.30)
- **Your Profit: $9.41**

---

## Support

If you get stuck:
1. Check Stripe docs: https://stripe.com/docs
2. Check Google Analytics help: https://support.google.com/analytics
3. Search Stack Overflow for specific errors

---

## 🎉 You're Ready to Launch!

Follow this guide step by step, and you'll have a working Valentine's business in one day. Good luck! 💕

---

**Last Updated:** February 2025  
**Version:** 1.0
