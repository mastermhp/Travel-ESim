// JWT utilities and auth helpers
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
const JWT_EXPIRES_IN = "1h"

export function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  )
}

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function verifyToken(token) {
  return verifyAccessToken(token)
}

export function extractToken(request) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  return authHeader.substring(7)
}

export async function getCurrentUser(request) {
  const token = extractToken(request)

  if (!token) {
    return null
  }

  const payload = verifyAccessToken(token)

  if (!payload) {
    return null
  }

  return payload
}

// Rate limiting helper
const loginAttempts = new Map()

export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const attempts = loginAttempts.get(identifier) || []

  // Clean old attempts
  const recentAttempts = attempts.filter((time) => now - time < windowMs)

  if (recentAttempts.length >= maxAttempts) {
    return false
  }

  recentAttempts.push(now)
  loginAttempts.set(identifier, recentAttempts)

  return true
}

export function logSecurityEvent(userId, event, details) {
  console.log(`[v0] Security Event: ${event}`, {
    userId,
    timestamp: new Date().toISOString(),
    ...details,
  })

  // In production, store in database or send to monitoring service
}
