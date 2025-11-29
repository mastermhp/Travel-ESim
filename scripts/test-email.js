import { Resend } from "resend"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

async function testResendEmail() {
  console.log("\n🧪 Testing Resend Email Configuration...\n")

  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ ERROR: RESEND_API_KEY is not set in environment variables")
    console.log("\n📝 Please follow these steps:")
    console.log("1. Sign up at https://resend.com/signup")
    console.log("2. Get your API key from the dashboard")
    console.log("3. Add RESEND_API_KEY=re_your_key_here to your .env file")
    console.log("4. Run this script again\n")
    process.exit(1)
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
  const testEmail = process.env.ADMIN_EMAIL || "test@example.com"

  console.log("📧 Configuration:")
  console.log(`   From: ${fromEmail}`)
  console.log(`   To: ${testEmail}`)
  console.log("")

  try {
    console.log("📤 Sending test email...")

    const { data, error } = await resend.emails.send({
      from: `TraveleSIM Test <${fromEmail}>`,
      to: [testEmail],
      subject: "✅ Test Email from TraveleSIM - Email System Working!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981;">🎉 Success!</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            Your TraveleSIM email system is working correctly using Resend.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Configuration Details:</h3>
            <p><strong>Provider:</strong> Resend</p>
            <p><strong>From Email:</strong> ${fromEmail}</p>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #d1fae5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              ✅ Your production email system is ready to send:
            </p>
            <ul style="margin: 10px 0 0 0; color: #065f46;">
              <li>Order confirmations with QR codes</li>
              <li>Agent approval notifications</li>
              <li>Admin alerts</li>
            </ul>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This is an automated test email from TraveleSIM
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("\n❌ ERROR sending email:", error)
      console.log("\n🔍 Troubleshooting:")
      console.log("- Check if your RESEND_API_KEY is correct")
      console.log("- Verify your API key has sending permissions")
      console.log("- Check Resend dashboard for more details")
      console.log("- Visit https://resend.com/docs for help\n")
      process.exit(1)
    }

    console.log("\n✅ SUCCESS! Email sent successfully!")
    console.log(`   Email ID: ${data?.id || "unknown"}`)
    console.log("")
    console.log("📬 Check your inbox at:", testEmail)
    console.log("   (Also check spam/junk folder if not found)")
    console.log("")
    console.log("📊 View in Resend Dashboard:")
    console.log("   https://resend.com/emails")
    console.log("")
    console.log("🎯 Next Steps:")
    console.log("   1. Check if email was received")
    console.log("   2. Deploy to Vercel with RESEND_API_KEY environment variable")
    console.log("   3. Test agent approval and order confirmation emails")
    console.log("")

    process.exit(0)
  } catch (error) {
    console.error("\n❌ ERROR:", error.message)
    console.log("\n🔍 Common issues:")
    console.log("- API key is invalid or expired")
    console.log("- Network connectivity issues")
    console.log("- Rate limit exceeded (100 emails/day on free tier)")
    console.log("\n📖 Read the setup guide: EMAIL-SETUP-GUIDE.md\n")
    process.exit(1)
  }
}

// Run the test
testResendEmail()
