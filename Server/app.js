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
import FriendRequest from './Models/FriendRequest';
import path from 'path';

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

     if(Boolean(user_id)){
       await User.findByIdAndUpdate(user_id,{ socket_id, status:"Online"});
     }

     // we write a socket event listener.

     socket.on("friend_request", async(data)=>{
       
        const to_user = await User.findById(data.to).select("socket_id");
        const from_user = await User.findById(data.from).select("socket_id");

        //Todo : create a friend request
        io.to(to_user.socket_id).emit("new_friend_request",{
            message:"New Friend request accept!"
        })

        io.to(from_user.socket_id).emit("request_sent",{
          message:"Request sent successfully!"
      })
     })
     socket.on("", async (data)=>{
         console.log(data);
         const request_doc = await FriendRequest.findById(data.request_id);

         console.log(request_doc,"request_document");

         // request_id 

         const sender = await User.findById(request_doc.sender);
         const receiver = await User.findById(request_doc.recipient);

         sender.friends.push(request_doc.recipient);
         receiver.friends.push(request_doc.sender);

         await receiver.save({new:true, validateModifiedOnly:true});
         await sender.save({new:true, validateModifiedOnly:true});
         
         await FriendRequest.findByIdAndDelete(data.request_id);

           //Todo : create a friend request
        io.to(sender.socket_id).emit("new_friend_request",{
          message:"Friend Request Accepted"
      })

      io.to(receiver.socket_id).emit("request_sent",{
        message:"Friend Request Accepted!"
    })

    
    });

    // Handle link and text message
      socket.on("text_message",() => {
         console.log("Received message",data);

         // data: { to, date, from}

         //to create start new conversations if it don'st exist yet or add new message in a list

         // save to db

         // emit in coming message

         // emit outgoing message
      })

          // Handle file message
          socket.on("file_message",() => {
            console.log("Received message",data);
   
            // data: { to, date, from}
   
            // file extenshion extractions

            const fileExtenshion = path.extname(data.file.name)

            // generate unique file name

            // upload file on s3 AWS bucket

            //to create start new conversations if it don'st exist yet or add new message in a list

            // save to db

            // emit in coming message

            // emit outgoing message
         })

    socket.on("end",async(data) => {
      console.log("closing connections");
       if(data.user_id){
           await User.findByIdAndUpdate(data.user_id,{status:"Offline"})
       }
      socket.disconnect(0)
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

// A simple function to add two numbers
function sum(a, b) {
  let s = a + b; // Store the result in a variable
  return s;      // Return the result
}

// A concise arrow function for adding two numbers
const sum = (a, b) => a + b;
