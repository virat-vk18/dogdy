const AdminLogin = require("../../models/adminModels/loginAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleAdminLoginVerify = async (req, res) => {
  try {
    const { email, password, pattern } = req.body;
    const loginUser = await AdminLogin.findOne({ email });
    if (!loginUser) {
      return res.status(404).json({ message: "Please enter Correct Email" });
    }
    const patternverify = JSON.stringify(pattern);
    const verifyPassword = await bcrypt.compare(password, loginUser.password);
    if (!verifyPassword) {
      return res.status(404).json({ message: "please enter correct password" });
    } else if (loginUser.pattern !== patternverify) {
      return res.status(404).json({ message: "please enter correct pattern" });
    } else {
      const jwtToken = jwt.sign(
        { id: loginUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Admin-Login sucessfully!",
        loginUser,
        adminToken: jwtToken,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Generating Admin Login", error: error.message });
  }
};

module.exports = { handleAdminLoginVerify };
