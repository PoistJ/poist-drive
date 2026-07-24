const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const indexRouter = require("./routes/indexRouter.js");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POOL_STRING,
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "ape", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }

  console.log("App is live on port 3000");
});
