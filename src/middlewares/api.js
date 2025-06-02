const { verifyToken } = require('../utils/jwt.js');
const responseHandler = require('../utils/resHandler.js');
const {getUserToken} = require('../utils/redisClientHandler.js');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res
                .status(400)
                .json(responseHandler
                .error('required token', null)
                .toJSON());
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res
                .status(400)
                .json(responseHandler
                .error('invalid token', null)
                .toJSON());
        }

        const storedToken = await getUserToken(decoded.id);

        if (!storedToken || storedToken.jwt !== token) {
            return res
                .status(401)
                .json(responseHandler
                .error('unauthorized', null)
                .toJSON());
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res
            .status(500)
            .json(responseHandler
            .error('auth error', null)
            .toJSON());
    }
};

module.exports = authMiddleware;