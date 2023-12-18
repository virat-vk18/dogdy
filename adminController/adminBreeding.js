const { addMinutes } = require("date-fns");
const timerSchema = require("../../models/adminModels/Breeding/breedingModels");
const onBreeding = require("../../models/adminModels/Breeding/onBreedingModel");
const StoreAddress = require("../../models/userModels/storeAddrress");
const StudCreate = require("../../models/userModels/studCreationNft");
const OnBreeding = require("../../models/adminModels/Breeding/onBreedingModel");
const handleTimerForBreeding = async (req, res) => {
  const { time } = req.body;
  try {
    const exisistTimer = await timerSchema.find({});

    if (!(exisistTimer.length > 0)) {
      const aboutUpdateObj = {
        time: time,
      };
      const newTime = await timerSchema.create(aboutUpdateObj);
      return res
        .status(200)
        .json({ message: "Timer Updated SuccessFully", timer: newTime });
    }
    await timerSchema.updateOne(
      { _id: exisistTimer[0]._id },
      { $set: { time: time } }
    );
    const timeUpdated = await timerSchema.findOne({ _id: exisistTimer[0]._id });
    res.status(200).json({
      message: "Breeding Timer Updated Successfully",
      timer: timeUpdated,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getTime = async (req, res) => {
  try {
    const findTime = await timerSchema.find({});
    const getTimer = await timerSchema.findOne({ _id: findTime[0]._id });
    res.status(200).json({ message: "Fetched Successfully", getTimer });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const waitForBreed = async (req, res) => {
  const { maleDogId, femaleDogId, maleDogOwnerId, femaleDogOwnerId } = req.body;
  try {
    // Admin TImer Collection

    const findTime = await timerSchema.find({});
    const getTimer = await timerSchema.findOne({ _id: findTime[0]._id });
    const findFemaleDogOwner = await StoreAddress.findOne({
      _id: femaleDogOwnerId,
    });
    const findMaleDogBreedFee = await StudCreate.findOne({ _id: maleDogId });
    if (findFemaleDogOwner.accountbalance < findMaleDogBreedFee.breedfee) {
      return res.status(409).json({ message: "inSufficient Balance" });
    }
    const findAlredyBreed = await onBreeding.findOne({
      maleDogId,
      femaleDogId,
      breedingMaleOwnedBy: maleDogOwnerId,
      breedingFemaleOwnedBy: femaleDogOwnerId,
    });
    if (findAlredyBreed) {
      return res.status(409).json({ message: "Already on Breeding" });
    } else {
      //Converting An  Admin Minutes number into TimeStamp
      const timeNumber = Number(getTimer.time);
      const currentTime = new Date();
      const thirtyMinutesFromNow = addMinutes(currentTime, timeNumber);
      const setOwnerForBreed = new onBreeding({
        breedingMaleOwnedBy: maleDogOwnerId,
        breedingFemaleOwnedBy: femaleDogOwnerId,
        maleDogId,
        femaleDogId,
        createdAt: currentTime,
        expiresIn: thirtyMinutesFromNow,
      });
      const newBreed = await setOwnerForBreed.save();
      res
        .status(200)
        .json({ message: "Breeding Has Started", setOwnerForBreed });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTimerForBreed = async (req, res) => {
  const { id } = req.body;
  try {
    const findTimer = await OnBreeding.findOne({ _id: id });
    res.status(200).json({ message: "success", findTimer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const completedBreed = async (req, res) => {
  const { id } = req.body;

  try {
    //Find Female DOg Owner
    const findTimer = await OnBreeding.findOne({ _id: id });
    const findFemaleDogOwner = await StoreAddress({
      _id: findTimer.breedingFemaleOwnedBy,
    });
    const findBreedFeeForMaleDog = await StudCreate.findOne({
      _id: findTimer.maleDogId,
    });
    const decrementBalanceFromFemaleDogOwner = await StoreAddress.updateOne(
      { _id: findTimer.breedingFemaleOwnedBy },
      {
        $inc: {
          accountbalance: -findBreedFeeForMaleDog.breedfee,
          newBornDogs: +1,
        },
      }
    );

    const incrementBalanceForMaleDogOwner = await StoreAddress.updateOne(
      {
        _id: findTimer.breedingMaleOwnedBy,
      },
      {
        $inc: {
          accountbalance: +findBreedFeeForMaleDog.breedfee,
        },
      }
    );
    const deleteBreeds = await OnBreeding.deleteOne({ _id: findTimer._id });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  handleTimerForBreeding,
  waitForBreed,
  getTimerForBreed,
  completedBreed,
};
