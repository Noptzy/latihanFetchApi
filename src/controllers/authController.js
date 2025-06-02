const { generateToken, decodedToken, refreshToken, verifyToken } = require('../utils/jwt.js');
const bcrypt = require('bcryptjs');
const responseHandler = require('../utils/resHandler.js');
const userService = require('../services/usersService.js');
const {storeUserToken, getUserToken, deleteUserToken} = require('../utils/redisClientHandler.js');

exports.loginUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        let user;

        if (email === '' && password === '') {
            return res
                .status(400)
                .json(responseHandler
                .error('Validation Error', { email: 'Email is required' })
                .toJSON());
        }

        Object.hasOwn(req.body, 'email')
            ? (user = await userService.findUser({ email }))
            : (user = await userService.findUser({ name }));

        if (!user) {
            return res
                .status(404)
                .json(responseHandler
                .error('User not found', null)
                .toJSON());
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json(responseHandler
                .error('Password is wrong', null)
                .toJSON());
        }

        const existingToken = await getUserToken(user.id);
        if (existingToken) {
            return res
                .status(400)
                .json(responseHandler
                .error('User already logged in on another device', null)
                .toJSON());
        }

        const userData = await userService.getUser(user.id);
        const payload = userData?.toJSON ? userData.toJSON() : userData;
        const token = generateToken(payload);

        await storeUserToken(user.id, token);

        return res
            .json(responseHandler
            .success('Success login', token)
            .toJSON());

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler
            .error('Error', null)
            .toJSON());
    }
};

exports.logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
+1
        if (!token) {
            return res
                .status(400)
                .json(responseHandler
                .error('Required token', null)
                .toJSON());
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res
                .status(401)
                .json(responseHandler
                .error('Invalid token', null)
                .toJSON());
        }

        const storedToken = await getUserToken(decoded.id);
        if (!storedToken || storedToken.jwt !== token) {
            return res
                .status(401)
                .json(responseHandler
                .error('Already logged out', null)
                .toJSON());
        }

        await deleteUserToken(decoded.id);
        return res
            .json(responseHandler
            .success('Success logout', null)
            .toJSON());
    
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler
            .error('Error', null)
            .toJSON());
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res
                .status(400)
                .json(responseHandler
                .error('Required token', null)
                .toJSON());
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res
                .status(400)
                .json(responseHandler
                .error('Invalid token', null)
                .toJSON());
        }

        const storedToken = await getUserToken(decoded.id);
        if (!storedToken || storedToken.jwt !== token) {
            return res
                .status(401)
                .json(responseHandler
                .error('Unauthorized', null)
                .toJSON());
        }

        const existingToken = await getUserToken(decoded.id);
        if (!existingToken || existingToken.jwt !== token) {
            return res
                .status(401)
                .json(responseHandler
                .error('Unauthorized', null)
                .toJSON());
        }

        await deleteUserToken(decoded.id);

        const userData = await userService.getUser(decoded.id);
        if (!userData) {
            return res
                .status(404)
                .json(responseHandler
                .error('User not found', null)
                .toJSON());
        }

        const payload = userData?.toJSON ? userData.toJSON() : userData;
        const newToken = generateToken(payload);

        await storeUserToken(decoded.id, newToken);
        
        return res
            .json(responseHandler
            .success('Success refresh token', newToken)
            .toJSON());

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(responseHandler
            .error('Error', null)
            .toJSON());
    }
};

exports.profileUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res
                .status(400)
                .json(responseHandler
                .error('Required token', null)
                .toJSON());
        }

        const data = decodedToken(token);

        if (data?.expiredAt) {
            return res
                .status(400)
                .json(responseHandler
                .error(data.message, null)
                .toJSON());
        }

        const user = await userService.getUser(data.id);
        if (!user) {
            return res
                .status(404)
                .json(responseHandler
                .error('User not found', null)
                .toJSON());
        }

        return res
            .json(responseHandler
            .success('Success get profile', user)
            .toJSON());

    } catch (error) {
        return res
            .status(500)
            .json(responseHandler
            .error('Error', null)
            .toJSON());
    }
};