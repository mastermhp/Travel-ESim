import mongoose from "mongoose"

if (mongoose.models.Order) {
  delete mongoose.models.Order
  delete mongoose.connection.models.Order
}

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    clientRequestId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    userEmail: { type: String, required: true },
    planId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    paymentMethod: { type: String, enum: ["card", "mobile_money", "agent_cash", "agent_remote"], default: "card" },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed", "refunded"],
      default: "unpaid",
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "provisioning", "completed", "failed", "cancelled"],
      default: "pending",
      index: true,
    },
    provisionStatus: {
      type: String,
      enum: ["pending", "processing", "provisioned", "failed"],
      default: "pending",
      index: true,
    },
    supplierId: { type: String },
    supplierCode: { type: String },
    fallbackSupplierId: { type: String },
    lastError: { type: String },
    supplierResponse: { type: mongoose.Schema.Types.Mixed },
    qrUrl: { type: String },
    activationCode: { type: String },
    iccid: { type: String },
    stripePaymentIntentId: { type: String },
    stripePaymentIntentClientSecret: { type: String },
    purchaseSource: { type: String, enum: ["web", "mobile", "agent"], default: "web" },
    agentId: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
)

orderSchema.index({ userId: 1, createdAt: -1 })
orderSchema.index({ status: 1, createdAt: -1 })
orderSchema.index({ stripePaymentIntentId: 1 })

export default mongoose.model("Order", orderSchema)
