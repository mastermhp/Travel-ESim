import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"

export async function GET() {
  try {
    const db = await connectToDatabase()
    const settings = await db.collection("settings").findOne({ type: "languages" })

    return NextResponse.json({
      enabled: settings?.enabled || ["en", "ar", "fr", "es", "pt", "zh", "sw", "am", "ti", "om", "so"],
    })
  } catch (error) {
    console.error("[Languages API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch language settings" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { enabled } = await request.json()

    if (!Array.isArray(enabled)) {
      return NextResponse.json({ error: "Invalid enabled languages array" }, { status: 400 })
    }

    const db = await connectToDatabase()
    await db
      .collection("settings")
      .updateOne(
        { type: "languages" },
        { $set: { type: "languages", enabled, updatedAt: new Date() } },
        { upsert: true },
      )

    return NextResponse.json({ success: true, enabled })
  } catch (error) {
    console.error("[Languages API] Error updating:", error)
    return NextResponse.json({ error: "Failed to update language settings" }, { status: 500 })
  }
}
