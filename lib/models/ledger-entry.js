import mongoose from "mongoose"

const ledgerEntrySchema = new mongoose.Schema(
  {
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true, index: true },
    type: {
      type: String,
      enum: ["commission", "debit", "refund", "withdrawal", "adjustment"],
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    meta: {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      payoutId: { type: mongoose.Schema.Types.ObjectId, ref: "Payout" },
      description: String,
    },
  },
  { timestamps: true },
)

ledgerEntrySchema.index({ agentId: 1, createdAt: -1 })

if (mongoose.models.LedgerEntry) {
  delete mongoose.models.LedgerEntry
}

export const LedgerEntry = mongoose.model("LedgerEntry", ledgerEntrySchema)
export default LedgerEntry
