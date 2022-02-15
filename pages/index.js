import { Formik, Form } from 'formik'
import * as yup from 'yup'
import FileDropZone from '../components/upload/FileDropzone'

const Home = () => {
  return (
    <div className='p-8'>
      <h1 className='text-xl font-bold mb-8'>
        Drop your files to upload them...
      </h1>
      <Formik
        initialValues={{ files: [] }}
        // validationSchema={yup.object({
        //   files: yup.array(
        //     yup.object({
        //       url: yup.string().required(),
        //     })
        //   ),
        // })}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {({ values, errors, isValid, isSubmitting }) => (
          <Form>
            <FileDropZone name='files' />
            <button
              type='submit'
              className='bg-red-400 border border-red-400 hover:bg-transparent transition-colors rounded px-3 py-1 ml-1 mb-4 disabled:bg-red-200 disabled:text-gray-400 disabled:cursor-not-allowed'
              disabled={!isValid}
            >
              Submit
            </button>
            <div className='px-2'>
              <h2 className='font-bold mb-4'>Formik State</h2>
              <pre className='bg-emerald-400 text-white p-8 rounded overflow-auto'>
                {JSON.stringify({ values, errors }, null, 2)}
              </pre>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Home
