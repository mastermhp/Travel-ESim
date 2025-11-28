import mongoose from "mongoose"

const payoutSchema = new mongoose.Schema(
  {
    payoutId: { type: String, required: true, unique: true, index: true },
    agentId: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    method: { type: String, enum: ["bank", "mobile_money", "crypto"], required: true },
    status: {
      type: String,
      enum: ["requested", "processing", "completed", "failed", "cancelled"],
      default: "requested",
      index: true,
    },
    requestedAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
    processedBy: { type: String },
    transactionReference: { type: String },
    notes: { type: String },
    paymentDetails: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
)

payoutSchema.index({ agentId: 1, status: 1, createdAt: -1 })
payoutSchema.index({ status: 1, createdAt: -1 })

export default mongoose.models.Payout || mongoose.model("Payout", payoutSchema)
