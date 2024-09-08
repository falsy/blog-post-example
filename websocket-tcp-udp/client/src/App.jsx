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
      console.log(event.data)
    }

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  return (
    <div>
      <section>
        <div>
          <h2>TCP / UDP</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="message"
            value={message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  )
}
