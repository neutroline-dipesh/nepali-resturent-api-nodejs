const mongoose = require("mongoose");

const NoticeSchema = mongoose.Schema({
  noticeTitle: {
    type: String,
    required: true,
  },
  noticeBody: {
    type: String,
    required: true,
  },
  noticeDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("notice", NoticeSchema);
