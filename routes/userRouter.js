const { Router } = require("express");
const userController = require("../controllers/userController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const userRouter = Router();

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/log-in");
  }
}

userRouter.get("/:userId", loggedIn, userController.foldersGet);

module.exports = userRouter;
