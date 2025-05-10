const https = require("https");
const fs = require("fs");
const path = require("path"); // <-- Đặt trước khi dùng path

const options = {
  key: fs.readFileSync(path.join(__dirname, "../certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../certs/cert.pem"))
};

const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
const moment = require("moment");
var methodOverride = require("method-override");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");

// Đăng ký helper 'eq' để so sánh hai giá trị
const handlebars = require("handlebars");
handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});
handlebars.registerHelper("or", function (arg1, arg2) {
  return arg1 || arg2;
});
handlebars.registerHelper("formatDate", function (date) {
  return moment(date).format("DD/MM/YYYY");
});
handlebars.registerHelper("increment", function (index) {
  return index + 1;
});
handlebars.registerHelper("allowProtoProperties", function (value) {
  return value;
});
handlebars.runtimeOptions = {
  allowProtoPropertiesByDefault: true
};

app.use("/uploads", express.static("uploads"));

// Connect to db
db.connect();

// Static file
app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "resources", "views", "layouts"),
    partialsDir: path.join(__dirname, "resources", "views", "partials"),
    allowProtoPropertiesByDefault: true,
  })
);
app.set("view engine", "hbs");

// Middleware
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Nếu dùng HTTPS thực tế: secure: true
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Views folder
app.set("views", path.join(__dirname, "resources", "views"));

// Route init
route(app);

// HTTPS server start
https.createServer(options, app).listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
