const mongoose = require("mongoose");

const termsAndCondtions = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Terms & Conditions",
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
const TermsAndConditionsCms = mongoose.model(
  "cmsTermsAndCondition",
  termsAndCondtions
);

module.exports = TermsAndConditionsCms;
