const mongoose = require("mongoose");
const AboutSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  facebookUrl: {
    type: String,
    required: true,
  },
  instaUrl: {
    type: String,
    required: true,
  },
  youtubeUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("about", AboutSchema);
