const dgram = require("dgram")

const udpServer = dgram.createSocket("udp4")
const CHUNK_SIZE = 8 * 1024 // 8KB

udpServer.on("message", (message, rinfo) => {
  let offset = 0

  while (offset < message.length) {
    const chunk = message.slice(offset, offset + CHUNK_SIZE)

    udpServer.send(chunk, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error("UDP 전송 오류:", err)
      } else {
        console.log(`청크 전송 완료: ${chunk.length} bytes`)
      }
    })

    offset += CHUNK_SIZE
  }
})

udpServer.bind(7000, () => {
  console.log("UDP 서버가 포트 7000에 실행 중입니다.")
})
