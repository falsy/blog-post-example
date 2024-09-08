import React, { useEffect, useRef, useState } from "react"

export default function App() {
  const ws = useRef(null)
  const timeout = useRef(null)
  const chunks = useRef([])
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageURL, setUploadedImageURL] = useState(null)
  const [receivedImageURL, setReceivedImageURL] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = URL.createObjectURL(file)
        setUploadedImageURL(url)
      }
      reader.readAsDataURL(file)
    }
  }

  const sendImage = () => {
    if (imageFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const arrayBuffer = e.target.result
        ws.current.send(arrayBuffer)
      }
      reader.readAsArrayBuffer(imageFile)
    }
  }

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080")

    ws.current.onopen = () => {
      console.log("connected")
    }

    ws.current.onmessage = (event) => {
      // 수신한 Blob 청크를 배열에 추가
      chunks.current = [...chunks.current, event.data]

      // 이전 타이머가 존재하면 클리어
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      // 새로운 타이머 설정 (1초 후에 결합 시도)
      timeout.current = setTimeout(() => {
        const blob = new Blob(chunks.current, { type: "image/jpeg" }) // 모든 청크를 합침
        const url = URL.createObjectURL(blob)
        console.log("received image url:", url)
        setReceivedImageURL(url)
        chunks.current = [] // 청크 배열 초기화
      }, 1000)
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
          <h2>UDP 이미지 업로드</h2>
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={sendImage}>Send Image</button>
        </div>
        <div>
          <h2>업로드 이미지:</h2>
          {uploadedImageURL && (
            <img
              src={uploadedImageURL}
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          )}
        </div>
        <div>
          <h2>수신 이미지:</h2>
          {receivedImageURL && (
            <img
              src={receivedImageURL}
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          )}
        </div>
      </section>
    </div>
  )
}
