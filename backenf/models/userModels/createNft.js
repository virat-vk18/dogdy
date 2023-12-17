const mongoose = require("mongoose");

const CreateNft = new mongoose.Schema({
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
    type: String,
  },
  startprice: {
    type: String,
  },
  auctionend: {
    type: String,
  },
  daystud: {
    type: String,
  },
});

// UserSchma.virtual('createAt').get(function () {
//     this.name =
// })

module.exports = NftCreate = mongoose.model("NewNft", CreateNft);
