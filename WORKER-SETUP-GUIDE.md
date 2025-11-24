# Worker System Setup Guide

## Overview

The worker system handles eSIM provisioning, notifications, and background jobs using BullMQ with Redis for robust queue management.

## Architecture

### Queues
- **provision:high** - High-priority eSIM provisioning jobs
- **provision:normal** - Normal-priority provisioning jobs  
- **notification** - Email and SMS notifications

### Workers
- **Provision Worker** - Processes eSIM provisioning with Twilio/suppliers
- **Notification Worker** - Sends order confirmation emails and SMS

## Installation

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Setup Redis

**Option A: Local Redis**
\`\`\`bash
# Mac
brew install redis
brew services start redis

# Ubuntu
sudo apt install redis-server
sudo systemctl start redis
\`\`\`

**Option B: Redis Cloud (Free)**
1. Sign up at https://redis.com/try-free
2. Create a database
3. Copy connection URL to `.env.local`:
\`\`\`bash
REDIS_URL=redis://default:password@redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com:16379
\`\`\`

### 3. Setup Cloudinary (QR Code Storage)

1. Sign up at https://cloudinary.com (free tier: 25GB storage)
2. Go to Dashboard → Account Details
3. Copy credentials to `.env.local`:

\`\`\`bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123
\`\`\`

### 4. Setup Email (SMTP)

**Using Gmail:**
1. Enable 2-Factor Authentication on your Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:

\`\`\`bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
ADMIN_EMAIL=admin@travelesim.com
\`\`\`

## Running Workers

### Development

**Terminal 1: Next.js App**
\`\`\`bash
npm run dev
\`\`\`

**Terminal 2: Provision Worker**
\`\`\`bash
npm run worker:provision
\`\`\`

**Terminal 3: Notification Worker**
\`\`\`bash
npm run worker:notification
\`\`\`

**Or run all workers together:**
\`\`\`bash
npm run workers
\`\`\`

### Production

Use PM2 for process management:

\`\`\`bash
npm install -g pm2

# Start workers
pm2 start lib/workers/provision-worker.js --name "provision-worker"
pm2 start lib/workers/notification-worker.js --name "notification-worker"

# Save and auto-restart on reboot
pm2 save
pm2 startup
\`\`\`

## How It Works

### Order Flow

1. **Payment Success** → Stripe webhook triggered
2. **Webhook Handler** → Enqueues provisioning job to `provision:high`
3. **Provision Worker** → Picks up job, provisions eSIM via Twilio
4. **QR Code Upload** → Uploads QR to Cloudinary, saves URL to order
5. **Notification Queue** → Enqueues email/SMS notification job
6. **Notification Worker** → Sends confirmation email with QR code
7. **Order Complete** → User sees QR code on success page

### Worker Features

- **Atomic Locking** - Uses `provisionStatus` field to prevent duplicate processing
- **Idempotency** - Checks if order already has eSIM data before provisioning
- **Fallback Suppliers** - Tries backup supplier if primary fails
- **Exponential Backoff** - Retries with increasing delays (5s, 10s, 20s)
- **Max Attempts** - Fails after 3 attempts and alerts admin
- **Email Notifications** - Sends beautiful HTML emails with QR codes
- **SMS Notifications** - Sends activation codes via Twilio SMS
- **Admin Alerts** - Notifies admin when orders fail after max attempts

## Monitoring

### Check Queue Status

\`\`\`bash
# In Node.js console or API route
import { bullmqManager } from './lib/queue-bullmq.js'

const queue = await bullmqManager.getQueue('provision:high')
const waiting = await queue.getWaitingCount()
const active = await queue.getActiveCount()
const failed = await queue.getFailedCount()

console.log({ waiting, active, failed })
\`\`\`

### View Failed Jobs

\`\`\`bash
# Use BullMQ Dashboard
npm install -g bull-board
bull-board
# Open http://localhost:3000
\`\`\`

## Troubleshooting

### Workers not processing jobs

1. Check Redis is running: `redis-cli ping` (should return "PONG")
2. Check worker logs for errors
3. Verify `REDIS_URL` in `.env.local`

### QR codes not uploading

1. Verify Cloudinary credentials
2. Check worker logs for upload errors
3. Test Cloudinary connection manually

### Emails not sending

1. Verify Gmail App Password (not regular password)
2. Check SMTP settings in `.env.local`
3. Enable "Less secure app access" if using regular password

### Orders stuck in "provisioning"

1. Check if workers are running
2. Look for failed jobs in BullMQ dashboard
3. Check `provisionStatus` field in database

## Cost Estimates

- **Redis Cloud**: Free tier (30MB RAM)
- **Cloudinary**: Free tier (25GB, 25k transformations/month)
- **Email SMTP**: Free with Gmail
- **Twilio SMS**: ~$0.0075 per SMS (optional)

Total monthly cost for testing: **$0**
</markdown>
