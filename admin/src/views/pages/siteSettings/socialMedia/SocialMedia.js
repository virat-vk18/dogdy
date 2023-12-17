import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { FaFacebook, FaWhatsapp, FaTelegram, FaInstagram } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import {
  useGetSiteSettingsURLMutation,
  useHandleSiteSettinsURLUpdateMutation,
} from './socialMediaApi'

const schema = yup.object().shape({
  faceBookUrl: yup
    .string()
    .required('Facebook URL Required!')
    .matches(
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i,
      'Please Enter Valid URL',
    ),
  whatsAppUrl: yup
    .string()
    .required('WhatsApp URL Required!')
    .matches(
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i,
      'Please Enter Valid URL',
    ),
  telegramUrl: yup
    .string()
    .required('Telegram URL Required!')
    .matches(
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i,
      'Please Enter Valid URL',
    ),
  instagramUrl: yup
    .string()
    .required('InstaGram URL Required!')
    .matches(
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i,
      'Please Enter Valid URL',
    ),
})

const SocialMedia = () => {
  const naviagte = useNavigate()
  // RTK
  const [updateURL] = useHandleSiteSettinsURLUpdateMutation()

  const [getSiteSettingsData] = useGetSiteSettingsURLMutation()

  // State

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useEffect(() => {
    const fetchSiteSetting = async () => {
      const response = await getSiteSettingsData()
      console.log(response)
      if (response.error) {
        return toast.error('URL Fetching Error', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      const URL = response.data.siteSettingsResponse
      if (!(URL === null)) {
        reset({
          faceBookUrl: URL.faceBookUrl,
          whatsAppUrl: URL.whatsAppUrl,
          telegramUrl: URL.telegramUrl,
          instagramUrl: URL.instagramUrl,
        })
        return
      }
    }
    fetchSiteSetting()
  }, [])

  const handelURLUpdate = async (siteURL) => {
    try {
      const response = await updateURL({ siteURL })
      if (response.error) {
        return toast.error('URL updated Error', {
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
            <strong>SITE_SETTINGS</strong>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit(handelURLUpdate)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <FaFacebook />
                </span>
                <input
                  type="url"
                  name="faceBookUrl"
                  className={`form-control ${errors.faceBookUrl ? 'is-invalid' : ''}`}
                  {...register('faceBookUrl')}
                  placeholder="Facebook Url"
                />
                <div className="invalid-feedback">{errors.faceBookUrl?.message}</div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <FaWhatsapp />
                </span>
                <input
                  type="url"
                  name="whatsAppUrl"
                  className={`form-control ${errors.whatsAppUrl ? 'is-invalid' : ''}`}
                  {...register('whatsAppUrl')}
                  placeholder="Whatsapp Url"
                />
                <div className="invalid-feedback">{errors.whatsAppUrl?.message}</div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <FaTelegram />
                </span>
                <input
                  type="url"
                  name="telegramUrl"
                  className={`form-control ${errors.telegramUrl ? 'is-invalid' : ''}`}
                  {...register('telegramUrl')}
                  placeholder="Telegram Url"
                />
                <div className="invalid-feedback">{errors.telegramUrl?.message}</div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <FaInstagram />
                </span>
                <input
                  type="url"
                  name="instagramUrl"
                  className={`form-control ${errors.instagramUrl ? 'is-invalid' : ''}`}
                  {...register('instagramUrl')}
                  placeholder="Instagram Url"
                />
                <div className="invalid-feedback">{errors.instagramUrl?.message}</div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">submit</button>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SocialMedia
