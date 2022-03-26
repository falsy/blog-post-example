import { IncomingForm } from 'formidable'
import FormData from 'form-data'
import fs from 'fs'

export const upload = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST': {

        const form = new IncomingForm({
          maxFileSize: 5 * 1024 * 1024,
          keepExtensions: true
        })
        // const form = formidable({ multiples: true })
        // console.log(form)

        const files = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            return resolve(files)
          })
        })
    
        const formData = new FormData()
        const file = files.file
        const readStream = fs.createReadStream(file.filepath)
    
        formData.append('file', readStream)

        const api = await fetch('http://localhost:7777/upload', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
          },
          data: formData
        })

        const status = api.status
        const data = await api.json()

        console.log(data)

        if (status === 200) {
          res.status(status).json({success: true})
        } else {
          return res.status(500).json('Unknown Error')
        }
        break
      }
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json('Unknown Error')
  }
}

export default upload