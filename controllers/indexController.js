const db = require("../db/queries");

exports.indexGet = async (req, res) => {
  res.render("home", { title: "PoistDrive Home" });
};

exports.logInGet = async (req, res) => {
  res.render("log-in-form", { title: "PoistDrive Log-in", header: "Log-in" });
};

exports.signUpGet = async (req, res) => {
  res.render("sign-up-form", {
    title: "PoistDrive Sign-up",
    header: "Create an account",
  });
};
