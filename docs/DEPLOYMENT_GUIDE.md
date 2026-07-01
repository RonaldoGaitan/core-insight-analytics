# CoreInsight Analytics - Complete Deployment Guide

## 🎯 What This Guide Does
This guide walks you through deploying your CoreInsight Analytics platform to production. Follow each step exactly as written.

## 📋 Prerequisites Checklist
- [ ] GitHub account (done - you have one)
- [ ] Domain purchased (done - coreinsight.solutions)
- [ ] Cloudflare account (done - you have one)
- [ ] Supabase account (done - you have one)
- [ ] Railway account (need to create)
- [ ] Vercel account (need to create)

---

## PART 1: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Sign up with GitHub"
3. Authorize GitHub access
4. You'll be redirected to Railway dashboard

### Step 2: Create Railway Project
1. Click "New Project" button (top left)
2. Click "Deploy from GitHub repo"
3. Find and select `core-insight-analytics` repository
4. Click "Import"

### Step 3: Configure Backend Service
1. Railway will show your repository
2. Click "Add Service" → "GitHub Repo"
3. Select `core-insight-analytics` again
4. **IMPORTANT:** Set "Root Directory" to `backend`
5. Click "Deploy"

### Step 4: Wait for Deployment
- This takes 2-3 minutes
- Watch the build logs
- If it fails, click "Redeploy"
- The Procfile I added should make it work

### Step 5: Add Environment Variables
1. After deployment succeeds, click your service
2. Go to "Variables" tab (left sidebar)
3. Click "New Variable" for each of these:

```
DATABASE_URL = your_supabase_database_url
SUPABASE_URL = your_supabase_url  
SUPABASE_KEY = your_supabase_key
ANTHROPIC_API_KEY = your_anthropic_api_key
SECRET_KEY = create_a_random_secret_key_here
ALLOWED_ORIGINS = https://coreinsight.solutions,https://www.coreinsight.solutions
```

### Step 6: Get Your Railway Domain
1. Go to "Settings" tab (left sidebar)
2. Click "Networking"
3. Copy your domain (looks like: `coreinsight-backend.railway.app`)
4. **SAVE THIS** - you'll need it for Cloudflare

### Step 7: Test Backend
1. Click your service name at top
2. Click "Open URL" 
3. You should see: `{"message":"Core Insight Analytics API"}`
4. If you see this, backend is working!

---

## PART 2: Configure Cloudflare DNS

### Step 1: Go to Cloudflare
1. Go to https://dash.cloudflare.com
2. Click on `coreinsight.solutions`
3. Click "DNS" (left sidebar)

### Step 2: Add Frontend Records
**Record 1:**
- Type: `A`
- Name: `@`
- Content: `76.76.21.21`
- Proxy status: Click the cloud (make it orange ✓)
- TTL: Auto
- Click "Save"

**Record 2:**
- Type: `CNAME`
- Name: `www`
- Content: `cname.vercel-dns.com`
- Proxy status: Click the cloud (make it orange ✓)
- TTL: Auto
- Click "Save"

### Step 3: Add Backend Record
**Record 3:**
- Type: `CNAME`
- Name: `api`
- Content: `your-railway-domain.railway.app` (paste from Step 6 above)
- Proxy status: Click the cloud (make it gray ⚠️ - DNS only)
- TTL: Auto
- Click "Save"

### Step 4: Configure SSL
1. Click "SSL/TLS" (left sidebar)
2. Under "Overview", set to "Full (strict)"
3. Turn on "Always Use HTTPS"
4. Turn on "Automatic HTTPS Rewrites"

---

## PART 3: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign up with GitHub"
3. Authorize GitHub access

### Step 2: Import Project
1. Click "Add New" → "Project"
2. Find and select `core-insight-analytics` repository
3. Click "Import"

### Step 3: Configure Frontend
1. Set "Framework Preset" to "Next.js"
2. Set "Root Directory" to `frontend`
3. Click "Create"

### Step 4: Add Environment Variables
1. Scroll to "Environment Variables" section
2. Add these:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_key
NEXT_PUBLIC_API_URL = https://api.coreinsight.solutions
```

3. Click "Add" for each
4. Click "Deploy"

### Step 5: Wait for Deployment
- Takes 1-2 minutes
- Vercel will give you a temporary URL

### Step 6: Add Custom Domain
1. After deployment, click "Domains" (top tabs)
2. Click "Add Domain"
3. Enter: `coreinsight.solutions`
4. Vercel will show DNS records to add
5. **You already added these in Part 2!**
6. Click "Verify"

### Step 7: Test Frontend
1. Click your domain in Vercel
2. You should see the CoreInsight landing page
3. If you see it, frontend is working!

---

## PART 4: Final Testing

### Test 1: Frontend
- Go to https://coreinsight.solutions
- Should see landing page
- Try clicking around

### Test 2: Backend API
- Go to https://api.coreinsight.solutions
- Should see: `{"message":"Core Insight Analytics API"}`

### Test 3: API Documentation
- Go to https://api.coreinsight.solutions/docs
- Should see Swagger UI with all endpoints

### Test 4: Authentication
- Go to https://api.coreinsight.solutions/docs
- Try the `/api/auth/signup` endpoint
- Create a test user
- Try the `/api/auth/login` endpoint

---

## 🎉 You're Live!

If all tests pass, your CoreInsight Analytics platform is now live at:
- **Frontend:** https://coreinsight.solutions
- **Backend API:** https://api.coreinsight.solutions
- **API Docs:** https://api.coreinsight.solutions/docs

---

## 🔧 Troubleshooting

### Backend won't deploy
- Make sure you set "Root Directory" to `backend`
- Check that environment variables are correct
- Try clicking "Redeploy"

### Frontend won't load
- Check Cloudflare DNS records are correct
- Wait 5-15 minutes for DNS propagation
- Check Vercel domain is verified

### API calls failing
- Check CORS settings in backend
- Verify ALLOWED_ORIGINS includes your domain
- Check backend is running

### DNS not working
- Use https://dnschecker.org to check propagation
- Clear your browser cache
- Try in incognito mode

---

## 📞 Need Help?

If you get stuck on any step:
1. Check the error message carefully
2. Go back and re-read that step
3. Make sure you followed exactly as written
4. Wait a few minutes and try again

---

## 🚀 Next Steps After Deployment

1. **Set up database backups** (run the backup script weekly)
2. **Monitor errors** in Sentry dashboard
3. **Add your OAuth credentials** for real integrations
4. **Test with real data** from your sources
5. **Set up payment processing** if charging users

---

## 📝 Important Notes

- **Keep your secrets safe** - never commit .env files
- **Monitor your usage** on Railway and Vercel (free tiers have limits)
- **Update dependencies** regularly for security
- **Backup your database** before making changes
- **Test everything** in development first

---

**You've got this! Follow each step exactly and you'll be live in under 30 minutes.**
