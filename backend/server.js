'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const docs = require('./config/swagger');
const swaggerSpec = docs();


// routes
const indexRouter = require('./routes/index');
const pizzaRoute = require('./components/pizza/pizza.route');

const app = express();

// app configuration

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


//API
app.use('/', indexRouter);
app.use('/pizza', pizzaRoute);


module.exports = app;
