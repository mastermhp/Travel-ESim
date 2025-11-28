import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function POST(request) {
  try {
    const body = await request.json()
    console.log("[v0] Agent registration request:", body)

    const { name, email, phone, country, city, businessType, experience, whyJoin } = body

    const missingFields = []
    if (!name) missingFields.push("name")
    if (!email) missingFields.push("email")
    if (!phone) missingFields.push("phone")
    if (!country) missingFields.push("country")
    if (!city) missingFields.push("city")
    if (!businessType) missingFields.push("businessType")
    if (!experience) missingFields.push("experience")
    if (!whyJoin) missingFields.push("whyJoin")

    if (missingFields.length > 0) {
      console.log("[v0] Missing required fields:", missingFields)
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    const agentApplications = await getCollection("agentApplications")

    // Check if already applied
    const existing = await agentApplications.findOne({
      $or: [{ email }, { phone }],
    })

    if (existing) {
      console.log("[v0] Duplicate application found:", existing.email)
      return NextResponse.json({ error: "An application with this email or phone already exists" }, { status: 400 })
    }

    // Create application
    const application = {
      name,
      email,
      phone,
      country,
      city,
      businessType,
      experience,
      whyJoin,
      status: "pending",
      submittedAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
      reviewNotes: null,
    }

    const result = await agentApplications.insertOne(application)
    console.log("[v0] Agent application created successfully:", result.insertedId)

    return NextResponse.json({
      success: true,
      applicationId: result.insertedId,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Agent registration error:", error)
    return NextResponse.json({ error: "Failed to submit application", details: error.message }, { status: 500 })
  }
}
