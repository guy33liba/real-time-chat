import React, { useEffect, useState } from "react"

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])
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
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log(data)
      setMessageList((list) => [...list, data])
    })
  }, [socket])
  return (
    <div>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>

        <div className="chat-body">
          {messageList.map((item) => {
            return (
              <h3 key={item.id}>
                {item.author} : {item.message} - {item.time}
              </h3>
            )
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Hey..."
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
