const AdminLogin = require("../../models/adminModels/loginAdminModel");

const oldPatternVerify = async (req, res) => {
  const { oldPattern, id } = req.body;
  const oldPatternString = JSON.stringify(oldPattern);
  try {
    const adminDetails = await AdminLogin.findOne({
      _id: id,
    });
    if (!(adminDetails.pattern === oldPatternString)) {
      return res.status(404).json({ message: "OldPattern Is InValid" });
    }
    await AdminLogin.updateOne(
      { _id: id },
      { $set: { pattern: oldPatternString } }
    );
    res.status(200).json({ message: "Pattern Updated" });
  } catch (error) {
    res.status(500).json({
      message: "Error Generating oldPattern Checking",
      error: err.message,
    });
  }
};

module.exports = { oldPatternVerify };
