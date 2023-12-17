import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import resetPassword from '../../../assets/images/Reset password-bro.png'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillShieldFill, BsFillShieldSlashFill } from 'react-icons/bs'
import { BiRightArrowAlt } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAdminChangePasswordMutation } from '../forgotPattern/verifyEmailApi'

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Old Password is required!')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'password reached maximum limit ')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      'Enter Valid Password',
    ),
  newPassword: yup
    .string()
    .required('New Password is required!')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'password reached maximum limit ')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      'Enter Valid Password',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required!')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'password reached maximum limit ')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      'Enter Valid Password',
    ),
})

const ChangePassword = () => {
  const [handlechangepassword] = useAdminChangePasswordMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [icon, seticon] = useState(false)
  const adminId = localStorage.getItem('2FaAdminId')

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (data) => {
    const response = await handlechangepassword({ data, id: adminId })
    console.log(response)
    try {
      if (response.error) {
        toast.error(response.error.data.message)
      } else {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 4000)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-success">Change password</h2>
                    <p className=" text-success input-group-text">
                      Change Your Password To Secure Your Account
                    </p>
                    <div className="form-row">
                      <div className="form-group col">
                        <label className=" fs-5">Old Password</label>
                        <div className="input-group">
                          <input
                            name="oldPassword"
                            type={icon ? 'text' : 'password'}
                            className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                            {...register('oldPassword')}
                            placeholder="Password"
                          />
                          <span
                            className="input-group-text rounded-end-3"
                            onClick={() => seticon(!icon)}
                          >
                            {icon ? <BsFillShieldFill /> : <BsFillShieldSlashFill />}
                          </span>
                          <div className="invalid-feedback">{errors?.oldPassword?.message}</div>
                        </div>
                      </div>
                    </div>

                    <label className=" fs-5 mt-3">New Password</label>
                    <div className="input-group">
                      <input
                        name="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                        {...register('newPassword')}
                        placeholder="Password"
                      />
                      <span
                        className="input-group-text rounded-end-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BsFillShieldFill /> : <BsFillShieldSlashFill />}
                      </span>
                      <div className="invalid-feedback">{errors?.newPassword?.message}</div>
                    </div>

                    <label className=" fs-5 mt-3">Confirm New Password</label>
                    <div className="input-group">
                      <input
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        {...register('confirmPassword')}
                        placeholder="Password"
                      />
                      <span
                        className="input-group-text rounded-end-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BsFillShieldFill /> : <BsFillShieldSlashFill />}
                      </span>
                      <div className="invalid-feedback">{errors?.confirmPassword?.message}</div>
                    </div>

                    <div className="form-group d-grid mt-4">
                      <button type="submit" className="btn btn-success mr-1">
                        submit <BiRightArrowAlt />
                      </button>
                    </div>
                  </form>
                </CCardBody>
              </CCard>

              <ToastContainer />
            </CCardGroup>
          </CCol>
          <CCol md={6}>
            <img src={resetPassword} alt="" className="img-fluid" />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ChangePassword
