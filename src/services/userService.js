const UsersRepository = require("../repository/userRepository.js");

class UsersServices {
  async findUsers(query) {
    const filters = query.where || {};
    const offset = query.offset;
    const limit = query.limit;
    const page = query.page;

    const result = await UsersRepository.findUsers({
      where: filters,
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(result.count / limit);

    return {
      data: result.rows,
      total: result.count,
      page: page,
      limit: limit,
      pageCount: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
  async getUser(id) {
    const result = await UsersRepository.getUser(id);
    if (!result) {
      return null;
    }

    const user = {
      ...result.dataValues,
    };

    return user;
  }

  async findUser(params) {
    return await UsersRepository.findUser(params);
  }

  async storeUser(data) {
    return await UsersRepository.storeUser(data);
  }
  async updateUser(id, data) {
    return await UsersRepository.updateUser(id, data);
  }
  async deleteUser(id) {
    return await UsersRepository.deleteUser(id);
  }
}
module.exports = new UsersServices();
