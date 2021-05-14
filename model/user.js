const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("user", userSchema);
