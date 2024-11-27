require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/conn');
const cors = require('cors');
const router = require('./routes/router');

app.use(express.json());
app.use(cors());
app.use(router);


const port = 8008;

app.listen(port, () => {
    console.log(`server is running, port ${port}`);
});