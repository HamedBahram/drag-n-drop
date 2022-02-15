import { Grid } from '@mui/material'
import LinearProgressWithError from '../ui/LinearProgressWithError'
import FileHeader from './FileHeader'

const ValidationError = ({ file, errors, onDelete }) => {
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgressWithError value={50} />
      {errors.map(error => (
        <small className='text-red-400'>
          <span className='font-bold'>Error: </span>{' '}
          {error.code === 'file-too-large'
            ? 'File should be less than 500KB'
            : 'Invalid Image file'}
        </small>
      ))}
    </Grid>
  )
}

export default ValidationError
