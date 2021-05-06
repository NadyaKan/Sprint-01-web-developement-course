const port = process.env.PORT || 3000;
const express = require("express");
const logController = require("./controllers/LogController");
const indexController = require("./controllers/IndexController");
const errorController = require("./controllers/ErrorController");
const signupController = require("./controllers/SignupController");
const profileController = require("./controllers/ProfileController");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Subscriber = require("./models/subscriber");
const subscribersController = require("./controllers/subscribersController");

mongoose.connect("mongodb://localhost:27017/first_db", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

//before middleware
app.use(logController.log);
app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/img", express.static("public/img"));

app.use(expressLayouts);

//routes
app.get("/", indexController.getIndex);
app.get("/sign-up", signupController.getSignup);
app.post("/sign-up", signupController.postSignup);
app.get("/profile", profileController.getProfile);
app.post("/profile", profileController.postProfile);

app.get("/howstart", function (req, res) {
  res.render("howstart");
});
app.get("/about", function (req, res) {
  res.render("about");
});

///should go into controller? ?is it getting info from DB?
app.get("/user/:name", function (req, res) {
  let username = req.params.name;
  res.render("user", { name: username });
});

app.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

//views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

//after middleware
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.listen(port, () => console.info(`server listening on port ${port}`));
