const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
});

const storeUserToken = async (userId, token) => {
    const key = `jwt_${userId}`;
    const value = JSON.stringify({
        jwt: token,
    });
    await redisClient.set(key, value, { EX: 3600 });
};

const getUserToken = async (userId) => {
    const key = `jwt_${userId}`;
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

const deleteUserToken = async (userId) => {
    const key = `jwt_${userId}`;
    await redisClient.del(key);
};

redisClient.connect();

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = {
    redisClient,
    storeUserToken,
    getUserToken,
    deleteUserToken,
};
