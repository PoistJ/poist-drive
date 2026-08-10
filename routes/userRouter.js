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
userRouter.get("/:userId/:folderId/upload", loggedIn, userController.uploadGet);
userRouter.post(
  "/:userId/:folderId/upload",
  loggedIn,
  upload.single("fileUpload"),
  userController.uploadPost,
);
userRouter.get("/:userId/:folderId/", loggedIn, userController.filesGet);

module.exports = userRouter;
