import { getRedisClient } from "./redis.js"

class QueueManager {
  constructor() {
    this.redis = null
    this.inMemoryQueue = []
    this.isProcessing = false
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
        console.log(`[Queue] Redis not available, using in-memory queue`)
        this.inMemoryQueue.push({ queueName, job, timestamp: Date.now() })
        console.log(`[Queue] Enqueued job to in-memory queue:`, job.orderId)
        console.log(`[Queue] Total jobs in queue: ${this.inMemoryQueue.length}`)

        console.log(`[Queue] Auto-processing enabled, starting job...`)
        setImmediate(() => this.processNextJob())
      }
    } catch (error) {
      console.error("[Queue] Error enqueueing job:", error)
      this.inMemoryQueue.push({ queueName, job, timestamp: Date.now() })

      console.log(`[Queue] Auto-processing after error, starting job...`)
      setImmediate(() => this.processNextJob())
    }
  }

  async processNextJob() {
    if (this.isProcessing || this.inMemoryQueue.length === 0) {
      if (this.isProcessing) {
        console.log(`[Queue] Already processing a job, skipping...`)
      }
      return
    }

    this.isProcessing = true
    const item = this.inMemoryQueue.shift()

    try {
      console.log(`\n[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      console.log(`[Queue] 🔄 Processing job: ${item.job.orderId}`)
      console.log(`[Queue] 📊 Retry attempt: ${item.retries || 0}/3`)
      console.log(`[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)

      const hasESIMGo = !!process.env.ESIMGO_API_KEY
      const hasESIMAccess = !!(process.env.ESIMACCESS_ACCESS_CODE && process.env.ESIMACCESS_SECRET_KEY)

      console.log(`[Queue] Provider API keys status:`)
      console.log(`[Queue]   eSIM-Go: ${hasESIMGo ? "FOUND ✅" : "MISSING ❌"}`)
      console.log(`[Queue]   eSIM Access: ${hasESIMAccess ? "FOUND ✅" : "MISSING ❌"}`)

      if (!hasESIMGo && !hasESIMAccess) {
        console.error(`[Queue] ❌ No provider API keys found`)
        console.error(`[Queue] 📋 Add to .env.local:`)
        console.error(`[Queue]   ESIMGO_API_KEY=your_key`)
        console.error(`[Queue]   ESIMACCESS_ACCESS_CODE=your_code`)
        console.error(`[Queue]   ESIMACCESS_SECRET_KEY=your_secret`)
        throw new Error("Provider API keys not configured")
      }

      const { provisionWithFallback } = await import("./provider-manager.js")
      const { uploadQRCodeToCloudinary } = await import("./cloudinary.js")
      const { sendOrderConfirmationEmail } = await import("./notifications.js")
      const Order = (await import("./models/order.js")).default
      const Plan = (await import("./models/plan.js")).default
      const { connectDB } = await import("./db.js")

      await connectDB()

      const { orderId, planId } = item.job

      const order = await Order.findOne({ orderId })
      if (!order) {
        console.error("[Queue] ❌ Order not found:", orderId)
        this.isProcessing = false
        return
      }

      if (order.provisionStatus === "provisioned") {
        console.log("[Queue] ✅ Order already provisioned:", orderId)
        this.isProcessing = false
        return
      }

      order.provisionStatus = "processing"
      await order.save()
      console.log(`[Queue] ✅ Order status updated to "processing"`)

      const plan = await Plan.findById(planId)
      if (!plan) {
        throw new Error("Plan not found")
      }

      console.log("\n[Queue] 📋 Plan Details:")
      console.log("[Queue]   Name:", plan.name)
      console.log("[Queue]   Country:", plan.country)
      console.log("[Queue]   Data:", plan.dataGB, "GB")
      console.log("[Queue]   Validity:", plan.validityDays, "days")
      console.log("[Queue]   Primary Provider:", plan.supplierId)
      console.log("[Queue]   Provider Code:", plan.supplierCode)
      console.log("[Queue]   Fallback Provider:", plan.fallbackSupplierId || "none")
      console.log("\n[Queue] 💰 Pricing:")
      console.log("[Queue]   Retail Price:", plan.price, plan.currency)
      console.log("[Queue]   Cost Price:", plan.costPrice || "N/A", plan.currency)
      if (plan.costPrice) {
        const margin = (((plan.price - plan.costPrice) / plan.price) * 100).toFixed(2)
        const profit = (plan.price - plan.costPrice).toFixed(2)
        console.log("[Queue]   Profit:", profit, plan.currency)
        console.log("[Queue]   Margin:", margin + "%")
      }
      console.log("[Queue]   Custom Plan:", plan.isCustomPlan ? "Yes ✅" : "No (Provider synced)")

      const primaryProvider = plan.supplierId || "esimgo"
      const fallbackProvider = plan.fallbackSupplierId || (primaryProvider === "esimgo" ? "esimaccess" : "esimgo")

      console.log(`\n[Queue] 🎯 Using providers:`)
      console.log(`[Queue]   Primary: ${primaryProvider}`)
      console.log(`[Queue]   Fallback: ${fallbackProvider}`)

      order.supplierCode = plan.supplierCode || plan.bundleName

      const provisionResult = await provisionWithFallback(
        {
          orderId: order.orderId,
          supplierCode: order.supplierCode,
          bundleName: order.supplierCode,
          packageCode: order.supplierCode,
          plan: {
            supplierId: plan.supplierId,
            supplierCode: plan.supplierCode,
            bundleCode: plan.bundleName,
            country: plan.country,
            dataGB: plan.dataGB,
            validityDays: plan.validityDays,
          },
        },
        primaryProvider,
        fallbackProvider,
      )

      console.log(`\n[Queue] 📥 Provisioning Result:`)
      console.log(`[Queue]   Success: ${provisionResult.success ? "✅ YES" : "❌ NO"}`)
      console.log(`[Queue]   Provider Used: ${provisionResult.provider || "NONE"}`)
      console.log(`[Queue]   Used Fallback: ${provisionResult.usedFallback ? "Yes" : "No"}`)
      console.log(`[Queue]   Has QR Code: ${provisionResult.qrUrl ? "Yes ✅" : "No ❌"}`)
      console.log(`[Queue]   Has Activation: ${provisionResult.activationCode ? "Yes ✅" : "No ❌"}`)
      console.log(`[Queue]   ICCID: ${provisionResult.iccid || "N/A"}`)
      if (!provisionResult.success) {
        console.log(`[Queue]   Error: ${provisionResult.error}`)
      }

      if (!provisionResult.success) {
        throw new Error(provisionResult.error || "Provisioning failed")
      }

      let qrUrl = provisionResult.qrUrl
      if (provisionResult.qrImageBuffer && process.env.CLOUDINARY_CLOUD_NAME) {
        console.log(`[Queue] 📤 Uploading QR code to Cloudinary...`)
        qrUrl = await uploadQRCodeToCloudinary(provisionResult.qrImageBuffer, orderId)
        console.log(`[Queue] ✅ QR code uploaded`)
      }

      order.provisionStatus = "provisioned"
      order.status = "completed"
      order.supplierResponse = {
        ...provisionResult.rawResponse,
        provisionedAt: new Date(),
        supplierId: provisionResult.provider?.toUpperCase() || primaryProvider.toUpperCase(),
        usedFallback: provisionResult.usedFallback || false,
      }
      order.qrUrl = qrUrl
      order.activationCode = provisionResult.activationCode
      order.iccid = provisionResult.iccid
      await order.save()

      console.log(`\n[Queue] 📧 Sending order confirmation email...`)
      try {
        const emailResult = await sendOrderConfirmationEmail(order, qrUrl, provisionResult.activationCode)
        if (emailResult.success) {
          console.log(`[Queue] ✅ Email sent successfully via ${emailResult.provider}`)
        } else {
          console.error(`[Queue] ⚠️ Email failed: ${emailResult.error}`)
        }
      } catch (emailError) {
        console.error(`[Queue] ⚠️ Email error: ${emailError.message}`)
        // Don't fail the job if email fails
      }

      console.log("\n[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      console.log("[Queue] ✅ JOB COMPLETED SUCCESSFULLY!")
      console.log("[Queue] 📦 Order:", orderId)
      console.log("[Queue] 🏢 Provider:", provisionResult.provider)
      console.log("[Queue] 📱 ICCID:", provisionResult.iccid)
      console.log("[Queue] 🎨 QR Code:", qrUrl ? "Available" : "N/A")
      console.log("[Queue] 🔑 Activation:", provisionResult.activationCode ? "Available" : "N/A")
      console.log("[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    } catch (error) {
      console.log("\n[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      console.log("[Queue] ❌ JOB FAILED!")
      console.log("[Queue] Error:", error.message)
      console.log("[Queue] Stack:", error.stack)
      console.log("\n[Queue] 🔧 Troubleshooting:")
      console.log("[Queue]   1. Check account balance in provider dashboard")
      console.log("[Queue]   2. Verify provider code matches available packages")
      console.log("[Queue]   3. Confirm API credentials are correct")
      console.log("[Queue]   4. Review provider API response above")
      console.log("[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

      if (item.retries === undefined) {
        item.retries = 0
      }

      if (item.retries < 3) {
        item.retries++
        this.inMemoryQueue.push(item)
        console.log(`[Queue] 🔄 Retrying (${item.retries}/3) in 2 seconds`)
      } else {
        console.error("[Queue] ❌ Max retries reached")
        console.error("[Queue] 📋 Final troubleshooting steps:")
        console.error("[Queue]   - Check provider dashboards for account status")
        console.error("[Queue]   - Verify package/bundle codes exist")
        console.error("[Queue]   - Review API error responses above")
      }
    } finally {
      this.isProcessing = false

      if (this.inMemoryQueue.length > 0) {
        console.log(`[Queue] 📊 ${this.inMemoryQueue.length} job(s) remaining in queue\n`)
        setTimeout(() => this.processNextJob(), 2000)
      }
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
