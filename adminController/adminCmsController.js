const AboutModal = require("../../models/adminModels/cms/about");

const TermsAndConditionsModal = require("../../models/adminModels/cms/termsAndConditions");

const PrivacyPolicyModal = require("../../models/adminModels/cms/privacyPolicy");

const getAboutUsData = async (req, res) => {
  try {
    const getAboutUsData = await AboutModal.find({});
    res
      .status(200)
      .json({ message: "AboutUs getting Data Success", getAboutUsData });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating About CMS Getting",
      error: err.message,
    });
  }
};

const handleUpdateAboutUs = async (req, res) => {
  try {
    const { ckData } = req.body;
    const exitingData = await AboutModal.find({});

    if (!(exitingData.length > 0)) {
      const aboutUpdateObj = {
        content: ckData,
      };
      await AboutModal.create(aboutUpdateObj);
      return res.status(200).json({ message: "About Updated SuccessFully" });
    }
    await AboutModal.updateOne(
      { _id: exitingData[0]._id },
      { $set: { content: ckData } }
    );
    res.status(200).json({ message: "About Updated SuccessFully" });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating About CMS Updated",
      error: err.message,
    });
  }
};

// Terms And Conditions

const getTermsAndConditionsData = async (req, res) => {
  try {
    const getTermsAndCondtionsData = await TermsAndConditionsModal.find({});
    res.status(200).json({
      message: "AboutUs getting Data Success",
      getTermsAndCondtionsData,
      // getTermsAndCondtionsData: getTermsAndCondtionsData === null ? '' : getTermsAndCondtionsData
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating Terms And Conditions CMS Getting",
      error: err.message,
    });
  }
};

const handleUpdateTermsAndConditons = async (req, res) => {
  try {
    const { ckData } = req.body;
    const exitingDta = await TermsAndConditionsModal.find({});

    if (!(exitingDta.length > 0)) {
      const termsAndConditionsUpdate = {
        content: ckData,
      };
      await TermsAndConditionsModal.create(termsAndConditionsUpdate);
      return res
        .status(200)
        .json({ message: "Terms And Conditions Updated SuccessFully" });
    }
    await TermsAndConditionsModal.updateOne(
      { _id: exitingDta[0]._id },
      { $set: { content: ckData } }
    );
    res
      .status(200)
      .json({ message: "Terms And Conditions Updated SuccessFully" });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating terms and Condtions CMS Updated",
      error: err.message,
    });
  }
};

// PrivacyPolicy

const getPrivacyPolicyData = async (req, res) => {
  try {
    const getPrivacyPolicyData = await PrivacyPolicyModal.find({});
    res
      .status(200)
      .json({ message: "AboutUs getting Data Success", getPrivacyPolicyData });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating Terms And Conditions CMS Getting",
      error: err.message,
    });
  }
};

const handleUpdatePrivacyPolicy = async (req, res) => {
  try {
    const { ckData } = req.body;
    const exitingDta = await PrivacyPolicyModal.find({});

    if (!(exitingDta.length > 0)) {
      const termsAndConditionsUpdate = {
        content: ckData,
      };
      await PrivacyPolicyModal.create(termsAndConditionsUpdate);
      return res
        .status(200)
        .json({ message: "Terms And Conditions Updated SuccessFully" });
    }
    await PrivacyPolicyModal.updateOne(
      { _id: exitingDta[0]._id },
      { $set: { content: ckData } }
    );
    res
      .status(200)
      .json({ message: "Terms And Conditions Updated SuccessFully" });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating terms and Condtions CMS Updated",
      error: err.message,
    });
  }
};

module.exports = {
  handleUpdateAboutUs,
  handleUpdateTermsAndConditons,
  getAboutUsData,
  getTermsAndConditionsData,
  getPrivacyPolicyData,
  handleUpdatePrivacyPolicy,
};
