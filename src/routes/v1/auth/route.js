const { Router } = require("express");
const authController = require("../../../controllers/authController.js");
const validate = require("../../../middlewares/validate.js");
const { loginUserSchema } = require("../../../validators/users.js");
const authMiddleware = require("../../../middlewares/api.js");
const route = Router()

route.get("/profile",authMiddleware, authController.profileUser);
route.post("/login", validate(loginUserSchema), authController.loginUser);
route.post("/logout", authController.logoutUser);
route.post("/refresh/token", authMiddleware,authController.refreshToken);

module.exports = route;  