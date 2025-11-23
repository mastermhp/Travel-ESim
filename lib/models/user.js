// User model and utilities
import { getCollection } from "../db"
import bcrypt from "bcryptjs"

export async function createUser(userData) {
  const users = await getCollection("users")

  // Check if user already exists
  const existingUser = await users.findOne({
    $or: [{ email: userData.email }, { phone: userData.phone }, { username: userData.username }],
  })

  if (existingUser) {
    if (existingUser.email === userData.email) {
      throw new Error("Email already registered")
    }
    if (existingUser.phone === userData.phone) {
      throw new Error("Phone number already registered")
    }
    if (existingUser.username === userData.username) {
      throw new Error("Username already taken")
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(userData.password, 12)

  // Generate unique referral code
  const referralCode = await generateUniqueReferralCode()

  const user = {
    name: userData.name,
    username: userData.username,
    email: userData.email,
    phone: userData.phone,
    passwordHash,
    role: userData.role || "customer",
    referralCode,
    referredBy: userData.referralCodeUsed || null,
    loginMethods: {
      emailPassword: true,
      phoneOtp: true,
      google: false,
      apple: false,
      facebook: false,
    },
    mfa: {
      enabled: false,
      methods: [],
    },
    language: userData.language || "en",
    isVerified: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await users.insertOne(user)

  // Record referral if provided
  if (userData.referralCodeUsed) {
    await recordReferral(userData.referralCodeUsed, result.insertedId)
  }

  return { ...user, _id: result.insertedId }
}

export async function findUserByEmail(email) {
  const users = await getCollection("users")
  return users.findOne({ email })
}

export async function findUserByPhone(phone) {
  const users = await getCollection("users")
  return users.findOne({ phone })
}

export async function findUserById(userId) {
  const users = await getCollection("users")
  const { ObjectId } = require("mongodb")
  return users.findOne({ _id: new ObjectId(userId) })
}

export async function findUserByUsername(username) {
  const users = await getCollection("users")
  return users.findOne({ username })
}

export async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export async function updateUser(userId, updates) {
  const users = await getCollection("users")
  const { ObjectId } = require("mongodb")

  const result = await users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
  )

  return result.modifiedCount > 0
}

async function generateUniqueReferralCode() {
  const users = await getCollection("users")
  let code
  let exists = true

  while (exists) {
    code = "ESIM" + Math.random().toString(36).substring(2, 8).toUpperCase()
    const existing = await users.findOne({ referralCode: code })
    exists = !!existing
  }

  return code
}

async function recordReferral(referralCode, newUserId) {
  const users = await getCollection("users")
  const referrals = await getCollection("referrals")

  const referrer = await users.findOne({ referralCode })
  if (!referrer) return

  await referrals.insertOne({
    referrerId: referrer._id,
    referredUserId: newUserId,
    referralCode,
    status: "pending",
    createdAt: new Date(),
  })
}
