const express = require("express");
const router = express.Router();
const menuItem = require("../model/menuItem");
const path = require("path");
const multer = require("multer");

//for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

//add menuItems
router.post("/", upload.single("image"), async (req, res) => {
  const newMenuItem = new menuItem({
    name: req.body.name,
    description: req.body.description,
    image: "http://" + req.headers.host + "/" + req.file.path,
    price: req.body.price,
  });

  try {
    const result = await newMenuItem.save();
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

//get all MenuItem
router.get("/", async (req, res) => {
  try {
    const result = await menuItem.find();
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

// get menuItem by id
router.get("/:id", async (req, res) => {
  try {
    const data = await menuItem.findOne({ _id: req.params.id });
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

// delete menuItem by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await menuItem.findByIdAndDelete({ _id: id });

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

//update menuItem
router.patch("/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;

  const newMenuItem = {
    name: req.body.name,
    description: req.body.description,
    image: "http://" + req.headers.host + "/" + req.file.path,
    price: req.body.price,
  };

  try {
    const result = await menuItem.findByIdAndUpdate(id, newMenuItem);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newMenuItem,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
