const express = require("express");
const router = express.Router();
const jwt = require("../../middleware/verifyJwt");
// dogDetailsController
const dogDetailsController = require("../../controllers/userController/dogDetailsController");

// marketPlaceController
const marketPlaceController = require("../../controllers/userController/marketPlaceController");

// nftCreationController

const nftCreationController = require("../../controllers/userController/nftCreationController");

// studFarmController;

const studFarmController = require("../../controllers/userController/studFarmController");

//Connect JWT Controller
const connectWallet = require("../../controllers/userController/walletConnectController");

//Faq Controller
const faqController = require("../../controllers/userController/faqUserController");

// Routers

// dogsDetials

router.post(
  "/dogdetails",
  jwt.verifyJWT,
  dogDetailsController.dogSpecification
);
// router.post("/dogdetails/findaddress",dogDetailsController.findOwner);

// dogsDetials end

// marketPlaceController

router.post("/selldogs/", marketPlaceController.allSellDogs);
router.post("/selldogs/sellget", marketPlaceController.sellGet);
router.post("/selldogs/nftbuy", marketPlaceController.nftBuyer);

router.get("/selldogs/stable", marketPlaceController.stable);
router.post(
  "/selldogs/dogspecification",

  marketPlaceController.dogSpecification
);
router.get(
  "/selldogs/femaledog",

  marketPlaceController.getFemaleDogs
);
router.post(
  "/selldogs/breedfemale",

  marketPlaceController.getFemaleDogs
);
router.post(
  "/selldogs/breedfemale",

  marketPlaceController.getFemaleDogs
);
router.post(
  "/selldogs/uniquefemale",

  marketPlaceController.uniqueFemaleDogs
);
router.post(
  "/selldogs/expiry",

  marketPlaceController.expiryDogs
);

// marketPlaceController end
//wallet Connect Controller
router.post("/connectJwt/wallet", connectWallet.walletConnect);
// nftCreationController

router.post(
  "/createnft/sellcreation",

  nftCreationController.sellCreation
);
router.post(
  "/createnft/studcreation",

  nftCreationController.studCreation
);
router.get(
  "/createnft/marketplace",

  nftCreationController.getSellCreation
);

// nftCreationController end

// studFarmController

router.get("/studfarm", studFarmController.allStudDogs);
router.get("/studfarm/studget", studFarmController.studGet);

// studFarmController end

//Breeding Route
router.post(
  "/breeding/onbreeding",

  studFarmController.onBreeding
);

//Faq Route
router.post("/faq/getData", faqController.faqFetchingData);
module.exports = router;
