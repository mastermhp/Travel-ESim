# Vercel Deployment Guide for Travel eSIM

This guide explains how to deploy your Travel eSIM application to Vercel with automatic eSIM provisioning.

## Problem: Worker Processes Don't Run on Vercel

Vercel is a **serverless platform**, which means:
- No long-running background processes
- No persistent worker threads
- Functions run on-demand and terminate after completing

Your localhost works because the queue worker runs continuously in development mode, but in production on Vercel, there's no worker process to provision eSIMs.

## Solution: Vercel Cron Jobs

We've implemented a **Vercel Cron Job** that runs every minute to process pending eSIM orders automatically.

### How It Works

1. **Customer places order** → Order created with `provisionStatus: "pending"`
2. **Vercel Cron runs every minute** → Checks for pending orders
3. **Cron processes orders** → Provisions eSIM, generates QR code, updates order
4. **Customer sees result** → Polling on success page detects completed order

## Setup Instructions

### 1. Add Environment Variables to Vercel

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

\`\`\`bash
# Required: Cron Job Authentication
CRON_SECRET=your_random_secret_string_min_32_chars_here

# All other environment variables from .env.example
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
ESIMGO_API_KEY=...
ESIMACCESS_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
# ... etc
\`\`\`

**Generate CRON_SECRET:**
\`\`\`bash
# On Mac/Linux:
openssl rand -base64 32

# Or use Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\`\`\`

### 2. Deploy to Vercel

The `vercel.json` file is already configured with the cron job:

\`\`\`json
{
  "crons": [
    {
      "path": "/api/v1/cron/process-queue",
      "schedule": "* * * * *"
    }
  ]
}
\`\`\`

This runs the queue processor **every minute**.

### 3. Verify Cron Job is Running

After deployment:

1. Go to **Vercel Dashboard → Your Project → Cron Jobs**
2. You should see: `POST /api/v1/cron/process-queue` running every minute
3. Check the logs to see it processing orders

### 4. Manual Queue Processing (Admin Only)

Admins can manually trigger queue processing:

**Endpoint:** `POST /api/v1/admin/process-queue`

**Usage:**
\`\`\`bash
curl -X POST https://your-domain.vercel.app/api/v1/admin/process-queue \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
\`\`\`

This processes up to 20 pending orders immediately.

## Testing the Queue

### 1. Place a Test Order

1. Go to your deployed site
2. Select a plan and complete checkout
3. You'll be redirected to the success page

### 2. Watch the Success Page

The success page automatically polls every 2 seconds:
- Shows "Generating QR code..." while provisioning
- Displays QR code and activation details when complete

### 3. Check Vercel Logs

In Vercel Dashboard → Deployments → Your deployment → Functions:
- Look for `[Cron]` logs showing order processing
- Check for successful provisioning messages

## Troubleshooting

### Orders Stuck in "Pending"

**Check Cron Job Status:**
1. Vercel Dashboard → Your Project → Cron Jobs
2. Verify job is enabled and running

**Check CRON_SECRET:**
1. Vercel Dashboard → Settings → Environment Variables
2. Ensure `CRON_SECRET` is set and matches

**Check Provider API Keys:**
1. Verify `ESIMGO_API_KEY` or `ESIMACCESS_API_KEY` is set
2. Check provider account has sufficient balance

### Cron Job Returns 401 Unauthorized

**Problem:** `CRON_SECRET` mismatch

**Solution:**
1. Generate new secret: `openssl rand -base64 32`
2. Update in Vercel environment variables
3. Redeploy

### Orders Process Slowly

**Current:** Cron runs every 1 minute, processes 10 orders per run

**To increase speed:**

Edit `vercel.json`:
\`\`\`json
{
  "crons": [
    {
      "path": "/api/v1/cron/process-queue",
      "schedule": "*/30 * * * * *"
    }
  ]
}
\`\`\`

This runs every 30 seconds (if supported by your Vercel plan).

Or increase orders per batch in `/api/v1/cron/process-queue/route.js`:
\`\`\`js
.limit(20) // Change from 10 to 20
\`\`\`

## Production Best Practices

### 1. Monitor Cron Job Performance

Set up monitoring for:
- Number of orders processed per minute
- Processing success rate
- Average provisioning time

### 2. Alert on Failures

Configure alerts for:
- Cron job failures
- Orders stuck in processing for > 5 minutes
- Provider API errors

### 3. Queue Dashboard (Optional)

Create an admin dashboard showing:
- Pending orders count
- Processing orders count
- Recent provisioning logs
- Manual trigger button

## Cost Optimization

**Vercel Cron Job Limits:**
- **Hobby Plan:** 1 cron job, runs up to 100 times/day
- **Pro Plan:** Unlimited cron jobs, unlimited runs

**Current Configuration:**
- 1 cron job running every minute = 1,440 runs/day
- Requires **Pro Plan** for production use

**Alternative for Hobby Plan:**
- Run every 5 minutes: `*/5 * * * *` = 288 runs/day ✅
- Process more orders per run (increase limit to 50)

## Summary

✅ **Cron Job Setup:** Automatic processing every minute
✅ **Manual Trigger:** Admin endpoint for immediate processing
✅ **Environment Config:** CRON_SECRET required
✅ **Monitoring:** Check Vercel logs for processing status
✅ **Scalability:** Adjust frequency and batch size as needed

Your eSIM provisioning now works on Vercel production!
