const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

function loggedIn(req, res, next) {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    res.redirect("/log-in");
  }
}

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.get("/log-in", indexController.logInGet);
indexRouter.post("/sign-up", indexController.signUpPost);
indexRouter.get("/log-out", indexController.logOutGet);
indexRouter.get("/list", indexController.listGet);
indexRouter.post("/list", indexController.listPost);

module.exports = indexRouter;
