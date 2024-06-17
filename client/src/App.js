import React, { useState } from "react"
import "./App.css"
import io from "socket.io-client"
import Chat from "./Chat"

const socket = io.connect("http://localhost:4000")
const App = () => {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room)
      setShowChat(true)
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      joinRoom()
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="John..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Room ID..."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={() => {
              joinRoom()
              setShowChat(!showChat)
            }}
          >
            Join A room
          </button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={username} />
      )}
    </div>
  )
}

export default App
