const WebSocket = require("ws")
const net = require("net")
const dgram = require("dgram")

const wss = new WebSocket.Server({ port: 8080 })

const tcpClient = new net.Socket()
tcpClient.connect(8000, "localhost", () => {
  console.log("TCP 서버와 연결")
})

const udpClient = dgram.createSocket("udp4")

let startTime = 0

// TCP 서버로부터 응답 수신
tcpClient.on("data", (data) => {
  console.log(`TCP 서버 응답 수신: ${data}`)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`TCP 서버 응답: ${data}`)
    }
  })
})

// UDP 서버로부터 응답 수신
udpClient.on("message", (msg, rinfo) => {
  console.log(`UDP 서버로부터 응답 수신: ${msg}`)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`UDP 서버 응답: ${msg}`)
    }
  })
})

wss.on("connection", (ws) => {
  console.log("웹 소캣 연결")

  ws.on("message", (message) => {
    console.log(`클라이언트에게 받은 메시지: ${message}`)

    startTime = Date.now()

    // TCP 서버에 메시지 전송
    tcpClient.write(message, () => {
      const endTimeTCP = Date.now()
      const tcpDuration = endTimeTCP - startTime
      ws.send(`TCP 전송 시간: ${tcpDuration}ms`)
    })

    // UDP 서버에 메시지 전송
    udpClient.send(message, 7000, "localhost", (err) => {
      if (err) {
        console.error("UDP 서버에 전송 실패:", err)
      } else {
        const endTimeUDP = Date.now()
        const udpDuration = endTimeUDP - startTime
        ws.send(`UDP 전송 시간: ${udpDuration}ms`)
      }
    })
  })
})
