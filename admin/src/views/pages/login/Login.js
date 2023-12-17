import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillShieldFill, BsFillShieldSlashFill } from 'react-icons/bs'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PatternLock from 'react-pattern-lock'
import { useAdminLoginMutation } from './loginApi'
import { toast } from 'react-toastify'
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [pattern, setPattern] = useState([])
  const [adminLogin] = useAdminLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const handlePatternComplete = (value) => {
    // Do something with the completed pattern (e.g., store it in state)
    setPattern(value)
  }
  const resetPattern = () => {
    setPattern([])
  }
  const onSubmit = async (data) => {
    try {
      let adminData = {
        email: data.email,
        password: data.password,
        pattern,
      }
      const getAdminLogin = await adminLogin(adminData)
      if (getAdminLogin.error) {
        return toast.error(getAdminLogin.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      const twoFactorStatus = getAdminLogin.data.loginUser.authVerify
      if (!twoFactorStatus) {
        navigate('/twofactorauth')

        return
      }
      // const getId = getAdminLogin.data.
      localStorage.setItem('2FaAdminId', getAdminLogin.data.loginUser._id)
      localStorage.setItem('adminToken', getAdminLogin.data.adminToken)
      toast.success(getAdminLogin.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/twofalogin')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <div className="form-row  ">
                      <div className="form-group col">
                        <label className="fs-5">Email</label>
                        <input
                          name="email"
                          type="text"
                          placeholder="you@mail.com"
                          {...register('email')}
                          className={`form-control  mb-3 ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <label className=" fs-5">Password</label>

                        <div className="input-group">
                          <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password')}
                            placeholder="Password"
                          />
                          <span
                            className="input-group-text rounded-end-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <BsFillShieldFill /> : <BsFillShieldSlashFill />}
                          </span>
                          <div className="invalid-feedback">{errors?.password?.message}</div>
                        </div>
                        <p
                          onClick={() => navigate('/verifyemailforgotpassword')}
                          className="text-decoration-underline text-end"
                        >
                          Forgot Password
                        </p>
                      </div>
                    </div>

                    <div className="form-group d-grid mt-4">
                      <button type="submit" className="btn btn-outline-danger mr-1">
                        Login
                      </button>
                    </div>
                  </form>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-danger py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <label className="fs-5">Unlock your PatternLock</label>
                  <PatternLock
                    width={230}
                    pointSize={10}
                    size={3}
                    path={pattern}
                    onChange={(val) => handlePatternComplete(val)}
                    onFinish={() => {
                      // Handle pattern completion if needed
                    }}
                    className="bg-danger ms-3 mt-3" // Add your custom clas
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger text-black "
                    onClick={resetPattern}
                  >
                    Reset Pattern
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger text-black "
                    onClick={() => navigate('/verifyemailforgotpattern')}
                  >
                    Forgot Pattern
                  </button>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
