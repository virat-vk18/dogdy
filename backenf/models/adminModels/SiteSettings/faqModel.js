const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    questions: {
      type: String,
      required: true,
    },
    answers: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const faqUpdates = mongoose.model("faqUpdates", faqSchema);

module.exports = faqUpdates;
