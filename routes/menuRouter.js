const express = require("express");
const router = express.Router();
const menu = require("../model/menu");

//add new menu
router.post("/", async (req, res) => {
  const newMenu = new menu({
    menu: req.body.menu,
  });

  try {
    let result = await newMenu.save();
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

//add menuItem in menu
router.post("/menuItem/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body.menuItem_id);
  const meuItem = {
    _menuItem: req.body._menuItem,
  };
  try {
    const result = menu.findById(id, (err, menu) => {
      if (menu) {
        // The below two lines will add the newly saved review's
        // ObjectID to the the User's reviews array field
        menu.menuItems.push(meuItem);
        menu.save();
        res.status(200).json({
          status: "ok",
          message: "menuItem inserted in menu ",
        });
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//get all menu
router.get("/", async (req, res) => {
  try {
    const result = await menu.find();
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

//get menu by id
router.get("/:id", async (req, res) => {
  try {
    const data = await menu.findOne({ _id: req.params.id }).populate({
      path: "menuItems",
      populate: {
        path: "_menuItem",
        model: "menuItem",
      },
    });
    console.log(data);
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

// delete menu
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await menu.findByIdAndDelete({ _id: id });
    console.log("delete sucessfull ");
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

//remove an menuItem from  from menu
router.delete("/menuItem/:id", async (req, res) => {
  const menu_id = req.params.id;
  const _menuItem = req.body._menuItem;

  try {
    await menu.updateOne(
      { _id: menu_id },
      { $pull: { menuItems: { _id: _menuItem } } }
    );
    res.send("items removed Successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//update blogs
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const newMenu = {
    menu: req.body.menu,
  };
  try {
    const result = await menu.findByIdAndUpdate(id, newMenu);

    res.status(200).json({
      status: "ok",
      olddata: result,
      newData: newMenu,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/*  
this function takes three id parameter 
1.menu_id (from params),
2.menuItem_id(from body)
3. _menuItem(from body)
*/
router.patch("/menuItem/:id", async (req, res) => {
  const menu_id = req.params.id;
  const menuItem_id = req.body.menuItem_id;
  const _menuItem = req.body._menuItem;
  // const item = {
  //   _menu: req.body.menu_id,

  // };
  try {
    await menu.updateOne(
      { _id: menu_id, "menuItems._id": menuItem_id },
      {
        $set: {
          "menuItems.$._menuItem": _menuItem,
        },
      }
    );

    res.send("items updated Successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
