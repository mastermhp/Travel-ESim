import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Plan from "@/lib/models/plan"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params

    const plan = await Plan.findById(id)
    if (!plan) {
      return NextResponse.json({ success: false, error: "Plan not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, plan })
  } catch (error) {
    console.error("[Plans] Error fetching plan:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
