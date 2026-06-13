# 🚀 Zionbridge Technologies — Complete Setup Guide

## Project Structure

```
zionbridge/
├── frontend/          ← Next.js 14 + Tailwind CSS
│   ├── src/
│   │   ├── app/       ← Pages (Home, Admin, Jobs, etc.)
│   │   ├── components/← Reusable UI components
│   │   └── lib/       ← API client
│   └── package.json
├── backend/           ← Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/    ← Mongoose models
│   │   ├── routes/    ← API routes
│   │   ├── middleware/← Auth middleware
│   │   └── utils/     ← Email, seed utilities
│   └── package.json
└── README.md
```

---

## 📋 STEP-BY-STEP SETUP

### STEP 1 — Install Prerequisites

Make sure you have these installed:
- **Node.js** v18+ → https://nodejs.org
- **Git** → https://git-scm.com
- **VS Code** (recommended) → https://code.visualstudio.com

---

### STEP 2 — MongoDB Atlas Setup (Free Database)

1. Go to https://mongodb.com/atlas and **Sign Up** (free)
2. Create a new **free cluster** (M0 Sandbox)
3. Choose **AWS** → **Mumbai (ap-south-1)** region
4. Set username and password (save these!)
5. Under **Network Access** → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0)
6. Under **Database** → Click **Connect** → **Connect your application**
7. Copy the connection string:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/zionbridge?retryWrites=true&w=majority
   ```
8. Replace `USERNAME` and `PASSWORD` with your credentials

---

### STEP 3 — Gmail App Password (for Email)

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** if not already done
3. Search for **App Passwords**
4. Select **Mail** and **Other (Custom name)** → type "Zionbridge"
5. Click **Generate** → copy the 16-character password
6. You'll use this as `EMAIL_PASS` below

---

### STEP 4 — Backend Setup

```bash
# 1. Navigate to backend folder
cd zionbridge/backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env with your values:
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/zionbridge?retryWrites=true&w=majority
JWT_SECRET=ZionbridgeSuperSecretKey2024!ChangeMeInProduction
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@zionbridgetechnologies.com
ADMIN_PASSWORD=Admin@Zion2024

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16char_app_password
EMAIL_FROM=info@zionbridgetechnologies.com

FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

```bash
# 5. Start backend
npm run dev
# ✅ Should show: MongoDB Connected + Server running on port 5000
```

---

### STEP 5 — Frontend Setup

```bash
# 1. Navigate to frontend folder
cd zionbridge/frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.local.example .env.local

# 4. Edit .env.local:
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
# 5. Start frontend
npm run dev
# ✅ Open http://localhost:3000
```

---

### STEP 6 — Test the Website

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Main website |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:3000/courses | Training programs |
| http://localhost:3000/jobs | Jobs portal |
| http://localhost:3000/contact | Contact page |
| http://localhost:5000/api/health | API health check |

**Admin Login:**
- Email: `admin@zionbridgetechnologies.com`
- Password: `Admin@Zion2024`

---

### STEP 7 — Push to GitHub

```bash
# In the root zionbridge/ folder:
cd zionbridge

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "🚀 Initial commit: Zionbridge Technologies full-stack website"

# Create repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/zionbridge-technologies.git
git branch -M main
git push -u origin main
```

---

### STEP 8 — Deploy Backend to Vercel

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to backend
cd zionbridge/backend

# Deploy
vercel

# Follow prompts:
# - Set up project? YES
# - Which scope? Your account
# - Link to existing project? NO
# - Project name: zionbridge-backend
# - Directory: ./
```

After deploy, go to Vercel Dashboard → Your backend project → **Settings** → **Environment Variables**

Add all these:
```
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = ZionbridgeSuperSecretKey2024!ChangeMeInProduction
ADMIN_EMAIL = admin@zionbridgetechnologies.com
ADMIN_PASSWORD = Admin@Zion2024
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = your_gmail@gmail.com
EMAIL_PASS = your_app_password
EMAIL_FROM = info@zionbridgetechnologies.com
FRONTEND_URL = https://your-frontend-domain.vercel.app
NODE_ENV = production
```

Then redeploy:
```bash
vercel --prod
```

Copy your backend URL (e.g., `https://zionbridge-backend.vercel.app`)

---

### STEP 9 — Deploy Frontend to Vercel

```bash
cd zionbridge/frontend

# Deploy
vercel

# Follow prompts:
# - Project name: zionbridge-technologies
```

In Vercel Dashboard → Frontend project → **Settings** → **Environment Variables**:
```
NEXT_PUBLIC_API_URL = https://zionbridge-backend.vercel.app/api
```

Then redeploy:
```bash
vercel --prod
```

🎉 **Your website is now live!**

---

## 🔐 Admin Panel Features

Login at `/admin/login` with your credentials.

| Section | What You Can Do |
|---------|----------------|
| Dashboard | View stats overview + recent enquiries |
| Enquiries | View all leads, update status (New/Contacted/Converted) |
| Courses | Add, edit, delete training courses with fees & duration |
| Jobs | Post jobs, mark active/inactive, manage applications |
| Testimonials | Add student success stories with salary details |
| Applications | Review job applications, update hiring status |
| Settings | Update phone, email, address, social links, stats |

---

## 📧 Email Flow

When a user submits any form:
1. **Confirmation email** → sent to the user
2. **Admin notification** → sent to your ADMIN_EMAIL
3. Lead saved in MongoDB for admin panel

---

## 🔧 Customization

### Change Company Info
Go to **Admin Panel → Settings** and update phone, email, address, WhatsApp number.

### Add Courses
Admin Panel → Courses → Add Course

### Change Admin Password
Admin Panel → (use change-password API) or update in MongoDB directly.

### Custom Domain
In Vercel Dashboard → Your project → **Settings** → **Domains** → Add your domain.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (via Mongoose) |
| Auth | JWT + bcryptjs |
| Email | Nodemailer + Gmail SMTP |
| Deploy | Vercel (frontend + backend) |

---

## 📞 Support

If you face any issues:
1. Check backend logs in Vercel Dashboard
2. Ensure MongoDB URI is correct and IP is whitelisted
3. Ensure Gmail App Password is 16 characters (no spaces)
4. Check browser console for API errors

**Admin Credentials (change these in production!)**
- Email: `admin@zionbridgetechnologies.com`
- Password: `Admin@Zion2024`
