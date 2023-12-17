var SellCreate = require("../../models/userModels/sellCreationNft");
var StudCreate = require("../../models/userModels/studCreationNft");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storeAddrress = require("../../models/userModels/storeAddrress");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).single("nftImage");

const sellCreation = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Image upload failed", error: err });
    }
    try {
      // console.log(req.body);
      const {
        nftImage,
        nftName,
        age,
        gender,
        feeding,
        physicalcondition,
        intelligence,
        stregenth,
        speed,
        agility,
        description,
        happiness,
        sellprice,
        ownedby,
        typeofsale,
      } = req.body;

      console.log(req.body);

      const sameNftName = await SellCreate.findOne({ nftName: nftName });

      if (sameNftName) {
        return res.status(400).json({
          message: "Nft Already Exisist",
        });
      }
      const newNft = new SellCreate({
        nftImage: path.join("uploads/", req.file.filename),
        nftName,
        age,
        gender,
        feeding,
        physicalcondition,
        intelligence,
        stregenth,
        speed,
        agility,
        description,
        happiness,
        sellprice,
        typeofsale,
        ownedby,
      });

      await newNft.save();
      const findOwnedBy = await storeAddrress.updateOne(
        { _id: ownedby },
        {
          $inc: {
            dogsOwned: +1,
          },
        }
      );
      res.status(201).json({ message: "New Nft registered successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Registration failed", error: error.message });
    }
  });
};
const getSellCreation = async (req, res) => {
  try {
    await SellCreate.find({})
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const studCreation = async (req, res) => {
  console.log(req.body);
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Image upload failed", error: err });
    }
    try {
      // console.log(req.body);
      const {
        nftImage,
        nftName,
        age,
        gender,
        feeding,
        physicalcondition,
        intelligence,
        stregenth,
        speed,
        agility,
        description,
        happiness,
        studfarmdays,
        breedfee,
        ownedby,
      } = req.body;
      const sameNftName = await StudCreate.findOne({ nftName: nftName });

      if (sameNftName) {
        return res.status(400).json({
          message: "Nft Already Exisist",
        });
      }
      const newNft = new StudCreate({
        nftImage: path.join("uploads/", req.file.filename),
        nftName,
        age,
        gender,
        feeding,
        physicalcondition,
        intelligence,
        stregenth,
        speed,
        agility,
        description,
        happiness,
        studfarmdays,
        breedfee,
        ownedby,
      });

      newNft
        .save()
        .then((data) => {
          storeAddrress
            .updateOne(
              { _id: ownedby },
              {
                $inc: {
                  dogsOwned: 1,
                },
              }
            )
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
          res.status(201).json({
            message: "New Nft registered successfully",
            data,
          });
        })
        .catch((err) => res.status(404).json({ message: err.message }));
      // const daysInFarm =
    } catch (error) {
      res
        .status(400)
        .json({ message: "Registration failed", error: error.message });
    }
  });
  // try {
  //   const { gender, nftName, description, speed, happiness, nftImage } =
  //     req.body;

  //   const DogNft = new NftCreate({
  //     gender,
  //     nftName,
  //     description,
  //     speed,
  //     happiness,
  //     nftImage: path.join(
  //       __dirname,
  //       "..",
  //       "public",
  //       "images",
  //       req.file.filename
  //     ),
  //   });

  //   await DogNft.save()
  //     .res.status(201)
  //     .json({ message: "User registered successfully" });
  // } catch (error) {
  //   res
  //     .status(400)
  //     .json({ message: "Registration failed", error: error.message });
  // }
};
// const get = async (req, res) => {
//   try {
//     await NftCreate.find({})
//       .then((data) => res.json({ data }))
//       .catch((err) => res.json(err));
//   } catch (error) {
//     console.log(error);
//   }
// };
// const studDataget = async (req, res) => {
//   try {
//     await StudCreate.find({})
//       .then((data) => res.json({ data }))
//       .catch((err) => res.json(err));
//   } catch (error) {
//     console.log(error);
//   }
// };
module.exports = {
  sellCreation,
  getSellCreation,
  studCreation,
  // studDataget,
};
