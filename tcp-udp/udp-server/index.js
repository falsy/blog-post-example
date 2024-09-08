const dgram = require("dgram")

const udpServer = dgram.createSocket("udp4")

udpServer.on("message", (msg, rinfo) => {
  console.log(`UDP 요청: ${msg}`)
  const response = `UDP 응답: ${msg}`
  udpServer.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) console.error("UDP 전송 오류:", err)
  })
})

udpServer.bind(7000, () => {
  console.log("UDP 서버가 포트 7000에 실행 중입니다.")
})
