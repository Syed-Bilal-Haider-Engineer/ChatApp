import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
// import xss from 'xss';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.json());

app.use(cors({
 origin: 'http://localhost:3000',
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
 credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
 app.use(morgan('dev'));
}

const limiter = rateLimit({
 max: 100,
 windowMs: 60 * 60 * 1000, // 1 hour
 message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

export { app };