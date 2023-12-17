const StudCreate = require("../../models/userModels/studCreationNft");
const ExpiredDogs = require("../../models/userModels/expiredDogs");
var moment = require("moment");
const allStudDogs = async (req, res) => {
  try {
    const allDogs = await StudCreate.find({});
    let arr = [];

    allDogs.length > 0
      ? allDogs.map(async (item) => {
          try {
            const studDays = item.studfarmdays;
            const createDay = item.createdAt;
            var exp = moment(new Date(studDays)).from(new Date(createDay));
            const sliced = exp.endsWith("days ago");
            const slicedday = exp.endsWith("day ago");
            if (sliced || slicedday) {
              arr.push(item._id);
              // const findItem = await StudCreate.find({ _id: item._id });
            }
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        })
      : "";
    arr.length > 0
      ? arr.forEach(async (item) => {
          try {
            // Finding An Item For Changing Into Expired Collection
            const findExpiredDogs = await StudCreate.findOne({ _id: item._id });
            const createExpiredDogs = new ExpiredDogs({
              nftImage: findExpiredDogs.nftImage,
              nftName: findExpiredDogs.nftName,
              age: findExpiredDogs.age,
              agility: findExpiredDogs.agility,
              feeding: findExpiredDogs.feeding,
              description: findExpiredDogs.description,
              gender: findExpiredDogs.gender,
              happiness: findExpiredDogs.happiness,
              intelligence: findExpiredDogs.intelligence,
              ownedby: findExpiredDogs.ownedby,
              physicalcondition: findExpiredDogs.physicalcondition,
              speed: findExpiredDogs.speed,
              stregenth: findExpiredDogs.stregenth,
              sellprice: findExpiredDogs.sellprice,
            });
            await createExpiredDogs.save();
            const deleteItemFromStud = await StudCreate.deleteOne({
              _id: findExpiredDogs._id,
            });
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        })
      : "";

    res.status(200).json({ message: "Success", allDogs });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const studGet = async (req, res) => {
  const { id } = req.query;
  try {
    const singleDog = await StudCreate.findOne({ _id: id });
    res.status(200).json({ message: "success", singleDog });
    // .then((data) => res.status(200).json(data))
    // .catch((err) => res.status(404).json(err));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const onBreeding = async (req, res) => {
  // const { id } = req.query;
  console.log(req.body);
  setTimeout(function () {
    // Call your function here
  }, 30 * 60 * 1000);
  // try {
  //   const singleDog = await StudCreate.findOne({ _id: id });
  //   res.status(200).json({ message: "success", singleDog });
  // .then((data) => res.status(200).json(data))
  // .catch((err) => res.status(404).json(err));
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

module.exports = {
  studGet,
  allStudDogs,
  onBreeding,
};
