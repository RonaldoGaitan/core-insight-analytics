# DNS Configuration Guide for Cloudflare Domain

## Overview
This guide explains how to configure DNS records for your CoreInsight Analytics deployment.

## Prerequisites
- Domain purchased from Cloudflare
- Vercel account (for frontend)
- Railway/Render account (for backend)

## DNS Records Configuration for coreinsight.solutions

### 1. Frontend (Vercel) - Main Domain
Add these records in Cloudflare DNS:

**Type:** A  
**Name:** @ (or your domain root)  
**Content:** 76.76.21.21 (Vercel's IP)  
**Proxy Status:** Proxied (Orange cloud) ✓  
**TTL:** Auto

**Type:** CNAME  
**Name:** www  
**Content:** cname.vercel-dns.com  
**Proxy Status:** Proxied (Orange cloud) ✓  
**TTL:** Auto

### 2. Backend API - Subdomain
Add these records for the backend API:

**Type:** CNAME  
**Name:** api  
**Content:** your-backend-app.railway.app (or your Render domain)  
**Proxy Status:** DNS Only (Gray cloud) ⚠️  
**TTL:** Auto

### 3. Alternative: Single Domain with Path Routing
If you prefer a single domain:

**Type:** A  
**Name:** @  
**Content:** 76.76.21.21 (Vercel's IP)  
**Proxy Status:** Proxied (Orange cloud) ✓  
**TTL:** Auto

Then configure Vercel to proxy `/api/*` requests to your backend.

## Cloudflare Settings

### SSL/TLS Settings
1. Go to SSL/TLS → Overview
2. Set mode to **Full (strict)** for production
3. Enable **Always Use HTTPS**
4. Enable **Automatic HTTPS Rewrites**

### Page Rules (Optional)
Create page rules for:
- `*yourdomain.com/api/*` → Cache Level: Bypass (for API calls)
- `yourdomain.com` → Always Use HTTPS

## Environment Variables Update

Update your `.env.production` file:

```bash
# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_DOMAIN=https://yourdomain.com

# Backend
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Vercel Configuration

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain: `yourdomain.com`
3. Vercel will provide DNS records to add
4. Add the records in Cloudflare
5. Wait for DNS propagation (5-15 minutes)
6. Verify domain in Vercel

## Backend Configuration

If using Railway/Render:
1. Go to your project settings
2. Add custom domain: `api.yourdomain.com`
3. Add the CNAME record in Cloudflare
4. Railway/Render will provide SSL automatically

## Testing

After DNS propagation:

```bash
# Test frontend
curl https://yourdomain.com

# Test backend
curl https://api.yourdomain.com/api/

# Test API docs
curl https://api.yourdomain.com/docs
```

## Troubleshooting

### DNS Not Propagating
- Wait up to 48 hours for full propagation
- Check with: `dig yourdomain.com`
- Clear local DNS cache: `sudo dscacheutil -flushcache` (Mac)

### SSL Certificate Issues
- Ensure Cloudflare SSL is set to "Full (strict)"
- Check that backend has valid SSL certificate
- Verify proxy status (DNS only for backend)

### API Connection Issues
- Check CORS settings in backend
- Verify ALLOWED_ORIGINS includes your domain
- Ensure backend is accessible on the subdomain

## Security Best Practices

1. **Enable Cloudflare Firewall**:
   - Block known malicious IPs
   - Rate limiting rules
   - Bot fight mode

2. **Security Headers**:
   - Already configured in nginx.conf
   - Cloudflare adds additional protection

3. **DDoS Protection**:
   - Cloudflare provides automatic DDoS protection
   - Enable "Under Attack Mode" during attacks

## Maintenance

- Monitor DNS health in Cloudflare
- Renew domain annually
- Update SSL certificates (automatic with Cloudflare)
- Review firewall rules monthly
