const usersRepository = require('../repositories/usersRepository.js');

class UsersService {
    async findUsers(query) {
        const { page = 1, limit = 10, where } = query;
        const offset = (page - 1) * limit;
        const result = await usersRepository.findUsers({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return {
            data: result.rows,
            total: result.count,
            page: parseInt(page),
            limit: parseInt(limit),
        };
    }

    async getUser(id) {
        const result = await usersRepository.getUser(id);
        if (!result) {
            return null;
        }
        return result;
    }

    async findUser(params) {
        return await usersRepository.findUser(params);
    }

    async storeUser(data) {
        return await usersRepository.storeUser(data);
    }

    async updateUser(id, data) {
        return await usersRepository.updateUser(id, data);
    }

    async deleteUser(id) {
        return await usersRepository.deleteUser(id);
    }
}

module.exports = new UsersService();
