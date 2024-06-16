import React from "react"

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("")
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      }
      await socket.emit("sendMessage", messageData)
    }
  }
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
