const AdminLogin = require("../../models/adminModels/loginAdminModel");
const speakEasy = require("@levminer/speakeasy");
const bcrypt = require("bcrypt");

const AdminVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const loginUser = await AdminLogin.findOne({
    email: email,
  });
  try {
    if (!loginUser) {
      return res.status(404).json({ message: "Please enter Correct Email" });
    } else {
      return res.status(200).json({ message: "Email Verified" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const forgotPattern = async (req, res) => {
  const { newpattern, id } = req.body;
  const patt = JSON.stringify(newpattern);

  try {
    const exisistPattern = await AdminLogin.findOne({
      _id: id,
    });

    if (patt === exisistPattern.pattern) {
      return res.status(409).json({ message: "Already exisistPattern " });
    }
    await AdminLogin.updateOne({ _id: id }, { $set: { pattern: patt } });
    res.status(200).json({ message: "NewPattern Updated" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const twofaforgotpattern = async (req, res) => {
  try {
    const { id, token } = req.body;
    console.log(id, token);
    const getUser = await AdminLogin.findOne({ _id: id });

    let tokenValidates = speakEasy.totp.verify({
      secret: getUser.secret.base32,
      encoding: "base32",
      token,
    });

    let qrCodeVerify = speakEasy.totp.verify({
      secret: getUser.secret.ascii,
      encoding: "ascii",
      token,
    });
    if (!qrCodeVerify) {
      return res.status(401).json({ message: "Authentication Invalid" });
    }
    if (!tokenValidates) {
      return res.status(401).json({ message: "Authentication Invalid Token" });
    }
    res.status(200).json({ message: "Authentication Verified" });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating Authencation verify ",
      error: err.message,
    });
  }
};

const verifyEmailForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const adminData = await AdminLogin.findOne({ email });
    if (!adminData) {
      return res.status(401).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "Email Verified", adminData });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const setNewPassword = async (req, res) => {
  try {
    const { password, id } = req.body;
    const exisist = await AdminLogin.findOne({ _id: id });
    const checkPasscode = await bcrypt.compare(password, exisist.password);
    if (checkPasscode) {
      return res
        .status(409)
        .json({ message: "Old Password Can't be New Password" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await AdminLogin.updateOne(
      { _id: id },
      { $set: { password: hashPassword } }
    );
    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    res.status(500).json({ message: "Internal Error", error: err.message });
  }
};

module.exports = {
  AdminVerifyEmail,
  forgotPattern,
  twofaforgotpattern,
  verifyEmailForgotPassword,
  setNewPassword,
};
