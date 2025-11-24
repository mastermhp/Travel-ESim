# Twilio Super SIM Integration Guide

Complete step-by-step guide to set up Twilio Super SIM for real eSIM provisioning and SMS/OTP verification.

## What You'll Get

- Real eSIM provisioning with QR codes
- SMS and OTP verification for authentication
- Global connectivity through Twilio's network

## Step 1: Create Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free trial account
3. Verify your email and phone number
4. You'll get **$15 free trial credit**

## Step 2: Get Account Credentials

1. Go to your [Twilio Console](https://console.twilio.com/)
2. Copy your **Account SID** and **Auth Token** from the dashboard
3. Add them to `.env.local`:

\`\`\`bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
\`\`\`

## Step 3: Set Up Super SIM

### Enable Super SIM (Beta Access Required)

1. Go to https://console.twilio.com/us1/develop/iot/supersim/getting-started
2. Click **Request Beta Access** if not already enabled
3. Wait for approval (usually instant for trial accounts)

### Create a Fleet

1. Navigate to: https://console.twilio.com/us1/develop/iot/supersim/fleets
2. Click **Create new Fleet**
3. Name it: `production-esim` or `test-esim`
4. Copy the **Fleet SID** (starts with `HF...`)
5. Add to `.env.local`:

\`\`\`bash
TWILIO_SUPERSIM_FLEET_SID=HFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

## Step 4: Get Phone Number for SMS/OTP

1. Go to https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
2. Click **Buy a number**
3. Select your country (US numbers are cheapest: ~$1/month)
4. Choose a number with **SMS** capability
5. Complete purchase
6. Add to `.env.local`:

\`\`\`bash
TWILIO_PHONE_NUMBER=+1234567890
\`\`\`

## Step 5: Install Dependencies

\`\`\`bash
npm install twilio qrcode
\`\`\`

## Step 6: Start the Provision Worker

The worker processes eSIM provisioning jobs from the queue:

\`\`\`bash
node lib/workers/provision-worker.js
\`\`\`

Or add to `package.json`:

\`\`\`json
{
  "scripts": {
    "worker": "node lib/workers/provision-worker.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run worker\""
  }
}
\`\`\`

## Step 7: Test the Flow

1. Start your Next.js dev server: `npm run dev`
2. Start the worker in another terminal: `node lib/workers/provision-worker.js`
3. Go to `/plans` and purchase an eSIM
4. Complete Stripe payment
5. Worker will automatically provision the eSIM via Twilio
6. Success page will show real QR code and activation details

## Pricing

### Super SIM Costs (as of 2024)

- **SIM Activation**: $2.00 per SIM (one-time)
- **Data Usage**: ~$0.10/MB (varies by country)
- **Monthly Fee**: $0.50/SIM/month for active SIMs

### Recommended Pricing Strategy

For a 3GB plan:
- Your cost: $2.00 (activation) + $307.20 (3GB data) + $0.50 (monthly) = ~$309.70
- Sell for: $6.99 - $9.99
- **Profit**: Negative 😞

**Important**: Twilio Super SIM is expensive for consumer eSIM resale. Better alternatives:

1. **Airalo API** - Wholesale eSIM prices (~$2-5 per GB)
2. **Celitech** - Competitive wholesale rates
3. **1Global API** - Good for Europe and Asia

## Alternative: Use Mock Provider for Testing

If Twilio is too expensive, I can implement a mock eSIM provider that:
- Generates fake but realistic QR codes
- Simulates the provisioning flow
- Perfect for development and demos
- Costs $0

Would you like me to switch to a mock provider or continue with Twilio?

## Twilio Console Links

- Dashboard: https://console.twilio.com/
- Super SIM: https://console.twilio.com/us1/develop/iot/supersim
- Phone Numbers: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
- Usage & Billing: https://console.twilio.com/us1/billing/usage

## Troubleshooting

### "Fleet not found" error
- Make sure you created a fleet and copied the correct Fleet SID
- Fleet SID starts with `HF`

### "Insufficient balance" error
- Add funds to your Twilio account
- Trial accounts have limited functionality

### SMS not sending
- Verify your phone number in trial mode
- Upgrade to paid account for unrestricted SMS

## Need Help?

- Twilio Support: https://support.twilio.com/
- Super SIM Docs: https://www.twilio.com/docs/iot/supersim
- API Reference: https://www.twilio.com/docs/iot/supersim/api

---

**Ready to go live?** Once you've added your Twilio credentials to `.env.local`, restart your dev server and worker, then test a purchase!
