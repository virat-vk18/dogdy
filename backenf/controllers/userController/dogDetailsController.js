var StudCreate = require("../../models/userModels/studCreationNft");
var StoreAddress = require("../../models/userModels/storeAddrress")
const dogSpecification = async (req, res) => {
  const { id } = req.body;
  try {
    const studDogs = await StudCreate.findOne({ _id: id });
    res.status(200).json({ message: "success", studDogs });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


module.exports = {
  dogSpecification,
};
