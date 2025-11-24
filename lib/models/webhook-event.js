import mongoose from "mongoose"

const webhookEventSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, enum: ["stripe", "paypal", "flutterwave"], index: true },
    eventId: { type: String, required: true, unique: true, index: true },
    eventType: { type: String, required: true },
    payload: { type: mongoose.Schema.Types.Mixed, required: true },
    processed: { type: Boolean, default: false, index: true },
    processedAt: { type: Date },
    error: { type: String },
    retryCount: { type: Number, default: 0 },
  },
  { timestamps: true },
)

webhookEventSchema.index({ source: 1, processed: 1 })
webhookEventSchema.index({ createdAt: -1 })

export default mongoose.models.WebhookEvent || mongoose.model("WebhookEvent", webhookEventSchema)
