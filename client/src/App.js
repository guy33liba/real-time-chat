import "./App.css"
import io from "socket.io-client"
import React, { useState } from "react"
import Chat from "./Chat"

const socket = io.connect("http://localhost:4000")
const App = () => {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room)
    }
  }
  return (
    <div>
      <h3>Join Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join A room</button>
      <Chat socket={socket} room={room} username={username} />
    </div>
  )
}

export default App