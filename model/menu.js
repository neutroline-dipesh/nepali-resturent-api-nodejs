const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
  menu: {
    type: String,
    required: true,
  },
  menuItems: [
    {
      _menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menuItem",
      },
    },
  ],
});

module.exports = mongoose.model("menu", MenuSchema);
