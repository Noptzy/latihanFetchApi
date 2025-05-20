const UserServices = require("../services/userService.js");
const responseHandler = require("../utils/responseHandler.js");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, offset, ...filters } = req.query;
    const calculatedOffset = (page - 1) * limit;

    const where = {};

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        where[key] = filters[key];
      }
    });

    const users = await UserServices.findUsers({
      ...(Object.keys(where).length > 0 && { where }),
      offset: parseInt(calculatedOffset),
      limit: parseInt(limit),
      page: parseInt(page),
    });
    return res.json(
      responseHandler.success("success get users", users).toJSON()
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(responseHandler.error("failed get users", null).toJSON());
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserServices.getUser(req.params.id);
    return user
      ? res.json(responseHandler.success("success get user", user).toJSON())
      : res
          .status(404)
          .json(responseHandler.error("user not found", null).toJSON());
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(responseHandler.error("failed get user", null).toJSON());
  }
};

exports.storeUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const checkEmail = await UserServices.findUser({ email });

    if (checkEmail) {
      return res
        .status(400)
        .json(
          responseHandler
            .error("Validation Error", { email: "Email Has Been Used" })
            .toJSON()
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserServices.storeUser({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json(responseHandler.success("User Created", newUser).toJSON());
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseHandler.error("error", null).toJSON());
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const { id } = req.params;
    const user = await UserServices.getUser(id);

    if (!user) {
      return res
        .status(404)
        .json(responseHandler.error("User not found", null).toJSON());
    }

    if (email && email !== user.email) {
      const emailInUse = await UserServices.findUser({ email });
      if (emailInUse) {
        return res
          .status(400)
          .json(
            responseHandler
              .error("Validation Error", { email: "Email telah digunakan" })
              .toJSON()
          );
      }
    }

    const updateData = {
      name,
      email,
      ...(password && { password }),
    };
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserServices.updateUser(id, updateData);

    return res
      .status(200)
      .json(
        responseHandler
          .success("User updated successfully", updatedUser)
          .toJSON()
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseHandler.error("error", null).toJSON());
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserServices.deleteUser(id);
    if (!user) {
      return res
        .status(404)
        .json(responseHandler.error("User Not Found", null).toJSON());
    }
    return res
      .status(200)
      .json(
        responseHandler.success("User deleted successfully", null).toJSON()
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseHandler.error("error", null).toJSON());
  }
};
