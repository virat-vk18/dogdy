const mongoose = require("mongoose");

const ExpiredDogs = new mongoose.Schema({
  nftImage: {
    type: String,
  },
  nftName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  feeding: {
    type: String,
    required: true,
  },
  physicalcondition: {
    type: String,
    required: true,
  },
  intelligence: {
    type: String,
    required: true,
  },
  stregenth: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  agility: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  happiness: {
    type: String,
    required: true,
  },

  sellprice: {
    type: Number,
    // required: true,
  },

  ownedby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = DogsExpire = mongoose.model("ExpiredDogs", ExpiredDogs);
