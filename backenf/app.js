var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
var indexRouter = require("./routes/index");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser");
// client Routes Files
const userRouter = require("./routes/userRoutes/userRouter");

// Admin Routes Files
var adminRoute = require("./routes/adminRoutes/adminRouter");

// view engine setup
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// const whitelist = [
//   "http://172.16.17.205:3000",
//   "http://localhost:3000",
//   "http://172.16.17.205:3200",
//   "http://localhost:3200",
// ];
// const corsOptions = {
// || !origin
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use("/", indexRouter);
// app.use('/users', usersRouter);
// Client APIS
app.use("/user", userRouter);

// ADMIN APIS
app.use("/admin", adminRoute);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
