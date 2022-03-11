import React , { Fragment, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Upload() {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})

    const onChange = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }
    console.log(file)

    const onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'mutipart/form-data'
                }
            })

            const { fileName, filePath } = res.data

            setUploadedFile({ fileName, filePath })
        } catch(err) {
            if(err.response.status === 500) {
                console.log('There was a problem with the server')
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

  return (
    <Fragment>
    <div className='container '>
        <form onSubmit={onSubmit}>
            <div className='custom-file '>
                <input type='file' className='custom-file-input' id='customFile' onChange={onChange} />
                <label className='' htmlFor='customFile'>
                     {/* {filename}    */}
                </label>
            </div>
            <input type="submit" value='Upload' className='btn btn-dark' />
        </form>
    </div>
    </Fragment>

    )
}
