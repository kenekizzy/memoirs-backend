require('dotenv').config();

const express = require ('express');
const colors = require('colors');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const allowedOrigins = require('./allowedOrigins/allowedOrigins');
const connectDB = require('./db/ConnectDB');

connectDB();

const app = express();
app.enable('trust proxy');

const port = 3001;


app.use(cors(allowedOrigins));
app.use(express.urlencoded({ extended: false}));
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());




const start = () => {
    console.log(`Server is up and running on port ${port}`.brightYellow.underline);
}


app.listen(port, start);

