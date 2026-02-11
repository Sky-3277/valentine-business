# 💕 ValentineLink - Valentine's Day Business

A complete, ready-to-launch Valentine's Day business where customers pay $10 to create personalized, interactive Valentine links.

---

## 🚀 Quick Start

### 1. Test Locally
```bash
cd valentine-business
python3 -m http.server 8880
```
Open http://localhost:8880 in your browser.

### 2. Read Setup Guide
See **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for complete setup instructions.

### 3. Read Marketing Guide
See **[MARKETING_GUIDE.md](MARKETING_GUIDE.md)** for advertising strategies.

---

## 📁 Project Structure

```
valentine-business/
├── index.html              # Main landing page
├── css/
│   └── style.css          # Main styles
├── js/
│   ├── config.js          # Configuration (STRIPE, GA)
│   ├── main.js            # Main functionality
│   └── analytics.js       # Analytics tracking
├── images/
│   └── hamster.png        # Cute character image
├── payment-success/
│   └── index.html         # Post-payment customization
├── personalized/
│   ├── index.html         # Valentine page template
│   ├── personalized.css   # Valentine page styles
│   ├── personalized.js    # Valentine page logic
│   └── example.html       # Demo/example page
├── SETUP_GUIDE.md         # Complete setup instructions
├── MARKETING_GUIDE.md     # Advertising & marketing guide
└── README.md              # This file
```

---

## ✨ Features

### For Customers:
- 💕 Beautiful pink gradient design
- 🐹 Animated cute character
- 😂 "No" button runs away when hovered
- 🎉 Confetti celebration on "Yes"
- 📸 Optional custom photo upload
- 💌 Personalized with recipient's name
- 🔗 Unique shareable link

### For You (Business Owner):
- 💰 $10 per sale
- 📊 Google Analytics tracking
- 🎯 Conversion funnel tracking
- 📱 Mobile responsive
- ⚡ Fast loading
- 🆓 Free hosting options

---

## 💳 Payment Integration

**Recommended:** Stripe Payment Links (easiest, no server needed)

**Alternative:** Stripe Checkout with backend

See SETUP_GUIDE.md for detailed instructions.

---

## 📊 Analytics

Tracks:
- Page views
- Buy button clicks
- Checkout starts
- Payment completions
- Link generations
- Valentine page views
- "Yes" button clicks

---

## 🎯 Revenue Model

| Item | Amount |
|------|--------|
| Sale Price | $10.00 CAD |
| Stripe Fee | ~$0.59 |
| **Your Profit** | **~$9.41** |

**Example:** 10 sales/day = ~$94/day profit

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Payment:** Stripe
- **Analytics:** Google Analytics 4
- **Hosting:** Netlify (recommended), Vercel, or any static host
- **No backend required** for MVP

---

## 📝 Configuration

Edit `js/config.js` to customize:

```javascript
const CONFIG = {
    stripe: {
        publishableKey: 'YOUR_STRIPE_KEY',
        amount: 1000,  // $10.00 in cents
        currency: 'cad',
    },
    analytics: {
        trackingId: 'YOUR_GA_ID',
    },
    business: {
        name: 'ValentineLink',
        supportEmail: 'your@email.com',
    }
};
```

---

## 🚀 Deployment

### Option 1: Netlify (Easiest & Free)
1. Go to https://netlify.com
2. Drag and drop the `valentine-business` folder
3. Get your live URL instantly

### Option 2: Vercel (Free)
1. Go to https://vercel.com
2. Import your project
3. Deploy

### Option 3: Any Web Host
Upload all files to your web hosting via FTP.

---

## 📱 Testing

### Local Testing
```bash
python3 -m http.server 8880
```

### Test Card for Stripe
- Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

---

## 🎨 Customization

### Change Colors
Edit `css/style.css`:
```css
:root {
    --primary-pink: #ff69b4;
    --deep-pink: #d81b60;
    --light-pink: #ffc0cb;
    --green: #4caf50;
    --red: #f44336;
}
```

### Change Character Image
Replace `images/hamster.png` with your own image.

### Change Price
Edit `js/config.js`:
```javascript
amount: 1500,  // $15.00 in cents
```

---

## 📈 Marketing

See **[MARKETING_GUIDE.md](MARKETING_GUIDE.md)** for:
- Instagram/Facebook ad templates
- Targeting strategies
- Budget recommendations
- Video ad scripts
- Retargeting campaigns

---

## ⚠️ Known Limitations

### Current Setup (MVP):
- Links work in same browser session only (localStorage)
- Images stored in browser memory
- No persistent database

### For Production:
Consider adding:
- Backend server (Node.js/Python)
- Database (Firebase/MongoDB)
- Image hosting (Cloudinary/AWS S3)
- Email notifications

---

## 🔒 Security Notes

- Never commit real API keys to Git
- Use environment variables for production
- Stripe keys start with `pk_live_` (public) or `sk_live_` (secret - never share)

---

## 🆘 Support

### Common Issues:

**"Payment system not configured"**
→ Update Stripe key in `js/config.js`

**Analytics not tracking**
→ Check GA tracking ID in all HTML files

**Images not showing**
→ Check file paths, ensure images are in `images/` folder

---

## 📄 License

This project is for your personal business use. The code is provided as-is.

---

## 🎉 Ready to Launch?

1. ✅ Follow SETUP_GUIDE.md
2. ✅ Test everything locally
3. ✅ Deploy to production
4. ✅ Run ads (see MARKETING_GUIDE.md)
5. 💰 Make money!

---

**Good luck with your ValentineLink business! 💕**

*Created with love for Valentine's Day 2025*
