import { sendAgentApprovalEmail } from "../lib/notifications.js"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

async function testAgentApprovalEmail() {
  console.log("\n🧪 Testing Agent Approval Email...\n")

  // Test data
  const testAgent = {
    email: process.env.ADMIN_EMAIL || "test@example.com",
    name: "John Doe",
    tempPassword: "TempPass123!",
    agentId: "AGT-TEST-12345",
  }

  console.log("📧 Sending agent approval email to:", testAgent.email)
  console.log("   Agent Name:", testAgent.name)
  console.log("   Temp Password:", testAgent.tempPassword)
  console.log("")

  try {
    const result = await sendAgentApprovalEmail(
      testAgent.email,
      testAgent.name,
      testAgent.tempPassword,
      testAgent.agentId,
    )

    if (result.success) {
      console.log("✅ SUCCESS! Agent approval email sent via", result.provider)
      console.log("")
      console.log("📬 Check your inbox at:", testAgent.email)
      console.log("   The email includes:")
      console.log("   - Agent name and congratulations message")
      console.log("   - Login credentials (email + temporary password)")
      console.log("   - Agent ID")
      console.log("   - Login button/link")
      console.log("   - Password change instructions")
      console.log("")
    } else {
      console.error("❌ ERROR:", result.error)
    }
  } catch (error) {
    console.error("❌ ERROR:", error.message)
  }
}

testAgentApprovalEmail()
