import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("joinRoom", (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room : ${data}`)
    io.emit("message", message)
  })
  socket.on("sendMessage", (data) => {
    socket.send(data)
  })
  socket.on("disconnect", () => console.log("User Disconnected"))
})
////////////////////////////////////////////////////////////////////////

app.use(express.json())
app.use(cors())

server.listen(4000, () => console.log("server running"))
