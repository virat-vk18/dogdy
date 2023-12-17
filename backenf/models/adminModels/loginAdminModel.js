const mongoose = require("mongoose");

const AdminLogin = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pattern: {
    type: String,
    required: true,
  },
  temp_secret: {
    type: Object,
    default: null,
  },
  secret: {
    type: Object,
    default: null,
  },
  authVerify: {
    type: Boolean,
  },
});

// UserSchma.virtual('createAt').get(function () {
//     this.name =
// })

module.exports = LogAdmin = mongoose.model("LoginAdmin", AdminLogin);
