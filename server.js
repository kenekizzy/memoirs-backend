require('dotenv').config();

const express = require ('express');
const colors = require('colors');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const allowedOrigins = require('./allowedOrigins/allowedOrigins');
const connectDB = require('./db/ConnectDB');
const errorHandler = require('./middleware/ErrorHandler');
const userRoute = require('./routes/UserRoute');


connectDB();

const app = express();
app.enable('trust proxy');

const port = 3001;

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors(allowedOrigins));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());



app.use('/api', userRoute);
app.use(errorHandler);


const start = () => {
    console.log(`Server is up and running on port ${port}`.brightGreen.underline);
}


app.listen(port, start);



///@Kene type node in terminaland press enter
//it will open the node library
//then type in require('crypto').randomBytes(64).toString('hex) to generate ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET
//Deletethis when you're done.