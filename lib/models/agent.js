import mongoose from "mongoose"

const agentSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true },
    agentId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true, index: true },
    countryCode: { type: String, required: true },
    city: { type: String, required: true },
    businessType: { type: String, required: true },
    experience: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
      index: true,
    },
    commissionRate: { type: Number, default: 15, min: 0, max: 100 },
    tier: { type: String, enum: ["bronze", "silver", "gold", "platinum"], default: "bronze" },
    totalSales: { type: Number, default: 0 },
    referralCode: { type: String, unique: true, index: true },
    payoutDetails: {
      method: { type: String, enum: ["bank_transfer", "mobile_money", "stripe", "crypto"], default: "bank_transfer" },
      bankName: String,
      accountNumber: String,
      accountName: String,
      swiftCode: String,
      iban: String,
      mobileMoneyProvider: String,
      mobileMoneyNumber: String,
      cryptoAddress: String,
      cryptoCurrency: String,
    },
    approvedBy: { type: String },
    approvedAt: { type: Date },
    rejectedReason: String,
    rejectedAt: Date,
  },
  { timestamps: true },
)

agentSchema.index({ country: 1, status: 1 })
agentSchema.index({ tier: 1, status: 1 })

if (mongoose.models.Agent) {
  delete mongoose.models.Agent
}

export const Agent = mongoose.model("Agent", agentSchema)
export default Agent
