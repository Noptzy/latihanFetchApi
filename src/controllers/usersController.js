const UserService = require('../services/usersService.js');
const responseHandler = require('../utils/resHandler.js');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const offset = (page - 1) * limit;

        const where = {};

        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                where[key] = filters[key];
            }
        });

        const users = await UserService.findUsers({
            where: { ...where },
            offset: parseInt(offset),
            limit: parseInt(limit),
        });

        return res
            .json(responseHandler
            .success('success get users', users)
            .toJSON());
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler
            .error('error', null)
            .toJSON());
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await UserService.getUser(req.params.id);
        return user
            ? res
                .json(responseHandler
                .success('success get user', user)
                .toJSON())
            : res
                .status(404)
                .json(responseHandler
                .success('User not found', null)
                .toJSON());
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler
            .error('error', null)
            .toJSON());
    }
};

exports.storeUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json(responseHandler
                .error('Validation Error', { message: 'All fields are required' })
                .toJSON());
        }

        const checkEmail = await UserService.findUser({ email });
        if (checkEmail) {
            return res
                .status(400)
                .json(responseHandler
                .error('Validation Error', { email: 'Email has been used' })
                .toJSON());
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserService.storeUser({
            name,
            email,
            password: hashedPassword,
        });

        return res
            .status(201)
            .json(responseHandler
            .success('User created', newUser)
            .toJSON());
    } catch (error) {
        return res
            .status(500)
            .json(responseHandler
            .error('error', null));
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.deleteUser(id);
        if (!user) {
            return res
                .status(404)
                .json(responseHandler
                .error('User not found', null)
                .toJSON());
        }
        return res
            .status(200)
            .json(responseHandler.success('User deleted successfully', null)
            .toJSON());
    } catch (error) {
        return res
            .status(500)
            .json(responseHandler
            .error('error', null)
            .toJSON());
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { email, name, password} = req.body;
        const { id } = req.params;
        const user = await UserService.getUser(id);

        if (!user) {
            return res
                .status(404)
                .json(responseHandler
                .error('User not found', null)
                .toJSON());
        }

        if (email && email !== user.email) {
            const emailInUse = await UserService.findUser({ email });
            if (emailInUse) {
                return res
                    .status(400)
                    .json(responseHandler
                    .error('Validation Error', { email: 'Email has been used' })
                    .toJSON());
            }
        }

        const updateData = {
            email,
            name,
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        if(req.file){
            updateData.photoProfile = req.file.filename
        }

        await UserService.updateUser(id, updateData);

        const updatedUser = await UserService.getUser(id);

        return res
            .status(200)
            .json(responseHandler
            .success('success update user', updatedUser)
            .toJSON());
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler
            .error('error', null)
            .toJSON());
    }
};
