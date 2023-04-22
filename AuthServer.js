require('dotenv').config();
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./db/ConnectDB');
const allowedOrigins = require('./allowedOrigins/allowedOrigins');

connectDB();


const app = express();
const port = 4001;

const start = () => {
    console.log(`Server running on port ${port}`.magenta.underline);
}

app.use(cors(allowedOrigins));
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(port, start);