const express = require("express");
const router = express.Router();
const time = require("../model/time");
const auth = require("../middlewares/checkAuth");
//add new time
router.post("/", auth, async (req, res) => {
  const newTime = new time({
    days: req.body.days,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  console.log(newTime);

  try {
    const result = await newTime.save();
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

//get all time
router.get("/", async (req, res) => {
  try {
    const result = await time.find().sort({ $natural: -1 });
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

//get time by id
router.get("/:id", async (req, res) => {
  try {
    const data = await time.findOne({ _id: req.params.id });
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

// delete time by id
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await time.findByIdAndDelete({ _id: id });

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

//update time
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const newTime = {
    days: req.body.days,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };

  try {
    const result = await time.findByIdAndUpdate(id, newTime);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newTime,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
module.exports = router;
