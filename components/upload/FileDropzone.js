import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useField } from 'formik'
import { Grid } from '@mui/material'
import SelectedFile from './SelectedFile'
import ValidationError from './ValidationError'

const FileDropZone = ({ name }) => {
  const [files, setFiles] = useState([])
  const [field, meta, helpers] = useField(name)
  const { setValue, setTouched, setError } = helpers

  useEffect(() => {
    const found = files.find(fileObject => fileObject.errors.length > 0)
    if (found) {
      setError('Files with error')
    } else {
      setError()
      setValue(files)
    }
  }, [files])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAccepted = acceptedFiles.map(file => ({ file, errors: [] }))
    setFiles(files => [...files, ...mappedAccepted, ...rejectedFiles])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['image/*', '.pdf'],
    maxSize: 500 * 1024, // 300KB
  })

  const onUpload = (file, url) => {
    setFiles(files =>
      files.map(fileObject =>
        fileObject.file === file
          ? {
              ...fileObject,
              url,
            }
          : fileObject
      )
    )
  }

  const onDelete = file => {
    setFiles(files => files.filter(fileObject => fileObject.file !== file))
  }

  return (
    <>
      <div
        {...getRootProps()}
        className='border border-dashed border-red-400 rounded px-8 py-16 mb-8 cursor-pointer'
      >
        <input {...getInputProps()} />
        {isDragActive && <p>Drop the files here ...</p>}
        {!isDragActive && <p>Drop some files here, or click to select files</p>}
      </div>
      <div className='px-2 mb-8'>
        <pre className='bg-emerald-400 text-white p-8 rounded overflow-auto'>
          {JSON.stringify(files, null, 2)}
        </pre>
      </div>
      <Grid container spacing={2} direction='column' className='px-2 mb-4'>
        <h2 className='font-bold px-3'>Files</h2>
        {files.map((fileObject, index) =>
          fileObject.errors.length ? (
            <ValidationError
              file={fileObject.file}
              errors={fileObject.errors}
              onDelete={onDelete}
            />
          ) : (
            <SelectedFile
              key={index}
              file={fileObject.file}
              onUpload={onUpload}
              onDelete={onDelete}
            />
          )
        )}
      </Grid>
    </>
  )
}

export default FileDropZone
