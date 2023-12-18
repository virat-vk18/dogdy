const FAQModal = require("../../models/adminModels/SiteSettings/faqModel");

const faqQueryCreate = async (req, res) => {
  try {
    const { questions, answers, id } = req.body;

    const exitingQuestions = await FAQModal.findOne({ questions, answers });
    if (exitingQuestions) {
      return res.status(409).json({ message: "Already Updated" });
    }

    if (!(id === null)) {
      await FAQModal.updateOne(
        { _id: id },
        {
          $set: {
            questions,
            answers,
          },
        }
      );
      return res.status(200).json({ message: "Faq Updates SuccessFully" });
    }

    const faqUpdates = {
      questions,
      answers,
    };
    await FAQModal.create(faqUpdates);
    res.status(201).json({ message: "Faq Create SuccessFully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Generating FAQ Updates", error: error.message });
  }
};

const faqQueryGetDatas = async (req, res) => {
  try {
    const getfaqDatas = await FAQModal.find({});
    res.status(200).json({ message: "Faq Updates SuccessFully", getfaqDatas });
  } catch (error) {
    res.status(500).json({
      message: "Error Generating Fetching Data FAQ ",
      error: error.message,
    });
  }
};

const faqQueryGetSingleData = async (req, res) => {
  try {
    const { id } = req.body;
    const getFaqSingleData = await FAQModal.findOne({ _id: id });
    res.status(200).json({ message: "Faq  SuccessFully", getFaqSingleData });
  } catch (error) {
    res.status(500).json({
      message: "Error Generating Fetching Data FAQ ",
      error: error.message,
    });
  }
};

const faqQueryDeleteData = async (req, res) => {
  try {
    const { id } = req.body;
    await FAQModal.deleteOne({ _id: id });
    res.status(200).json({ message: "Faq Data Deleted  SuccessFully" });
  } catch (error) {
    res.status(500).json({
      message: "Error Generating Delte Data FAQ ",
      error: error.message,
    });
  }
};

module.exports = {
  faqQueryCreate,
  faqQueryGetDatas,
  faqQueryGetSingleData,
  faqQueryDeleteData,
};
