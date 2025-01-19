import mongoose from 'mongoose';

const IpoSchema = new mongoose.Schema({
  IPOName: { type: String, required: true },
  IPOType: { type: String, enum: ["IPO", "SME-IPO"], required: true },
  symbol: { type: String, required: true },
  issuePeriod: { type: String, required: true },
  cutOffTimeForUPIMandateConfirmation: { type: String, required: true },
  issueSize: { type: String, required: true },
  issueType: { type: String, required: true },
  priceRange: { type: String, required: true },
  faceValue: { type: String, required: true },
  tickSize: { type: String, required: true },
  bidLot: { type: String, required: true },
  minimumOrderQuantity: { type: String, required: true },
  maximumSubscriptionAmountForRetailInvestor: { type: String, required: true },
  maximumBidQuantityForQIBInvestors: { type: String, required: true },
  maximumBidQuantityForNIBInvestors: { type: String, required: true },
  ipoMarketTimings: { type: String, required: true },
  bookRunningLeadManagers: { type: String, required: true },
  sponsorBank: { type: String, required: true },
  categories: { type: String, required: true },
  subCategoriesApplicableForUPI: { type: String, required: true },
  nameOfRegistrar: { type: String, required: true },
  addressOfRegistrar: { type: String, required: true },
  contactPersonNameNumberAndEmailId: { type: String, required: true },
  eFormLink: { type: String, required: true },
  branchesOfSCSBs: { type: String, required: true },
  redHerringProspectus: { type: String, required: true },
  ratiosBasisOfIssuePrice: { type: String, required: true },
  sampleApplicationForms: { type: String, required: true },
  securityParameters: { type: String, required: true },
  securityParametersPostAnchor: { type: String, required: true },
  anchorAllocationReport: { type: String, required: true },
  processingOfASBAApplications: { type: String, required: true },
  remark: { type: String, required: true },
  listOfMobileApplicationsAcceptingUPI: { type: String, required: true },
  videoLinkForUPIBasedASBAProcess: { type: String, required: true },
  videoLinkForBHIMUPIRegistration: { type: String, required: true },
  listingGain: { type: Number, default: null }, // Optional field, default to null
  createdAt: { type: Date, default: Date.now } // New field added
});

export default mongoose.models.Ipo || mongoose.model('Ipo', IpoSchema);
