const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
  },
  mobileNo: {
    type: Number,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 createdAt: {
    type: String,
  },
});

const UserModel = mongoose.model("User", userSchema);
(async () => {
  await UserModel.init();
})();

module.exports = UserModel;
