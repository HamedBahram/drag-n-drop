import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const FileHeader = ({ file, onDelete }) => {
  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      className='mb-1'
    >
      <Grid item>
        <small className='font-bold'>File Name: </small>
        <small className='italic'>{file.name}</small>
      </Grid>
      <Grid item>
        <Button
          size='small'
          color='error'
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(file)}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  )
}

export default FileHeader
