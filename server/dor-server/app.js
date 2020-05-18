const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// HTTP request logger
const morgan = require('morgan');
// load env variables
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
// Connect to the client side that run on diffrent port
const cors = require('cors');
// import routes
const businessRoutes = require('./routes/business/auth.business-route');

// init express
const app = express();

// DB connection
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });


// used to save users credentials
app.use(cookieParser());
app.use(expressValidator())

// Routes  
app.use('/business', businessRoutes);

// Not found page
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server is running on port - ' + port);
})