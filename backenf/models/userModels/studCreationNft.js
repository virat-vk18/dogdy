const mongoose = require("mongoose");

const StudCreate = new mongoose.Schema(
  {
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
    studfarmdays: {
      type: Date,
      required: true,
    },
    breedfee: {
      type: Number,
      required: true,
    },
    ownedby: {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = NftStudCreation = mongoose.model("StudCreate", StudCreate);
