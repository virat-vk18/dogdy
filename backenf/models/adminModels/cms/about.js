const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
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
const AboutUsCms = mongoose.model("CmsAboutUs", AboutUsSchema);

module.exports = AboutUsCms;
