const mongoose = require("mongoose");

const StoreAddress = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  accountbalance: {
    type: Number,
    default: 50,
  },
  dogsOwned: {
    type: Number,
    default: 0,
  },
  newBornDogs: {
    type: Number,
    default: 0,
  },
});

// UserSchma.virtual('createAt').get(function () {
//     this.name =
// })

module.exports = AddressStore = mongoose.model("StoreAddress", StoreAddress);
