import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import React, { useState } from 'react'
import PatternLock from 'react-pattern-lock/lib/components/PatternLock'
import { useNavigate } from 'react-router-dom'
import { useForgotPatternMutation } from './verifyEmailApi'
import { toast } from 'react-toastify'

const ForgotPatteern = () => {
  const [newpattern, setNewPattern] = useState([])
  const [confirmPattern, setConfirmPattern] = useState([])
  const [forgotPattern] = useForgotPatternMutation()
  const id = localStorage.getItem('2FaAdminId')
  const navigate = useNavigate()

  const handleNewPatternComplete = (value) => {
    // Do something with the completed pattern (e.g., store it in state)
    setNewPattern(value)
  }
  const handleConfirmPatternComplete = (value) => {
    // Do something with the completed pattern (e.g., store it in state)
    setConfirmPattern(value)
  }
  const resetNewPattern = () => {
    setNewPattern([])
  }
  const resetConfirmPattern = () => {
    setConfirmPattern([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (newpattern.length < 4 && confirmPattern.length < 4) {
        return toast.error('Pattern Should Contain Atleast 3 dots')
      }
      if (newpattern.length !== confirmPattern.length) {
        return toast.error('Pattern is MisMatching')
      }
      for (let i = 0; i < newpattern.length; i++) {
        if (newpattern[i] !== confirmPattern[i]) {
          return toast.error('Pattern is Wrong')
        }
      }
      const response = await forgotPattern({ newpattern, id })
      console.log(response)
      if (response.error) {
        toast.error(response.error.data.message)
      }
      if (response.data) {
        toast.success(response.data.message)
        navigate('/')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center align-items-center vh-100 ">
          <CCol md={8}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <CCardGroup>
                <CCard
                  className="text-white bg-danger py-5 me-3 rounded-3"
                  style={{ width: '44%' }}
                >
                  <CCardBody className="text-center">
                    <label className="fs-5">New Pattern</label>
                    <PatternLock
                      width={230}
                      pointSize={10}
                      size={3}
                      path={newpattern}
                      onChange={(val) => handleNewPatternComplete(val)}
                      onFinish={() => {
                        // Handle pattern completion if needed
                      }}
                      className="bg-danger ms-3 mt-3" // Add your custom clas
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger text-black "
                      onClick={resetNewPattern}
                    >
                      Reset Pattern
                    </button>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-danger py-5 rounded-3" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <label className="fs-5"> Confirm Pattern</label>
                    <PatternLock
                      width={230}
                      pointSize={10}
                      size={3}
                      path={confirmPattern}
                      onChange={(val) => handleConfirmPatternComplete(val)}
                      onFinish={() => {
                        // Handle pattern completion if needed
                      }}
                      className="bg-danger ms-3 mt-3" // Add your custom clas
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger text-black "
                      onClick={resetConfirmPattern}
                    >
                      Reset Pattern
                    </button>
                  </CCardBody>
                </CCard>
              </CCardGroup>
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-outline-danger text-center">
                  Submit
                </button>
              </div>
            </form>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPatteern
