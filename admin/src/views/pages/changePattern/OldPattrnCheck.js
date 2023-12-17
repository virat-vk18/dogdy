import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import React, { useState } from 'react'
import PatternLock from 'react-pattern-lock/lib/components/PatternLock'
import { useNavigate } from 'react-router-dom'
import patternImg from '../../../assets/images/Mobile login-bro.png'
// import { useForgotPatternMutation } from './verifyEmailApi'
import { toast } from 'react-toastify'
import { useOldPatternCheckMutation } from '../forgotPattern/verifyEmailApi'

const OldPattrnCheck = () => {
  const [oldPattern, setOldPattern] = useState([])

  const adminId = localStorage.getItem('2FaAdminId')
  const navigate = useNavigate()
  // RTk Query
  const [oldPatternCheck] = useOldPatternCheckMutation()

  const handleOldPatternComplete = (value) => {
    // Do something with the completed pattern (e.g., store it in state)
    console.log(value)
    setOldPattern(value)
  }
  const resetNewPattern = () => {
    setOldPattern([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await oldPatternCheck({ oldPattern, id: adminId })
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      navigate('/changepatternmain')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center align-items-center vh-100 ">
          <h1 className="mt-3 mb-4 text-center">Draw Your Old Pattern</h1>
          <CCol md={4}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <CCardGroup>
                <CCard className="text-white bg-success py-5  rounded-3">
                  <CCardBody className="text-center">
                    <PatternLock
                      width={200}
                      pointSize={10}
                      size={3}
                      path={oldPattern}
                      onChange={(val) => handleOldPatternComplete(val)}
                      onFinish={() => {
                        // Handle pattern completion if needed
                      }}
                      className=" ms-4 mt-3" // Add your custom clas
                    />
                    <button
                      type="button"
                      className="btn btn-outline-success text-black"
                      onClick={resetNewPattern}
                    >
                      Reset Pattern
                    </button>
                  </CCardBody>
                </CCard>
              </CCardGroup>
              <div className="d-grid my-3 ">
                <button type="submit" className="btn btn-outline-success text-center">
                  Submit
                </button>
              </div>
            </form>
          </CCol>
          <CCol md={7}>
            <img src={patternImg} alt="" className="img-fluid" />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default OldPattrnCheck
