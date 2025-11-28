import mongoose from "mongoose"

const agentOrderSchema = new mongoose.Schema(
  {
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true, index: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, index: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
    type: { type: String, enum: ["cash", "remote"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending", index: true },
    commissionAmount: { type: Number, required: true },
    commissionStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    planPrice: { type: Number, required: true },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true },
)

agentOrderSchema.index({ agentId: 1, createdAt: -1 })
agentOrderSchema.index({ paymentStatus: 1, commissionStatus: 1 })

if (mongoose.models.AgentOrder) {
  delete mongoose.models.AgentOrder
}

export const AgentOrder = mongoose.model("AgentOrder", agentOrderSchema)
export default AgentOrder
