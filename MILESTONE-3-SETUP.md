# Milestone 3 - Orders & Payments Setup Guide

## Dependencies Installed

\`\`\`bash
npm install stripe uuid
\`\`\`

Already installed from previous milestones:
- ioredis (for queue system)
- mongodb, bcryptjs, jsonwebtoken

## Environment Variables Needed

Add to `.env.local`:

\`\`\`bash
# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`

## Getting Stripe Keys

1. Sign up at https://stripe.com
2. Get your test API keys from Dashboard > Developers > API keys
3. For webhook secret:
   - Go to Dashboard > Developers > Webhooks
   - Click "Add endpoint"
   - URL: `https://your-domain.com/api/v1/webhooks/stripe`
   - Select event: `payment_intent.succeeded`
   - Copy the webhook signing secret

## Testing Locally with Stripe CLI

Install Stripe CLI:
\`\`\`bash
brew install stripe/stripe-cli/stripe
\`\`\`

Login and forward webhooks:
\`\`\`bash
stripe login
stripe listen --forward-to localhost:3000/api/v1/webhooks/stripe
\`\`\`

This gives you a webhook secret starting with `whsec_...`

## Test Payment Flow

1. Create order: POST `/api/v1/orders`
2. Use Stripe test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any 3-digit CVC

## Webhook Flow

1. Payment succeeds on Stripe
2. Stripe sends webhook to `/api/v1/webhooks/stripe`
3. Webhook verifies signature
4. Checks for duplicate events
5. Updates order status to "paid"
6. Enqueues provisioning job in Redis queue

## Queue System

Uses Redis for production or in-memory queue for development.

Jobs are enqueued to `provision:high` queue with:
- orderId
- planId
- userId
- supplierId
- supplierCode
- phoneNumber
- attempt

## Features Implemented

- Idempotent order creation with clientRequestId
- Stripe PaymentIntent creation
- Webhook signature verification
- Duplicate event prevention
- Order status management
- Queue system for provisioning
- Complete checkout UI with real data
- Plan fetching by ID
- User authentication required

## API Endpoints

- `POST /api/v1/orders` - Create order (idempotent)
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders?orderId=xxx` - Get specific order
- `POST /api/v1/webhooks/stripe` - Stripe webhook handler
- `GET /api/v1/plans/:id` - Get plan by ID

## Next Steps

Milestone 4 will implement the provisioning worker that processes the queue jobs.
