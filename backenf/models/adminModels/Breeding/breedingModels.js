const mongoose = require("mongoose");

const Breedingtime = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    expireAfterSeconds: 1800, // 30 minutes
  }
);

// UserSchma.virtual('createAt').get(function () {
//     this.name =
// })

const breedTime = mongoose.model("breedTime", Breedingtime);
module.exports = breedTime;
