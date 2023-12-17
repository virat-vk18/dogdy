var SellCreate = require("../../models/userModels/sellCreationNft");
var StudCreate = require("../../models/userModels/studCreationNft");
const StoreAddress = require("../../models/userModels/storeAddrress");
const ExpiredDogs = require("../../models/userModels/expiredDogs");
var NftBuyer = require("../../models/userModels/buyNftModel");
var NftSeller = require("../../models/userModels/SellerNftModels");
const allSellDogs = async (req, res) => {
  try {
    await SellCreate.find({ typeofsale: "Sell Creation" })
      .then((data) => res.status(200).json({ message: "success", data }))
      .catch((err) => res.status(404).json({ message: err.message }));
  } catch (err) {
    console.log(err.message);
  }
};
const sellGet = async (req, res) => {
  const { id } = req.body;
  try {
    await SellCreate.findOne({ _id: id })
      .then((sellDog) =>
        res.status(200).json({
          message: "success",
          getData: sellDog === null ? [] : [sellDog],
        })
      )
      .catch((err) => res.status(404).json({ message: err.message }));
  } catch (err) {
    console.log(err.message);
  }
};
const nftBuyer = async (req, res) => {
  const { nftBuyer, nftId, nftname, nftage, nftgender, sellprice } = req.body;

  try {
    const findNftBuyer = await StoreAddress.findOne({ _id: nftBuyer });
    const findNftFee = await SellCreate.findOne({ _id: nftId });
    if (findNftBuyer.accountbalance < findNftFee.sellprice) {
      return res.status(409).json({ message: "InSufficient Balance" });
    }
    const reduceBalanceForBuyer = await StoreAddress.findByIdAndUpdate(
      { _id: nftBuyer },
      {
        $inc: {
          accountbalance: -sellprice,
        },
      }
    );
    const findSeller = await SellCreate.findOne({ _id: nftId });
    const increaseBalanceForSeller = await StoreAddress.findByIdAndUpdate(
      { _id: findSeller.ownedby },
      {
        $inc: {
          accountbalance: sellprice,
        },
      }
    );
    console.log(increaseBalanceForSeller);
    const changeOwnedBy = await SellCreate.findByIdAndUpdate(
      { _id: nftId },
      {
        $set: {
          ownedby: nftBuyer,
        },
      }
    );

    const createNftBuyer = new NftBuyer({
      nftBuyer,
      nftId,
      nftname,
      nftage,
      nftgender,
      sellprice,
    });
    const createNftSeller = new NftSeller({
      nftBuyer,
      NftSeller: findSeller.ownedby,
      nftId,
      nftname,
      nftage,
      nftgender,
      sellprice,
    });
    await createNftBuyer.save();
    res.status(201).json({
      message: "Success",
      reduceBalanceForBuyer,
      changeOwnedBy,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const stable = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const sellDogs = await SellCreate.find({ ownedby: id });
    const studDogs = await StudCreate.find({ ownedby: id });
    res.status(200).json({ message: "success", sellDogs, studDogs });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getFemaleDogs = async (req, res) => {
  try {
    const femaleDogs = await SellCreate.find({ typeofsale: "Breed Creation" });
    res.status(200).json({ message: "success", femaleDogs });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const dogSpecification = async (req, res) => {
  console.log(req.body);

  try {
    const sellDogs = await SellCreate.find({ ownedby: id });
    const studDogs = await StudCreate.find({ ownedby: id });
    res.status(200).json({ message: "success", sellDogs, studDogs });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const uniqueFemaleDogs = async (req, res) => {
  try {
    const { id } = req.body;
    const femaleDogs = await SellCreate.findOne({ _id: id });
    res.status(200).json({ message: "success", femaleDogs });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const expiryDogs = async (req, res) => {
  const { id } = req.body;
  try {
    const getData = await StudCreate.findOne({ _id: id });
    console.log(getData.nftImage, "nft");
    const ownerDog = new ExpiredDogs({
      nftImage: getData.nftImage,
      nftName: getData.nftName,
      age: getData.age,
      gender: getData.gender,
      feeding: getData.feeding,
      physicalcondition: getData.physicalcondition,
      intelligence: getData.intelligence,
      stregenth: getData.stregenth,
      speed: getData.speed,
      agility: getData.agility,
      description: getData.description,
      happiness: getData.happiness,

      ownedby: getData.ownedby,
    });
    await ownerDog.save();
    const response = await StudCreate.deleteOne({ _id: id });
    res.status(200).json({ message: "Expired Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  allSellDogs,
  sellGet,
  stable,
  getFemaleDogs,
  dogSpecification,
  uniqueFemaleDogs,
  nftBuyer,
  expiryDogs,
};
