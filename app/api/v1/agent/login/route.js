import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"

export async function POST(request) {
  try {
    console.log("[Agent Login] Starting login process")
    await connectDB()

    const { email, password } = await request.json()

    console.log("[Agent Login] Email:", email)

    // Find agent by email
    const agent = await Agent.findOne({ email: email.toLowerCase() })

    if (!agent) {
      console.log("[Agent Login] Agent not found")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("[Agent Login] Agent found:", agent.agentId, "Status:", agent.status)

    // Check if agent is approved
    if (agent.status !== "approved") {
      console.log("[Agent Login] Agent not approved, status:", agent.status)
      return NextResponse.json(
        {
          error: "Account not approved",
          status: agent.status,
          message:
            agent.status === "pending"
              ? "Your application is pending approval"
              : agent.status === "rejected"
                ? "Your application was rejected"
                : "Account suspended",
        },
        { status: 403 },
      )
    }

    let isPasswordValid = false

    // Check if password is already hashed (starts with $2a$ or $2b$ for bcrypt)
    if (agent.password.startsWith("$2a$") || agent.password.startsWith("$2b$")) {
      // Password is hashed, use bcrypt compare
      console.log("[Agent Login] Validating hashed password")
      isPasswordValid = await bcrypt.compare(password, agent.password)
    } else {
      // Plain text password (legacy), check directly
      console.log("[Agent Login] Validating plain text password (legacy)")
      console.log("[Agent Login] Input password:", password)
      console.log("[Agent Login] Input password length:", password.length)
      console.log("[Agent Login] Stored password:", agent.password)
      console.log("[Agent Login] Stored password length:", agent.password.length)
      console.log("[Agent Login] Passwords match:", password === agent.password)

      // Trim whitespace and compare
      const trimmedInput = password.trim()
      const trimmedStored = agent.password.trim()
      console.log("[Agent Login] After trim - Input:", trimmedInput, "Stored:", trimmedStored)
      console.log("[Agent Login] Trimmed match:", trimmedInput === trimmedStored)

      isPasswordValid = trimmedInput === trimmedStored

      // If valid, migrate to hashed password
      if (isPasswordValid) {
        console.log("[Agent Login] Migrating plain text password to hashed")
        const hashedPassword = await bcrypt.hash(trimmedInput, 10)
        await Agent.updateOne({ _id: agent._id }, { $set: { password: hashedPassword } })
        console.log("[Agent Login] Password migrated successfully")
      }
    }

    if (!isPasswordValid) {
      console.log("[Agent Login] Invalid password")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: agent._id,
        agentId: agent.agentId,
        agentMongoId: agent._id.toString(),
        email: agent.email,
        role: "agent",
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" },
    )

    console.log("[Agent Login] Login successful, agent:", agent.agentId)

    return NextResponse.json({
      success: true,
      token,
      agent: {
        id: agent._id,
        agentId: agent.agentId,
        name: agent.name,
        email: agent.email,
        country: agent.country,
        commissionRate: agent.commissionRate,
      },
    })
  } catch (error) {
    console.error("[Agent Login] Error:", error)
    return NextResponse.json({ error: "Login failed", details: error.message }, { status: 500 })
  }
}
