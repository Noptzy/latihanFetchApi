const express = require('express');
const userRoutes = require('./users/route.js');

const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).json({ message: 'Made By Nopsi' });
});

route.use('/users', userRoutes);

module.exports = route;