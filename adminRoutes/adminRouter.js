var express = require("express");
var router = express.Router();
const { verifyJWT } = require("../../middleware/verifyJwt");

//Admin Login Router
const adminLoginController = require("../../controllers/adminController/loginAdminController");

//Admin Two Factor Controller
const adminTwoFaController = require("../../controllers/adminController/adminTwoFaAuthController");

//Admin Change Password Controller
const adminchangepassword = require("../../controllers/adminController/adminChangePasswordController");
//Admin Forgot Pattern Controller
const adminForgotPatternController = require("../../controllers/adminController/adminForgotPatternController");
//Admin Change Pattern Controller
const adminChangePatternController = require("../../controllers/adminController/adminChangePatternController");
//CMS Controller
const cmsController = require("../../controllers/adminController/adminCmsController");
//Social Media Controller
const socialMediaController = require("../../controllers/adminController/adminSiteSettingsController");
//ADMIN NFT BUYERS LIST
const nftBuyersController = require("../../controllers/adminController/nftBuyersList")
//Admin Login Route
router.post("/adminlogin", adminLoginController.handleAdminLoginVerify);
//Admin Timer Route
const adminBreedingController = require("../../controllers/adminController/adminBreeding");
// FAQ ROUTER
const faqController = require("../../controllers/adminController/faqController");

const getUserList = require("../../controllers/adminController/adminUserList")
//Two Factor Routes
router.post(
  "/admin2fa/login/twoFactorGetCode",
  adminTwoFaController.generateTwoFactorCode
);
router.post(
  "/admin2fa/login/twoFactorVerify",
  adminTwoFaController.loginTwoFactorVerify
);
router.post(
  "/admin2fa/login/disableTwoFactor",
  adminTwoFaController.disableTwoFactorAuthentication
);
//admin Change Password Router
router.post("/changepassword", adminchangepassword.adminpasswordchange);

//getUser List For Admin
router.get("/userlist/users", getUserList.userList);
//Nft Buyer List
router.get("/nftbuyers/buyerslist", nftBuyersController.getNftBuyersList);

//Admin Forgot Pattern Route
router.post(
  "/adminforgot/verifyemail",
  adminForgotPatternController.AdminVerifyEmail
);
router.post(
  "/adminforgot/loginTwoFactorVerify",
  adminForgotPatternController.twofaforgotpattern
);
router.post(
  "/adminforgot/forgotpattern",
  adminForgotPatternController.forgotPattern
);
router.post(
  "/adminforgot/verifyemailforgotpassword",
  adminForgotPatternController.verifyEmailForgotPassword
);
router.post(
  "/adminforgot/setNewPassword",
  adminForgotPatternController.setNewPassword
);
//Admin Change Pattern Route
router.post(
  "/changepattern/verifyoldpattern",
  adminChangePatternController.oldPatternVerify
);

//CMS Router
router.get("/cmsUpdate/aboutUsGetData", cmsController.getAboutUsData);

router.post("/cmsUpdate/aboutUsUpdate", cmsController.handleUpdateAboutUs);

router.get(
  "/cmsUpdate/termsAndConditionsGetData",
  cmsController.getTermsAndConditionsData
);

router.post(
  "/cmsUpdate/termsAndConditions",
  cmsController.handleUpdateTermsAndConditons
);

router.get(
  "/cmsUpdate/privacyPolicyGetData",
  cmsController.getPrivacyPolicyData
);

router.post(
  "/cmsUpdate/privacyPolicyUpdate",
  cmsController.handleUpdatePrivacyPolicy
);

//Site Settings Controller

router.post(
  "/siteSettings/URLUpdates",
  socialMediaController.updateSiteSettingsURL
);

router.post(
  "/siteSettings/getURLData",
  socialMediaController.handleGetSiteSettingURL
);
router.post("/siteSettings/copyright", socialMediaController.handleCopyRight);
router.post("/siteSettings/getcopyright", socialMediaController.getCopyRight);

//Breeding Time Management
router.post(
  "/breeding/timemanage",
  adminBreedingController.handleTimerForBreeding
);
router.post("/breeding/completedBreed", adminBreedingController.completedBreed);
router.post(
  "/breeding/getTime",
  adminBreedingController.handleTimerForBreeding
);
router.post(
  "/breeding/getTime/waitForBreed",
  adminBreedingController.waitForBreed
);
router.post(
  "/breeding/getTime/waitForBreed/getTime",
  adminBreedingController.getTimerForBreed
);

///FAQ Router

// faqQueryControllers
router.post("/faq/createFaq", faqController.faqQueryCreate);

router.post("/faq/getAllFaqData", faqController.faqQueryGetDatas);

router.post("/faq/singleData", faqController.faqQueryGetSingleData);

router.delete("/faq/deleteFaqData", faqController.faqQueryDeleteData);

module.exports = router;
