import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-toastify'
import { useHandleCMSGetAboutUsDataQuery, useHandleCMSUpdateAboutUsMutation } from '../cmsApi'
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
  const navigate = useNavigate()
  // RTK Query
  const [ckData, setCKData] = useState(null)
  const [updateAboutUs] = useHandleCMSUpdateAboutUsMutation()
  const { data: aboutUsData, isSuccess, isLoading } = useHandleCMSGetAboutUsDataQuery()

  let content

  if (isLoading) {
    content = 'Data Is Loading'
  } else if (isSuccess) {
    const responseLength = aboutUsData.getAboutUsData.length
    if (responseLength > 0) {
      content = aboutUsData.getAboutUsData[0].content
    } else {
      content = ''
    }
  } else {
    content = 'Content Fetching Error'
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    setCKData(data) // Set the CKEditor data
  }

  const handleSumbit = async (e) => {
    e.preventDefault()
    if (ckData.length <= 20) {
      return toast.error('Please Given Atleast 10 Characters', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
    try {
      const response = await updateAboutUs({ ckData })
      if (response.error) {
        return toast.error('Data Updated Error', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/dashBoard')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h2 className="text-center">ABOUT US</h2>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSumbit}>
              <div className="mb-3">
                <CKEditor editor={ClassicEditor} onChange={handleEditorChange} data={content} />
              </div>
              <div className="d-grid">
                <button className="btn btn-success" type="submit">
                  Submit{' '}
                </button>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AboutUs
