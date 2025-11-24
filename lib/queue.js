import { getRedisClient } from "./redis.js"

class QueueManager {
  constructor() {
    this.redis = null
    this.inMemoryQueue = []
  }

  async getClient() {
    if (!this.redis) {
      this.redis = await getRedisClient()
    }
    return this.redis
  }

  async enqueue(queueName, job) {
    try {
      const redis = await this.getClient()
      if (redis) {
        await redis.lpush(queueName, JSON.stringify(job))
        console.log(`[Queue] Enqueued job to ${queueName}:`, job.orderId)
      } else {
        this.inMemoryQueue.push({ queueName, job, timestamp: Date.now() })
        console.log(`[Queue] Enqueued job to in-memory queue:`, job.orderId)
      }
    } catch (error) {
      console.error("[Queue] Error enqueueing job:", error)
      this.inMemoryQueue.push({ queueName, job, timestamp: Date.now() })
    }
  }

  async dequeue(queueName) {
    try {
      const redis = await this.getClient()
      if (redis) {
        const job = await redis.rpop(queueName)
        return job ? JSON.parse(job) : null
      } else {
        const index = this.inMemoryQueue.findIndex((item) => item.queueName === queueName)
        if (index !== -1) {
          const item = this.inMemoryQueue.splice(index, 1)[0]
          return item.job
        }
        return null
      }
    } catch (error) {
      console.error("[Queue] Error dequeuing job:", error)
      return null
    }
  }

  async getQueueLength(queueName) {
    try {
      const redis = await this.getClient()
      if (redis) {
        return await redis.llen(queueName)
      } else {
        return this.inMemoryQueue.filter((item) => item.queueName === queueName).length
      }
    } catch (error) {
      console.error("[Queue] Error getting queue length:", error)
      return 0
    }
  }

  getInMemoryQueue() {
    return this.inMemoryQueue
  }
}

export const queueManager = new QueueManager()
export const QUEUE_NAMES = {
  PROVISION_HIGH: "provision:high",
  PROVISION_NORMAL: "provision:normal",
  NOTIFICATION: "notification",
}
