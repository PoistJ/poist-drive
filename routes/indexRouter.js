const { Router } = require("express");
const indexController = require("../controllers/indexController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const indexRouter = Router();

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/log-in");
  }
}

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.get("/log-in", indexController.logInGet);
indexRouter.post("/sign-up", indexController.signUpPost);
indexRouter.get("/list", indexController.listGet);
indexRouter.post("/list", indexController.listPost);
indexRouter.get("/upload", loggedIn, indexController.uploadGet);
indexRouter.post(
  "/upload",
  loggedIn,
  upload.single("fileUpload"),
  indexController.uploadPost,
);

module.exports = indexRouter;
