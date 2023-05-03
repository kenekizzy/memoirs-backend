require('dotenv').config();
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/ConnectDB');
const allowedOrigins = require('./allowedOrigins/allowedOrigins');
const errorHandler = require('./middleware/ErrorHandler');
const authRoute = require('./routes/AuthRoute');
const refreshRoute = require('./routes/refreshTokenRoute');


connectDB();


const app = express();
app.enable('trust proxy');
const port = 4000;




app.use(cors(allowedOrigins));
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', authRoute);
app.use('/api', refreshRoute)
app.use(errorHandler);


const start = () => {
    console.log(`Server running on port ${port}`.magenta.underline);
}

app.listen(port, start);