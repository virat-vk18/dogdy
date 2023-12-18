const AdminLogin = require("../../models/adminModels/loginAdminModel");
const bcrypt = require("bcrypt");
const speakEasy = require("@levminer/speakeasy");
const jwt = require("jsonwebtoken");
const qrCode = require("qrcode");
require("dotenv").config();

const handleAdminLoginVerify = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, pattern } = req.body;
    const loginAdminData = await AdminLoginModal.findOne({ email });

    if (!loginAdminData) {
      return res.status(404).json({ message: "Please enter Correct Email" });
    }
    const patternverify = JSON.stringify(pattern);
    const verifyPassword = await bcrypt.compare(
      password,
      loginAdminData.password
    );
    if (!verifyPassword) {
      return res.status(404).json({ message: "please enter correct password" });
    } else if (loginAdminData.pattern !== patternverify) {
      return res.status(404).json({ message: "please enter correct pattern" });
    } else {
      const jwtToken = jwt.sign(
        { id: userData._id },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Admin-Login sucessfully!",
        id: loginAdminData._id,
        token: jwtToken,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Generating Admin Login", error: error.message });
  }
};

const generateTwoFactorCode = async (req, res) => {
  //   console.log(req.body);
  try {
    const { id } = req.body;
    console.log(id);
    // checking Already Verified User
    const secretCode = speakEasy.generateSecret();

    await AdminLogin.updateOne(
      { _id: id },
      { $set: { temp_secret: secretCode } }
    );
    const twoFactorAuthData = await AdminLogin.findOne({ _id: id });

    // generating QrCode Img Src
    qrCode.toDataURL(
      twoFactorAuthData.temp_secret.otpauth_url,
      function (err, data) {
        if (err) {
          return res.status(404).json({ message: "Generating QrCode Error" });
        }
        res.status(200).json({
          message: "Generate TwoFactorAuth",
          authCode: secretCode.base32,
          qrCodeImgSrc: data,
          twoFactorAuthData,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error Generating TwoFactor Secret",
      error: error.message,
    });
  }
};

const loginTwoFactorVerify = async (req, res) => {
  try {
    const { id, token } = req.body;
    // console.log(id, token);
    const getUser = await AdminLogin.findOne({ _id: id });
    const { base32: secret } = getUser.temp_secret;

    let tokenValidates = speakEasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });

    let qrCodeVerify = speakEasy.totp.verify({
      secret: getUser.temp_secret.ascii,
      encoding: "ascii",
      token,
    });
    if (!qrCodeVerify) {
      return res.status(401).json({ message: "Authentication Invalid" });
    }
    if (!tokenValidates) {
      return res.status(401).json({ message: "Authentication Invalid Token" });
    }

    await AdminLogin.updateOne(
      { _id: id },
      {
        $set: {
          temp_secret: null,
          secret: getUser.temp_secret,
          authVerify: true,
        },
      }
    );
    const updateUser = await AdminLogin.findOne({ _id: id });
    res.status(200).json({
      message: "Authentication Verified",
      twoFactorAuth: updateUser.twoFactorAuth,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Generating Authencation verify ",
      error: err.message,
    });
  }
};
const disableTwoFactorAuthentication = async (req, res) => {
  try {
    const { id } = req.body;
    await AdminLogin.updateOne(
      { _id: id },
      { $set: { secret: null, authVerify: false } }
    );
    res.status(200).json({ message: "Disabled Your Authetication" });
  } catch (error) {
    res.status(500).json({
      message: "Error Disable Your Authentication",
      error: error.message,
    });
  }
};

module.exports = {
  handleAdminLoginVerify,
  generateTwoFactorCode,
  loginTwoFactorVerify,
  disableTwoFactorAuthentication,
};
