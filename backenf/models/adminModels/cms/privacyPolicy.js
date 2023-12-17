const mongoose = require("mongoose");

const privacyPolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "AboutUs",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const PrivacyPolicyCms = mongoose.model(
  "PrivacyPolicyCms",
  privacyPolicySchema
);

module.exports = PrivacyPolicyCms;
