import mongoose from 'mongoose';

const IpoSchema = new mongoose.Schema({
  IPOName: { type: String, required: true },
  logoBase64: { type: String, required: true }, // Changed from logoURL to logoBase64
  ipoDate: { type: String, required: true },
  listingDate: { type: String, required: true },
  priceRange: { type: String, required: true },
  lotSize: { type: String, required: true },
  ipoType: { type: String, enum: ["IPO", "SME-IPO"], required: true },
  issueSize: { type: String, required: true },
  prospectusLink: { type: String, required: true },
  ipoSchedule: {
    type: Object,
    required: true,
  },
  ipoDescription: { type: String, required: true },
  issueSizeDetails: {
    type: Object,
    required: true,
  },
  strengths: { type: [String], required: true },
  risks: { type: [String], required: true },
  allotmentLink: { type: String, default: null  },
  financialData: {
    labels: { type: [String], required: true },
    TotalAssets: { type: [Number], required: true },
    Revenue: { type: [Number], required: true },
    ProfitAfterTax: { type: [Number], required: true },
  },
  IPOLink: { type: String, required: true },
  listingGain: { type: Number, default: null }, // Optional field, default to null
  createdAt: { type: Date, default: Date.now } // Timestamp field
});

export default mongoose.models.Ipo || mongoose.model('Ipo', IpoSchema);