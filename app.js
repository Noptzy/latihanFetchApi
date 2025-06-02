require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiV1 = require('./src/routes/v1/index.js');

const app = express();
const port = process.env.PORT;
const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', apiV1);
app.get((req, res) => {
    return res.status(404).json({ message: '404 Not Found' });
});
app.listen(port)
