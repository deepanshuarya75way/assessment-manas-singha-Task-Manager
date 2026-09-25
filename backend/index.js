import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import path from "path"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/task.route.js"
import reportRoutes from "./routes/report.route.js"
import { fileURLToPath } from "url"
import http from 'http'
import {Server} from 'socket.io'
import { initSocket } from "./utils/sokcet.js";


dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Middleware to handle cors
const corsOptions = {
  origin: process.env.FRONT_END_URL || "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to handle JSON object in request body
app.use(express.json());

app.use(cookieParser())


//socket io setup
const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:process.env.FRONT_END_URL,
    credentials:true,
  },
})

initSocket(io)
io.use((socket,next)=>{
  try {
    const cookieHeader = socket.handshake.headers.cookie

    if(!cookieHeader){
      return next(new Error('Unauthorized'))
    }

    const token = cookieHeader?.split("; ").find((cookie)=>{
      cookie.startsWith("access_token=").split("=")[1]
    })
    if(!token){
      return next(new Error("Unauthorized"))
    }
    //decoding the token 
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err,user)=>{
        return next(new Error('Unauthorized'))
      }
    )
    socket.user = user
    //socket.role = decoded.role
    next()
  } catch (error) {
    next(new Error("Unauthorized!"))
  }
})

io.on("connection",(socket)=>{
  console.log("User connected: ",socket.user)

  socket.join(`user: ${socket.user._id}`)
  if(socket.user.role==='admin'){
    socket.join("admins")
  }

  console.log('socket connected!',socket.id);
  socket.on("disconnect",()=>{
    console.log("user disconnected!",socket.user._id)
  })
})


server.listen(3000,()=>{
  console.log("Server running on port 3000")
})


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/reports", reportRoutes)

// serve static files from "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
