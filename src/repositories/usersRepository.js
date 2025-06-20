const db = require('../models');
const userModel = db.user;

class UsersRepository {
    async getUsers() {
        return await userModel.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });
    }

    async getUser(id) {
        if (!id) return null;
        return await userModel.findByPk(id, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
    }

    async findUser(params = {}) {
        return await userModel.findOne({
            where: params,
            attributes: { exclue: ['createdAt', 'updatedAt'] },
        });
    }

    async findUsers({ where = {}, limit = 10, offset = 0 }) {
        return await userModel.findAndCountAll({
            where: { ...where },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
    }

    async storeUser(data) {
        const transaction = await db.sequelize.transaction();
        try {
            const newUser = await userModel.create(
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                { transaction }
            );
            await transaction.commit();
            return newUser;
        } catch (error) {
            await transaction.rollback();
            throw new Error('Failed To Create User');
        }
    }

    async updateUser(id, data) {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await userModel.findByPk(id, { transaction });
            if (!user) throw new Error('User Not Found');

            await user.update(
                {
                    name: data.name,
                    email: data.email,
                    ...(data.password && { password: data.password }),
                    ...(data.photoProfile && { photoProfile: data.photoProfile }), 
                },
                { transaction }
            );
            await transaction.commit();
            return user;
        } catch (error) {
            await transaction.rollback();
            throw new Error('Failed To Update User');
        }
    }

    async deleteUser(id) {
        const transaction = await db.sequelize.transaction();
        try {
            const deletedUser = await userModel.destroy({
                where: { id },
                transaction,
            });

            await transaction.commit();
            return deletedUser ? 'User Successfully Deleted' : 'User Not Found';
        } catch (error) {
            await transaction.rollback();
            throw new Error('Failed to deleted User');
        }
    }
}
module.exports = new UsersRepository();
