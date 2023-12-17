import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import colImg from '../../../assets/images/Mind map-pana.png'
import {
  useDisableTwoFactorVerifyMutation,
  useGetTwoFactorAuthenticationMutation,
  useTwoFactorVerifyMutation,
} from './2faApi.js'
import useClipboard from 'react-use-clipboard'
import { FaRegCopy } from 'react-icons/fa'
import OTPInput from 'otp-input-react'

const schema = Yup.object().shape({
  otp: Yup.string()
    .required('otp is required')
    .min(6, 'Enter Six Digits Number')
    .max(6, 'Invalid OTP')
    .trim(),
})
const TwoFactorAuthentication = () => {
  const navigate = useNavigate()

  const adminId = localStorage.getItem('2FaAdminId')
  //Rtk Query used here
  const [getTwoFactorData] = useGetTwoFactorAuthenticationMutation()
  const [verifyUserAuthCode] = useTwoFactorVerifyMutation()
  const [disableTwoFactor] = useDisableTwoFactorVerifyMutation()

  //useState declared here
  const [authCode, setAuthCode] = useState('')
  const [authQrCode, setAuthQrCode] = useState('')
  const [authVerifyStatus, setAuthVerifyStatus] = useState('')
  //THIRD PARTY NPM DECLARED HERE
  const [isCopied, setCopied] = useClipboard(authCode)
  const [OTP, setOTP] = useState('')

  //USEEFFECT USED HERE

  useEffect(() => {
    const handleTwoFactorAuth = async () => {
      try {
        const response = await getTwoFactorData({ id: adminId })
        console.log(response, '2fa')
        if (response.error) {
          return toast.error(response.error.data.message, {
            position: toast.POSITION.TOP_CENTER,
          })
        }

        setAuthVerifyStatus(response.data.twoFactorAuthData.authVerify)
        setAuthCode(response.data.authCode)
        setAuthQrCode(response.data.qrCodeImgSrc)
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
    }
    handleTwoFactorAuth()
  }, [])

  // React-Hook-Form used Here
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  //disAbling Two Factor Authentiacation Written Here
  const disableTwoFactorAuth = async () => {
    try {
      const response = await disableTwoFactor({ id: adminId })
      if (response.error) {
        return toast.error('Something Went Wrong', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  const copyText = () => {
    setCopied()
    toast.info('Text Copied', {
      position: toast.POSITION.TOP_CENTER,
    })
  }
  // verifying Authentication Fuction
  const verifyAuthCode = async (e) => {
    e.preventDefault()
    try {
      const response = await verifyUserAuthCode({ id: adminId, token: OTP })
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <div className="p-4 twoFactor-Bg" style={{ minHeight: '100vh' }}>
        <h1 className="text-center mb-5">Security</h1>
        <div className="row">
          {authVerifyStatus ? (
            <div className="col-lg-6">
              <p className="display-4 fw-bold">
                Google Authentication <span style={{ color: '#9ADE7B' }}>Verified</span>
              </p>
              <button
                type="button"
                onClick={disableTwoFactorAuth}
                className=" mt-4 btn btn-warning"
              >
                Disable
              </button>
            </div>
          ) : (
            <div className="col-lg-7">
              <form onSubmit={verifyAuthCode}>
                <div className="mb-5">
                  <p className="fw-bold">
                    Copy This Code Generate Authentication{' '}
                    <span role="button">
                      <FaRegCopy onClick={copyText} />
                    </span>
                  </p>
                  <p>{authCode}</p>
                  <div>
                    <>
                      <h5 className="mt-5 mb-3">Enter Your Authetication Key</h5>
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                      />
                    </>
                  </div>
                  <div className="d-grid my-3 ">
                    <button className="btn btn-dark " type="submit">
                      Verify
                    </button>
                  </div>
                </div>
              </form>
              <p>Scan Qr Code </p>
              <img src={authQrCode} alt="" />
            </div>
          )}
          <div className="col-lg-5">
            <img src={colImg} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default TwoFactorAuthentication
