const { Router } = require("express");
const userController = require("../../controller/userController.js");
const {
  createUserSchema,
  updateUserSchema,
} = require("../../validator/userValidator.js");

const validate = require("../../middleware/validate.js");
const route = Router();

route.get("/", userController.getUsers);
route.get("/:id", userController.getUser);
route.post("/", validate(createUserSchema), userController.storeUser);
route.put("/:id", validate(updateUserSchema), userController.updateUser);
route.delete("/:id", userController.deleteUser);

module.exports = route;
