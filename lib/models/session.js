// Session management
import { getCollection } from "../db"
import crypto from "crypto"

export async function createSession(userId, deviceInfo, ip) {
  const sessions = await getCollection("sessions")

  const refreshToken = crypto.randomBytes(64).toString("hex")
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

  const session = {
    userId,
    refreshTokenHash,
    deviceInfo,
    ip,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  }

  await sessions.insertOne(session)

  return refreshToken
}

export async function findSessionByRefreshToken(refreshToken) {
  const sessions = await getCollection("sessions")
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

  return sessions.findOne({
    refreshTokenHash,
    expiresAt: { $gt: new Date() },
  })
}

export async function deleteSession(refreshToken) {
  const sessions = await getCollection("sessions")
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

  return sessions.deleteOne({ refreshTokenHash })
}

export async function deleteAllUserSessions(userId) {
  const sessions = await getCollection("sessions")
  return sessions.deleteMany({ userId })
}
