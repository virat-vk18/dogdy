import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import otpImg from '../../../assets/images/Enter OTP-amico.png'
import { useLoginTwoFactorVerifyMutation } from './verifyEmailApi'

import OTPInput from 'otp-input-react'
// schema OTP validation

const TwoFactorAuth = () => {
  const navigate = useNavigate()
  // localStorage ID
  const adminId = localStorage.getItem('2FaAdminId')
  // RTK
  const [loginTwoFactorVerify] = useLoginTwoFactorVerifyMutation()

  const [authCode, setAuthCode] = useState('')

  // verify Fuction
  const verifyAuthCode = async (e) => {
    e.preventDefault()
    try {
      const response = await loginTwoFactorVerify({ id: adminId, token: authCode })
      console.log(response)
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/forgotpattern')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <div className="p-5 twoFactor-Bg" style={{ minHeight: '100vh' }}>
        <h1 className="text-center mb-5">Security</h1>
        <div className="row">
          <div className="col-lg-5">
            <form onSubmit={verifyAuthCode}>
              <div className=" mt-5">
                <div>
                  <>
                    <h5 className="mt-5 mb-3">Enter Your Authetication Key</h5>
                    <OTPInput
                      value={authCode}
                      onChange={setAuthCode}
                      autoFocus
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                    />
                  </>
                </div>
                <button className="btn mt-4 btn-dark " type="submit">
                  Verify
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-7">
            <img src={otpImg} className="img-fluid" width={'430px'} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default TwoFactorAuth
