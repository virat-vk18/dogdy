import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-toastify'
import {
  useHandleCMSGetPrivacyPolicyDataQuery,
  useHandleCMSPrivacyPolicyUpdateMutation,
} from '../cmsApi'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
  const navigate = useNavigate()
  // RTK Query
  const [ckData, setCKData] = useState(null)
  const [updatePrivacyPolicy] = useHandleCMSPrivacyPolicyUpdateMutation()
  const { data: privacyPolicyData, isSuccess, isLoading } = useHandleCMSGetPrivacyPolicyDataQuery()

  let contents

  if (isLoading) {
    contents = 'Data Is Loading'
  } else if (isSuccess) {
    const responseLength = privacyPolicyData.getPrivacyPolicyData.length
    if (responseLength > 0) {
      contents = privacyPolicyData.getPrivacyPolicyData[0].content
    } else {
      contents = ''
    }
  } else {
    contents = 'Content Fetching Error'
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
      const response = await updatePrivacyPolicy({ ckData })
      if (response.error) {
        return toast.error('Data Updated Error', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/dashBoard')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h2 className="text-center">PRIVACY POLICY</h2>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSumbit}>
              <div className="mb-3">
                <CKEditor editor={ClassicEditor} onChange={handleEditorChange} data={contents} />
              </div>
              <div className="d-grid">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PrivacyPolicy
