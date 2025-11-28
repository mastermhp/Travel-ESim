import mongoose from "mongoose"

const commissionSchema = new mongoose.Schema(
  {
    commissionId: { type: String, required: true, unique: true, index: true },
    agentId: { type: String, required: true, index: true },
    orderId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    planId: { type: String, required: true },
    orderAmount: { type: Number, required: true },
    commissionRate: { type: Number, required: true },
    commissionAmount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["pending", "earned", "paid", "cancelled"],
      default: "pending",
      index: true,
    },
    paidAt: { type: Date },
    payoutId: { type: String },
  },
  { timestamps: true },
)

commissionSchema.index({ agentId: 1, status: 1, createdAt: -1 })
commissionSchema.index({ status: 1, createdAt: -1 })

export default mongoose.models.Commission || mongoose.model("Commission", commissionSchema)
