const mongoose = require("mongoose");

const CoptRightSchema = new mongoose.Schema(
  {
    CopyRight: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Copyright = mongoose.model("copyright", CoptRightSchema);

module.exports = Copyright;
