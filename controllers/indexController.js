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

exports.logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.listGet = (req, res) => {
  res.render("list");
};

exports.listPost = async (req, res, next) => {
  try {
    const uploadData = await prisma.list.create({
      data: {
        handle: req.body.handle,
      },
    });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.uploadGet = (req, res) => {
  res.render("upload");
};

exports.uploadPost = async (req, res, next) => {
  try {
    const fileData = await prisma.users.update({
      where: { id: req.user.id },
      data: {
        files: {
          create: [
            { folder: req.params.folder },
            { filename: req.file.originalname },
            { filesize: req.file.size },
          ],
        },
      },
    });

    res.redirect("/");
    console.log(req.file);
    console.log(req.body);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
