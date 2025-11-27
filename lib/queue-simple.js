// Simple in-memory queue for development without Redis
class SimpleQueue {
  constructor() {
    this.jobs = new Map()
    this.processing = false
  }

  async enqueue(queueName, jobData, options = {}) {
    const jobId = `${queueName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.jobs.set(jobId, {
      id: jobId,
      queueName,
      data: jobData,
      options,
      status: "pending",
      attempts: 0,
      maxAttempts: options.maxAttempts || 3,
      createdAt: new Date(),
    })

    console.log(`[SimpleQueue] Job ${jobId} added to ${queueName}`)

    // Immediately process the job in development
    if (process.env.NODE_ENV === "development") {
      setImmediate(() => this.processJob(jobId))
    }

    return { id: jobId }
  }

  async processJob(jobId) {
    const job = this.jobs.get(jobId)
    if (!job || job.status === "processing") {
      return
    }

    job.status = "processing"
    job.attempts++

    try {
      console.log(`[SimpleQueue] Processing job ${jobId} (attempt ${job.attempts}/${job.maxAttempts})`)

      // Import and call the processor
      const { processProvisionJob } = await import("./workers/provision-worker.js")
      await processProvisionJob(job.data)

      job.status = "completed"
      console.log(`[SimpleQueue] Job ${jobId} completed`)

      // Remove completed jobs after 5 minutes
      setTimeout(() => this.jobs.delete(jobId), 5 * 60 * 1000)
    } catch (error) {
      console.error(`[SimpleQueue] Job ${jobId} failed:`, error.message)
      job.status = "failed"
      job.error = error.message

      // Retry if attempts remaining
      if (job.attempts < job.maxAttempts) {
        const delay = Math.pow(2, job.attempts) * 5000 // Exponential backoff
        console.log(`[SimpleQueue] Retrying job ${jobId} in ${delay}ms`)
        setTimeout(() => {
          job.status = "pending"
          this.processJob(jobId)
        }, delay)
      } else {
        console.error(`[SimpleQueue] Job ${jobId} failed after ${job.maxAttempts} attempts`)
      }
    }
  }

  getJob(jobId) {
    return this.jobs.get(jobId)
  }

  getAllJobs() {
    return Array.from(this.jobs.values())
  }
}

const simpleQueue = new SimpleQueue()

export { simpleQueue }
export const QUEUE_NAMES = {
  PROVISION_HIGH: "provision:high",
  PROVISION_NORMAL: "provision:normal",
  NOTIFICATION: "notification",
}
