import React, { useEffect, useRef, useState } from "react"

export default function App() {
  const ws = useRef(null)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = () => {
    ws.current.send(message)
    setMessage("")
  }

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080")

    ws.current.onopen = () => {
      console.log("connected")
    }

    ws.current.onmessage = (event) => {
      console.log("message", event.data)
    }

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  return (
    <div>
      <div>
        <h1>TCP / UDP</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="message"
          value={message}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage()
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
