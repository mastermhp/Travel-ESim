import mongoose from "mongoose"

const agentApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    country: { type: String, required: true, index: true },
    city: { type: String, required: true },
    businessType: { type: String, required: true },
    experience: { type: String },
    whyJoin: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    reviewedBy: { type: String },
    reviewNotes: { type: String },
    // Approval details
    commissionRate: { type: Number },
    currency: { type: String },
    agentId: { type: String }, // Reference to created Agent after approval
  },
  { timestamps: true },
)

if (mongoose.models.AgentApplication) {
  delete mongoose.models.AgentApplication
}

export const AgentApplication = mongoose.model("AgentApplication", agentApplicationSchema, "agentApplications")
export default AgentApplication
