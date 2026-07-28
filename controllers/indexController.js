const passport = require("passport");
const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma.js");

exports.indexGet = async (req, res) => {
  res.render("home", { user: req.user, title: "PoistDrive Home" });
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

exports.signUpPost = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.users.create({
      data: {
        email: req.body.username,
        password: hashedPassword,
      },
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.logInPost = async () => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  });
};
