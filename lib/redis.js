import Redis from "ioredis"

let redis = null

export function getRedis() {
  if (!redis) {
    // Use Redis connection string from env or fall back to local
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"

    try {
      redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          const delay = Math.min(times * 50, 2000)
          return delay
        },
      })

      redis.on("error", (err) => {
        console.error("[Redis] Connection error:", err.message)
      })

      redis.on("connect", () => {
        console.log("[Redis] Connected successfully")
      })
    } catch (error) {
      console.error("[Redis] Failed to initialize:", error.message)
      // Return a mock Redis client for development without Redis
      return {
        get: async () => null,
        setex: async () => "OK",
        del: async () => 1,
        quit: async () => "OK",
      }
    }
  }

  return redis
}

export async function cacheGet(key) {
  try {
    const redis = getRedis()
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("[Redis] Cache get error:", error.message)
    return null
  }
}

export async function cacheSet(key, value, ttlSeconds = 60) {
  try {
    const redis = getRedis()
    await redis.setex(key, ttlSeconds, JSON.stringify(value))
    return true
  } catch (error) {
    console.error("[Redis] Cache set error:", error.message)
    return false
  }
}

export async function cacheDelete(key) {
  try {
    const redis = getRedis()
    await redis.del(key)
    return true
  } catch (error) {
    console.error("[Redis] Cache delete error:", error.message)
    return false
  }
}
