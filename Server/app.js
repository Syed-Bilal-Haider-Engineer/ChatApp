import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import router from './routers/index.js';
import { Server } from 'socket.io';
import * as http from 'http'; 
import User from './Models/User.js';
// import xss from 'xss';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server,{
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
});

io.on('connection', async(socket) => {
    console.log(`Socket == ${socket}`);
     
     const user_id = socket.handshake.query['user_id'];
    
     const socket_id = socket.id;

     if(user_id){
       await User.findByIdAndUpdate(user_id,{ socket_id});
     }

     // we write a socket event listener.

     socket.on("friend_request", async(data)=>{
       
        const to = await User.findById(data.to);

        //Todo : create a friend request
        io.to(to.socket_id).emit("new_friend_request",{
            
        })
     })


 });
server.listen(3000);
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
app.use(router)

export { app };