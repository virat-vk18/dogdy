import React, { useEffect, useRef, useState } from 'react'
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  useDeleteFaqQueryDataMutation,
  useGetAllFaqQueryMutation,
  useGetSingleFaqQueryDataMutation,
  useHandleCreateFAQMutation,
} from './faqApi.js'

const Faq = () => {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  // RTK Query
  const [ckData, setCKData] = useState(null)
  const [allFaqData, setAllFaqData] = useState([])

  // rtK qUERY
  const [createFaq] = useHandleCreateFAQMutation()
  const [getSingleData] = useGetSingleFaqQueryDataMutation()
  const [getAllFaqDatas] = useGetAllFaqQueryMutation()
  const [deleteFaqQuery] = useDeleteFaqQueryDataMutation()

  const [questions, setQuestions] = useState('')
  const [faqQueryId, setFaqQueryId] = useState(null)

  useEffect(() => {
    const fetchingAllFaqData = async () => {
      const response = await getAllFaqDatas()
      if (response.error) {
        return toast.error('Data Fetching Error', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      const allDatas = response.data.getfaqDatas
      setAllFaqData(allDatas)
    }
    fetchingAllFaqData()
  }, [])

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    setCKData(data) // Set the CKEditor data
  }

  const handleSumbit = async (e) => {
    e.preventDefault()
    if (questions.length <= 10) {
      return toast.error('Please Given Atleast 10 Characters Question', {
        position: toast.POSITION.TOP_CENTER,
      })
    }

    if (ckData === null) {
      return toast.error('Please Fill Answer Sections', {
        position: toast.POSITION.TOP_CENTER,
      })
    }

    if (ckData.length <= 20) {
      return toast.error('Please Given Atleast 10 Characters Answer', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
    try {
      const response = await createFaq({ questions, answers: ckData, id: faqQueryId })
      if (response.error) {
        return toast.error(response.error.data.message, {
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

  const handleUpdateFaqQuery = async (id) => {
    try {
      const response = await getSingleData({ id })
      if (response.error) {
        return toast.error('Data Fetching Data')
      }
      setFaqQueryId(id)
      const faqData = response.data.getFaqSingleData
      setQuestions(faqData.questions)
      setCKData(faqData.answers)
    } catch (error) {
      console.log(error.message)
    }
  }

  const faqQueryDeleteData = async (id) => {
    try {
      const deleteReponse = await deleteFaqQuery({ id })
      if (deleteReponse.error) {
        return toast.error('Delete Data Error', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      // inputRef.current.focus()
      toast.success(deleteReponse.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/dashboard')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <h2 className="text-center">FAQ UPDATES</h2>
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSumbit}>
                <div className="mb-3">
                  <div>
                    <label className="form-label fw-bold h4" htmlFor="faq">
                      Questions :
                    </label>
                    <input
                      type="text"
                      name="faq"
                      ref={inputRef}
                      id="faq"
                      defaultValue={questions}
                      className="form-control mb-3"
                      onChange={(e) => setQuestions(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label fw-bold h4 mb-2" htmlFor="faq">
                      Answers :
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={handleEditorChange}
                      data={ckData === null ? '' : ckData}
                    />
                  </div>
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

      {allFaqData.length <= 0 ? (
        ''
      ) : (
        <>
          <h3 className="mb-3">ADD FAQs:</h3>
          {allFaqData.map((faqData) => (
            <>
              <CCard className="mb-4">
                <CCardHeader className="fw-bold">{faqData.questions} ?</CCardHeader>
                <CCardBody>
                  <div dangerouslySetInnerHTML={{ __html: faqData.answers }} />
                </CCardBody>
                <CCardFooter>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handleUpdateFaqQuery(faqData._id)}
                      type="button"
                      className="btn btn-primary"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => faqQueryDeleteData(faqData._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      DELETE
                    </button>
                  </div>
                </CCardFooter>
              </CCard>
            </>
          ))}
        </>
      )}
    </>
  )
}

export default Faq
