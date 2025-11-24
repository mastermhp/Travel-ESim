import { Queue, Worker } from "bullmq"
import { getRedisClient } from "./redis.js"

class BullMQManager {
  constructor() {
    this.queues = {}
    this.workers = {}
  }

  async getConnection() {
    const redis = await getRedisClient()
    if (redis) {
      return {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
      }
    }
    return null
  }

  async getQueue(queueName) {
    if (!this.queues[queueName]) {
      const connection = await this.getConnection()
      if (connection) {
        this.queues[queueName] = new Queue(queueName, { connection })
      }
    }
    return this.queues[queueName]
  }

  async enqueue(queueName, jobData, options = {}) {
    try {
      const queue = await this.getQueue(queueName)
      if (queue) {
        const job = await queue.add(jobData.orderId || "job", jobData, {
          attempts: options.maxAttempts || 3,
          backoff: {
            type: "exponential",
            delay: options.backoffDelay || 5000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        })
        console.log(`[BullMQ] Job ${job.id} added to ${queueName}`)
        return job
      }
    } catch (error) {
      console.error(`[BullMQ] Error enqueuing job to ${queueName}:`, error)
      throw error
    }
  }

  async createWorker(queueName, processor, options = {}) {
    const connection = await this.getConnection()
    if (!connection) {
      console.log(`[BullMQ] No Redis connection, worker for ${queueName} not started`)
      return null
    }

    const worker = new Worker(queueName, processor, {
      connection,
      concurrency: options.concurrency || 1,
      ...options,
    })

    worker.on("completed", (job) => {
      console.log(`[BullMQ] Job ${job.id} completed`)
    })

    worker.on("failed", (job, err) => {
      console.error(`[BullMQ] Job ${job.id} failed:`, err.message)
    })

    this.workers[queueName] = worker
    console.log(`[BullMQ] Worker started for ${queueName}`)
    return worker
  }

  async closeAll() {
    await Promise.all([
      ...Object.values(this.queues).map((q) => q.close()),
      ...Object.values(this.workers).map((w) => w.close()),
    ])
  }
}

export const bullmqManager = new BullMQManager()
export const QUEUE_NAMES = {
  PROVISION_HIGH: "provision:high",
  PROVISION_NORMAL: "provision:normal",
  NOTIFICATION: "notification",
}
