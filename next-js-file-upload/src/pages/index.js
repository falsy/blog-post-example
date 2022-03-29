import React, { useState, useEffect } from 'react'

const Index = () => {

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    console.log(res)
  }

  const handleChangeFile = (e) => {
    const [file] = [...e.target.files]
    uploadFile(file)
  }

  return (
    <div>
      <input
        id="input-file"
        type="file"
        accept="image/png, image/jpeg"        
        onChange={handleChangeFile}
      />
      <label htmlFor="input-file">파일 탐색</label>
    </div>
  )
}

export default Index