const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = 4000;

//for path directory
global.appRoot = __dirname;
//for request parameter
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/public/images", express.static("public/images"));

//require all roytes
const timeRouter = require("./routes/timeRouter");
const contactRouter = require("./routes/contactRouter");
const noticeRouter = require("./routes/noticeRouter");
const aboutRouter = require("./routes/aboutRouter");
const menuItemRouter = require("./routes/menuItemRouter");
const menuRouter = require("./routes/menuRouter");
const userRouter = require("./routes//userRouter");
//use all routes
app.use("/time", timeRouter);
app.use("/contact", contactRouter);
app.use("/notice", noticeRouter);
app.use("/about", aboutRouter);
app.use("/menuItem", menuItemRouter);
app.use("/menu", menuRouter);
app.use("/user", userRouter);
//Mongo database connection
mongoose
  .connect("mongodb://localhost/nepali-resturant-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log("Server start at port : " + PORT);
});
