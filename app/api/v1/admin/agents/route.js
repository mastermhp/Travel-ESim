import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import { sendAgentApprovalEmail } from "@/lib/notifications"

// GET - Fetch all agent applications with optional status filter
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") // pending, approved, rejected

    if (!status) {
      // Fetch all agents from agents collection
      console.log("[Admin] Fetching all agents")
      const agentsCol = await getCollection("agents")

      const agents = await agentsCol
        .aggregate([
          {
            $lookup: {
              from: "agentwallets",
              localField: "_id",
              foreignField: "agentId",
              as: "wallet",
            },
          },
          {
            $unwind: {
              path: "$wallet",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              agentId: 1,
              name: 1,
              email: 1,
              phone: 1,
              status: 1,
              commissionRate: 1,
              businessName: 1,
              businessAddress: 1,
              idDocument: 1,
              isBlocked: 1,
              createdAt: 1,
              balance: "$wallet.balance",
              totalEarned: "$wallet.totalEarned",
            },
          },
          { $sort: { createdAt: -1 } },
        ])
        .toArray()

      console.log(`[Admin] Found ${agents.length} agents`)
      return NextResponse.json({ success: true, agents })
    }

    console.log("[Admin] Fetching agent applications with status:", status)

    const agentApplications = await getCollection("agentApplications")

    const filter = { status }
    const applications = await agentApplications.find(filter).sort({ submittedAt: -1 }).toArray()

    console.log(`[Admin] Found ${applications.length} agent applications`)

    return NextResponse.json({ success: true, agents: applications })
  } catch (error) {
    console.error("[Admin] Error fetching agent applications:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST - Approve or reject agent application
export async function POST(request) {
  try {
    const { agentId, action, commissionRate, currency, rejectionReason } = await request.json()

    console.log("[Admin] Processing agent application action:", { agentId, action })

    const agentApplications = await getCollection("agentApplications")
    const agents = await getCollection("agents")
    const agentWallets = await getCollection("agentWallets")

    const application = await agentApplications.findOne({ _id: new ObjectId(agentId) })
    if (!application) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 })
    }

    if (action === "approve") {
      const tempPassword = `Agent${Date.now().toString().slice(-6)}`
      const newAgentId = `agent_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

      const hashedPassword = await bcrypt.hash(tempPassword, 10)

      const newAgent = {
        agentId: newAgentId,
        name: application.name,
        email: application.email,
        password: hashedPassword,
        requirePasswordChange: true,
        phone: application.phone,
        country: application.country,
        city: application.city,
        businessType: application.businessType,
        experience: application.experience,
        status: "approved",
        commissionRate: commissionRate || 5,
        currency: currency || "USD",
        referralCode: `REF${Date.now()}`,
        totalSales: 0,
        tier: "bronze",
        approvedAt: new Date(),
        createdAt: new Date(),
      }

      const agentResult = await agents.insertOne(newAgent)
      console.log("[Admin] ✅ Agent created:", newAgentId)
      console.log("[Admin] 🔑 Temporary password:", tempPassword)

      await agentWallets.insertOne({
        agentId: agentResult.insertedId.toString(),
        balance: 0,
        reserved: 0,
        currency: currency || "USD",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log("[Admin] 💰 Wallet created for agent:", newAgentId)

      await agentApplications.updateOne(
        { _id: new ObjectId(agentId) },
        {
          $set: {
            status: "approved",
            reviewedAt: new Date(),
            agentId: newAgentId,
            commissionRate: commissionRate,
            currency: currency,
          },
        },
      )

      console.log("[Admin] ✅ Application approved:", application.email)

      await sendAgentApprovalEmail(application.email, application.name, tempPassword, newAgentId)
      console.log("[Admin] 📧 Approval email sent to:", application.email)

      return NextResponse.json({
        success: true,
        agent: { ...newAgent, _id: agentResult.insertedId },
        tempPassword: tempPassword,
        message: `Agent approved. Temporary password: ${tempPassword}. Email sent to agent.`,
      })
    } else if (action === "reject") {
      await agentApplications.updateOne(
        { _id: new ObjectId(agentId) },
        {
          $set: {
            status: "rejected",
            reviewedAt: new Date(),
            reviewNotes: rejectionReason || "Application rejected",
          },
        },
      )

      console.log("[Admin] ❌ Application rejected:", application.email)
      return NextResponse.json({
        success: true,
        message: "Application rejected",
        agent: { email: application.email },
      })
    } else {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("[Admin] Error processing application:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PATCH - Update agent settings
export async function PATCH(request) {
  try {
    const { agentId, updates } = await request.json()

    console.log("[Admin] Updating agent:", agentId, updates)

    const agents = await getCollection("agents")

    const result = await agents.updateOne(
      { _id: new ObjectId(agentId) },
      { $set: { ...updates, updatedAt: new Date() } },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 })
    }

    console.log("[Admin] Agent updated")

    return NextResponse.json({ success: true, message: "Agent updated successfully" })
  } catch (error) {
    console.error("[Admin] Error updating agent:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
