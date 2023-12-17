import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForgetPasswordVerifymailMutation } from '../forgotPattern/verifyEmailApi'
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
})
const VerifyEmailForgotPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const [verfiyEmail] = useForgetPasswordVerifymailMutation()
  const onSubmit = async (data) => {
    try {
      const response = await verfiyEmail(data)
      console.log(response)
      //   if (response.error) {
      //     toast.error(response.error.data.message)
      //   } else {
      //     toast.success(response.data.message)
      //     navigate('/twofaforgotpattern')
      //   }
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      const twoFactorStatus = response.data.adminData.authVerify
      localStorage.setItem('2FaAdminId', response.data.adminData._id)
      if (!twoFactorStatus) {
        navigate('/twofactorauth')
        return
      }
      navigate('/twofaforgotpassword')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="d-grid justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Verify Your Email</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row  ">
              <div className="form-group col">
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

            <div className="form-group d-grid mt-4">
              <button type="submit" className="btn btn-outline-danger mr-1">
                Verify Here..
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailForgotPassword
