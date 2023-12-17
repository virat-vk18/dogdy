const mongoose = require("mongoose");

const NftBuyer = new mongoose.Schema(
  {
    nftBuyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    nftId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    nftname: {
      type: String,
      required: true,
    },
    nftage: {
      type: String,
      required: true,
    },
    nftgender: {
      type: String,
      required: true,
    },
    sellprice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchma.virtual('createAt').get(function () {
//     this.name =
// })

module.exports = BuyerNft = mongoose.model("NftBuyer", NftBuyer);
