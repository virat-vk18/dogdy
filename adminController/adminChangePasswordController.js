const adminschema = require("../../models/adminModels/loginAdminModel");
const bcrypt = require("bcrypt");
const adminpasswordchange = async (req, res) => {
  const { oldPassword, newPassword } = req.body.data;
  const { id } = req.body;
  const loginexists = await adminschema.findOne({ _id: id });
  const adminpswdecrypt = await bcrypt.compare(
    oldPassword,
    loginexists.password
  );
  const newpassworddata = await bcrypt.compare(
    newPassword,
    loginexists.password
  );

  try {
    if (!adminpswdecrypt) {
      return res.status(401).json({ message: "password mis-match" });
    } else if (newpassworddata) {
      return res
        .status(401)
        .json({ message: "both old and new password same!" });
    } else {
      const encryptnewpassword = await bcrypt.hash(newPassword, 10);
      await adminschema.updateOne(
        { _id: id },
        {
          $set: { password: encryptnewpassword },
        }
      );
      return res
        .status(200)
        .json({ message: "Admin Password changed sucessfully!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("network error");
  }
};

module.exports = { adminpasswordchange };
