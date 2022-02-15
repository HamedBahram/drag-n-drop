import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import LinearProgressWithLabel from '../ui/LinearProgressWithLabel'
import FilerHeader from './FileHeader'

const SelectedFile = ({ file, onDelete, onUpload }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const upload = async () => {
      const url = await uploadFile(file, setProgress)
      onUpload(file, url)
    }

    upload()
  }, [])

  return (
    <Grid item>
      <FilerHeader file={file} onDelete={onDelete} />
      <LinearProgressWithLabel value={progress} color='success' />
    </Grid>
  )
}

export default SelectedFile

function uploadFile(file, onProgress) {
  const URL = `https://api.cloudinary.com/v1_1/dtijo8xha/image/upload`

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()

    xhr.open('POST', URL)
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText)
      res(response.secure_url)
    }
    xhr.onerror = event => rej(event)
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100
        onProgress(Math.round(percentage))
      }
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'friendsbook')

    xhr.send(formData)
  })
}
