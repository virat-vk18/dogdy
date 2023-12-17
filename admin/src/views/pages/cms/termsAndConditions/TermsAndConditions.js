import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-toastify'
import {
  useHandleCMSGetTermsAndConditionsDataQuery,
  useHandleCMSTermsAndConditiosMutation,
} from '../cmsApi'
import { useNavigate } from 'react-router-dom'

const TermsAndConditions = () => {
  const naviagte = useNavigate()

  const [ckData, setCKData] = useState(null)
  // RTK Query

  const [updateTermsAndConditions] = useHandleCMSTermsAndConditiosMutation()

  const {
    data: termsAndConditionsData,
    isError,
    isSuccess,
    isLoading,
  } = useHandleCMSGetTermsAndConditionsDataQuery()

  let contents

  if (isLoading) {
    contents = 'Data Is Loading'
  } else if (isSuccess) {
    const responseLength = termsAndConditionsData.getTermsAndCondtionsData.length
    if (responseLength > 0) {
      contents = termsAndConditionsData.getTermsAndCondtionsData[0].content
    } else {
      contents = ''
    }

    console.log()
  } else if (isError) {
    contents = 'Content Fetching Error'
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    // console.log(data.length);
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
      const response = await updateTermsAndConditions({ ckData })
      if (response.error) {
        return toast.error('Data Updated Error', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      naviagte('/dashBoard')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h2 className="text-center">TERMS & CONDITIONS</h2>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSumbit}>
              <div className="mb-3">
                <CKEditor editor={ClassicEditor} onChange={handleEditorChange} data={contents} />
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

export default TermsAndConditions
