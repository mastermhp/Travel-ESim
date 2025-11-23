// One-time initialization endpoint to create admin user
import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const users = await getCollection("users")

    // Check if admin already exists
    const existingAdmin = await users.findOne({ email: "admin@travelesim.com" })

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin user already exists",
        },
        { status: 400 },
      )
    }

    // Create admin user
    const passwordHash = await bcrypt.hash("Admin@123", 12)

    const adminUser = {
      name: "System Administrator",
      username: "admin",
      email: "admin@travelesim.com",
      phone: "+1234567890",
      passwordHash,
      role: "admin",
      referralCode: "ADMIN001",
      referredBy: null,
      loginMethods: {
        emailPassword: true,
        phoneOtp: false,
        google: false,
        apple: false,
        facebook: false,
      },
      mfa: {
        enabled: false,
        methods: [],
      },
      language: "en",
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await users.insertOne(adminUser)

    // Also initialize auth config if it doesn't exist
    const authConfigs = await getCollection("auth_config")
    const existingConfig = await authConfigs.findOne({ type: "auth_config" })

    if (!existingConfig) {
      await authConfigs.insertOne({
        type: "auth_config",
        enableEmailPassword: true,
        enablePhoneOtp: true,
        enableSocialGoogle: true,
        enableSocialApple: true,
        enableSocialFacebook: true,
        requireMFA: false,
        allowedMfaMethods: ["totp", "sms", "email"],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      credentials: {
        email: "admin@travelesim.com",
        password: "Admin@123",
        note: "Please change password after first login",
      },
      userId: result.insertedId,
    })
  } catch (error) {
    console.error("[Admin Init Error]", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to initialize admin user",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET(request) {
  return POST(request)
}
