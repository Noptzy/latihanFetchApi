const express = require('express');
const userRoute = require('./users/route.js');
const authRoute = require('./auth/route.js');

const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).json({ message: 'Made By Nopsi' });
});

route.use('/auth', authRoute);
route.use('/users', userRoute);

module.exports = route;