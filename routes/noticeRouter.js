const express = require("express");
const router = express.Router();
const notice = require("../model/notice");
const auth = require("../middlewares/checkAuth");

//add notice
router.post("/", auth, async (req, res) => {
  const newNotice = new notice({
    noticeTitle: req.body.noticeTitle,
    noticeBody: req.body.noticeBody,
  });

  try {
    const result = await newNotice.save();
    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//get all notice
router.get("/", async (req, res) => {
  try {
    const result = await notice.find();
    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//get notice by id
router.get("/:id", async (req, res) => {
  try {
    const data = await notice.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
});

// delete notice by id
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await notice.findByIdAndDelete({ _id: id });

    res.status(200).json({
      status: "ok",
      result: result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//update notice
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;

  const newNotice = {
    noticeTitle: req.body.noticeTitle,
    noticeBody: req.body.noticeBody,
  };
  try {
    const result = await notice.findByIdAndUpdate(id, newNotice);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newNotice,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
