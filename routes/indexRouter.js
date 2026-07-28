const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.get("/log-in", indexController.logInGet);
indexRouter.post("/sign-up", indexController.signUpPost);
//indexRouter.post("/log-in", indexController.logInPost);

module.exports = indexRouter;
