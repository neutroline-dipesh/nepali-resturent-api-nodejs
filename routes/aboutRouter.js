const express = require("express");
const router = express.Router();
const about = require("../model/about");

//add about
router.post("/", async (req, res) => {
  const newAbout = new about({
    companyName: req.body.companyName,
    city: req.body.city,
    district: req.body.district,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
    facebookUrl: req.body.facebookUrl,
    instaUrl: req.body.instaUrl,
    youtubeUrl: req.body.youtubeUrl,
  });

  try {
    const result = await newAbout.save();
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

//get all about
router.get("/", async (req, res) => {
  try {
    const result = await about.find();
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

//get about by id
router.get("/:id", async (req, res) => {
  try {
    const data = await about.findOne({ _id: req.params.id });
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

// delete about by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await about.findByIdAndDelete({ _id: id });

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

//update about
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const newAbout = {
    companyName: req.body.companyName,
    city: req.body.city,
    district: req.body.district,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
    facebookUrl: req.body.facebookUrl,
    instaUrl: req.body.instaUrl,
    youtubeUrl: req.body.youtubeUrl,
  };
  try {
    const result = await about.findByIdAndUpdate(id, newAbout);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newAbout,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
