const db = require("../models");
const UserModel = db.Users;

class UsersRepository {
  async getUsers() {
    return await UserModel.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
  }
  async getUser(id) {
    if (!id) return null;
    return await UserModel.findByPk(id, {
      attributes: ["name", "email"],
    });
  }
  async findUser(params = {}) {
    return await UserModel.findOne({
      where: params,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
  }

  async findUsers({ where = {}, offset = 0 }) {
    const result = await UserModel.findAndCountAll({
      where,
      attributes: ["name", "email"],
      offset: parseInt(offset),
    });
    return {
      rows: result.rows,
      count: result.count,
    };
  }

  async storeUser(user) {
    const transaction = await db.sequelize.transaction();
    try {
      const newUser = await UserModel.create(
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        { transaction }
      );
      await transaction.commit();
      return newUser;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error Creating User");
    }
  }

 async updateUser(id, data) {
    const transaction = await db.sequelize.transaction();
    try {
      const user = await UserModel.findByPk(id, { transaction });
      if (!user) throw new Error("User Not Found");

      await user.update(
        {
          name: data.name,
          email: data.email,
          ...(data.password && { password: data.password }),
        },
        { transaction }
      );
      await transaction.commit();
      
      const updatedUser = await UserModel.findByPk(id, {
        attributes: ["name", "email","password"]
      });
      return updatedUser;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error Updating User");
    }
}

  async deleteUser(id) {
    const transaction = await db.sequelize.transaction();
    try {
      const deletedUser = await UserModel.destroy(
        { where: { id } },
        { transaction }
      );
      await transaction.commit();
      return deletedUser ? "User Successfully deleted" : "User not found";
    } catch (error) {
      await transaction.rollback();
      throw new Error("Failed to delete User");
    }
  }
}
module.exports = new UsersRepository();
