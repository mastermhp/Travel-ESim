// Auth configuration management
import { getCollection } from "../db"

export async function getAuthConfig() {
  const configs = await getCollection("configs")

  let config = await configs.findOne({ type: "auth_config" })

  if (!config) {
    // Create default config
    config = {
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
    }

    await configs.insertOne(config)
  }

  return config
}

export async function updateAuthConfig(updates) {
  const configs = await getCollection("configs")

  return configs.updateOne(
    { type: "auth_config" },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  )
}
