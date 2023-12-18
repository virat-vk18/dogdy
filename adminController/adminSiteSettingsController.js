const SiteSettingsModal = require("../../models/adminModels/SocialMediaModel");
const CopyRight = require("../../models/adminModels/SiteSettings/copyRightModel");
const updateSiteSettingsURL = async (req, res) => {
  try {
    // console.log(req.body);
    const { faceBookUrl, whatsAppUrl, telegramUrl, instagramUrl } =
      req.body.siteURL;

    const checkingDataURL = await SiteSettingsModal.findOne({});

    if (checkingDataURL === null) {
      const createURL = {
        faceBookUrl,
        whatsAppUrl,
        telegramUrl,
        instagramUrl,
      };
      await SiteSettingsModal.create(createURL);
      return;
    }
    // Update Data
    await SiteSettingsModal.updateOne(
      { _id: checkingDataURL._id },
      {
        $set: {
          faceBookUrl,
          whatsAppUrl,
          telegramUrl,
          instagramUrl,
        },
      }
    );

    res.status(200).json({ message: "URL Updated Success" });
  } catch (error) {
    res.status(500).json({
      message: "Error Generating SiteSetings URl Updates",
      error: error.message,
    });
  }
};

const handleGetSiteSettingURL = async (req, res) => {
  console.log("hjkl");
  try {
    const siteSettingsResponse = await SiteSettingsModal.findOne({});
    res
      .status(200)
      .json({ message: "Fetching Data is Success", siteSettingsResponse });
  } catch (error) {
    res.status(500).json({
      message: "Error Generating SiteSetings Fetching",
      error: error.message,
    });
  }
};

const handleCopyRight = async (req, res) => {
  const { data } = req.body;
  try {
    const exisistingData = await CopyRight.find({});
    console.log(exisistingData);
    if (!(exisistingData.length > 0)) {
      const copyUpdate = {
        CopyRight: data.copyRight,
      };
      await CopyRight.create(copyUpdate);
      return res
        .status(200)
        .json({ message: "CopyRight Updated SuccessFully" });
    }
    await CopyRight.updateOne(
      { _id: exisistingData[0]._id },
      { $set: { CopyRight: data.copyRight } }
    );
    res.status(200).json({ message: "CopyRight Updated SuccessFully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getCopyRight = async (req, res) => {
  try {
    const getCopyRight = await CopyRight.findOne({});
    res.status(200).json({ message: "CopyRight Added Done", getCopyRight });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  updateSiteSettingsURL,
  handleGetSiteSettingURL,
  handleCopyRight,
  getCopyRight,
};
