import { getCollection } from "../lib/db.js"
import bcrypt from "bcryptjs"

// Verify environment variables
if (!process.env.MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI environment variable is not set")
  console.log("\nPlease run the script with environment variables:")
  console.log('MONGODB_URI="your-mongo-uri" node scripts/seed-admin.js')
  console.log("\nOr create a .env file in the root directory with:")
  console.log("MONGODB_URI=your-mongo-uri")
  process.exit(1)
}

async function seedAdmin() {
  try {
    console.log("🔄 Connecting to MongoDB...")
    const users = await getCollection("users")

    // Check if admin already exists
    const existingAdmin = await users.findOne({ email: "admin@travelesim.com" })

    if (existingAdmin) {
      console.log("✅ Admin user already exists!")
      console.log("Email: admin@travelesim.com")
      console.log("Role:", existingAdmin.role)
      process.exit(0)
    }

    console.log("🔄 Creating admin user...")
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

    console.log("✅ Admin user created successfully!")
    console.log("-----------------------------------")
    console.log("📧 Email: admin@travelesim.com")
    console.log("🔑 Password: Admin@123")
    console.log("👤 Role: admin")
    console.log("🆔 User ID:", result.insertedId)
    console.log("-----------------------------------")
    console.log("⚠️  Please change the password after first login!")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message)
    console.error(error)
    process.exit(1)
  }
}

seedAdmin()
