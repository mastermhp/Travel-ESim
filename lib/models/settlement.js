import mongoose from "mongoose"

const settlementSchema = new mongoose.Schema(
  {
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["requested", "approved", "processing", "completed", "rejected"],
      default: "requested",
      index: true,
    },
    method: { type: String, enum: ["bank_transfer", "stripe", "crypto", "mobile_money"], default: "bank_transfer" },
    paymentDetails: {
      bankName: String,
      accountNumber: String,
      accountName: String,
      swiftCode: String,
      iban: String,
      cryptoAddress: String,
      mobileNumber: String,
    },
    notes: String,
    adminNotes: String,
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    processedAt: Date,
    rejectedReason: String,
  },
  { timestamps: true },
)

settlementSchema.index({ status: 1, createdAt: -1 })

if (mongoose.models.Settlement) {
  delete mongoose.models.Settlement
}

export const Settlement = mongoose.model("Settlement", settlementSchema)
export default Settlement
