const express = require ('express'); // web framework for Node.js

const morgan = require('morgan'); // logging middleware for Node.js

const rateLimit = require('express-rate-limit'); // rate limiting middleware for Node.js

const helmet = require('helmet'); // helps secure Express apps by setting various HTTP headers

const mongoSanitize = require('express-mongo-sanitize'); // sanitizes user input to prevent MongoDB Operator Injection

const bodyParser = require('body-parser'); // middleware for parsing incoming request bodies in a middleware before your route handlers, you can use it to parse JSON, urlencoded, or raw data.

const xss = require('xss');

const cors = require('cors');



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
// app.use(xss());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);


module.exports= app;