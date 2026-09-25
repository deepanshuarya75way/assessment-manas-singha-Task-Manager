import {io} from "socket.io-client"

const socket = io("http://localhost:5173",{
  withCredentials:true,
  transports:["polling"]
})
socket.on('connect',()=>{
  console.log('socket  connected:',socket.id);
})
socket.on('connect_error',(error)=>{
  console.error('socket connection error: ',error.message);
  console.error(error.message)
})
export default socket