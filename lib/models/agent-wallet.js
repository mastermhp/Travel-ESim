import mongoose from "mongoose"

const agentWalletSchema = new mongoose.Schema(
  {
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true, unique: true, index: true },
    balance: { type: Number, default: 0, min: 0 },
    reserved: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "USD" },
    totalEarned: { type: Number, default: 0 },
    totalWithdrawn: { type: Number, default: 0 },
  },
  { timestamps: true },
)

if (mongoose.models.AgentWallet) {
  delete mongoose.models.AgentWallet
}

export const AgentWallet = mongoose.model("AgentWallet", agentWalletSchema)
export default AgentWallet
