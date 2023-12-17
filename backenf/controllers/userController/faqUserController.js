const FAQMOdal = require("../../models/adminModels/SiteSettings/faqModel");

const faqFetchingData = async (req, res) => {
  try {
    const faqDatas = await FAQMOdal.find({});
    res.status(200).json({ message: "Fetching Data SuccessFully", faqDatas });
  } catch (error) {
    res.status(500).json({
      message: "Error Generating Fetching Faq Updates",
      error: err.message,
    });
  }
};
module.exports = { faqFetchingData };
