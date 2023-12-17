import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useGetCopyRightMutation, useHandleSubmitCopyRightMutation } from './copyRightApi'

const schema = yup.object().shape({
  copyRight: yup.string().required('coptRight URL Required!'),
})

const Copyright = () => {
  const naviagte = useNavigate()
  // RTK
  const [handleSubmitCopyright] = useHandleSubmitCopyRightMutation()

  const [getCopyRight] = useGetCopyRightMutation()

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
      const response = await getCopyRight()
      console.log(response)
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      const data = response.data.getCopyRight
      if (!(data === null)) {
        reset({
          copyRight: data.CopyRight,
        })
        return
      }
    }
    fetchSiteSetting()
  }, [])

  const handleCopyRightSubmit = async (data) => {
    try {
      console.log(data.copyRight)
      const response = await handleSubmitCopyright({ data })
      if (response.data) {
        toast.success(response.data.message, { position: 'top-left' })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Copy Right Data</strong>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit(handleCopyRightSubmit)}>
              <div>
                <label htmlFor="copy">CopyRight</label>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  &copy;
                </span>
                <input
                  type="text"
                  name="copyRight"
                  className={`form-control ${errors.copyRight ? 'is-invalid' : ''}`}
                  {...register('copyRight')}
                  placeholder="CopyRight &copy; 2--1 Company name"
                />
                <div className="invalid-feedback">{errors.copyRight?.message}</div>
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

export default Copyright
