const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRES;

const generateToken = (payload) => {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
        throw new Error('JWT payload must be a plain object');
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

const refreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { iat, exp, ...userData } = decoded;
        return jwt.sign(userData, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
    } catch (error) {
        return null;
    }
};

const decodedToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
    refreshToken,
    decodedToken
}