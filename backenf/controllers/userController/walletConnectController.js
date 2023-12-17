const jwt = require("jsonwebtoken");
require("dotenv").config();

const AddressStore = require("../../models/userModels/storeAddrress");

const walletConnect = async (req, res) => {
  const { address } = req.body;
  try {
    const exisistingAddress = await AddressStore.findOne({
      address: address,
    });
    if (exisistingAddress) {
      const accessToken = jwt.sign(
        {
          address: exisistingAddress.address,
        },
        // process.env.ACCESS_TOKEN_SECRET,
        "Secret Key",
        { expiresIn: "1min" }
      );

      const id = exisistingAddress._id;

      res.status(200).json({ message: "Created Token", accessToken, id });
      return;
    }
    const newAddress = new AddressStore({
      address: address,
    });
    await newAddress.save();
    const accessToken = jwt.sign(
      {
        address: address,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const id = newAddress._id;

    res
      .status(200)
      .json({ message: "Adress Saved Sucessfully", accessToken, id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { walletConnect };
