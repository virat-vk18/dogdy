const mongoose = require("mongoose");

const CurrentBreed = new mongoose.Schema({
  breedingMaleOwnedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  breedingFemaleOwnedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  maleDogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  femaleDogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  expiresIn: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const OnBreeding = mongoose.model("CurrentBreed", CurrentBreed);
module.exports = OnBreeding;
