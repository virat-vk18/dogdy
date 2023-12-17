import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useGetTimeManagementMutation, useTimeManagementMutation } from './breedingApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const schema = yup.object().shape({
  timeManagement: yup
    .string()
    .required('Timer is required')
    .max(2, 'Only 2Number For Timer')
    .matches(/^([0-5]?[0-9])(●?[AP]M)?$/, ' minutes Only')
    .matches(/^\d+$/, 'Only a Number'),
})
const BreedingTime = () => {
  const [timeManagement] = useTimeManagementMutation()
  const [getTime] = useGetTimeManagementMutation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const [countDown, setCountDown] = useState(0)
  const [runTimer, setRunTimer] = useState(false)

  useEffect(() => {
    let timerId

    if (runTimer) {
      setCountDown(60 * 30)
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1)
      }, 1000)
    } else {
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [runTimer])

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false)
      setCountDown(0)
    }
  }, [countDown, runTimer])
  const togglerTimer = () => setRunTimer((t) => !t)

  const seconds = String(countDown % 60).padStart(2, 0)
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0)
  const onSubmit = async (data) => {
    try {
      const response = await timeManagement({ time: data.timeManagement })
      toast.success(response.data.message)
      navigate('/dashboard')
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    const handleTimer = async () => {
      const response = await getTime()

      reset({ timeManagement: response.data.timer.time })
    }
    handleTimer()
  }, [])

  return (
    <div>
      BreedingTime
      <div>
        Time: {minutes}:{seconds}
      </div>
      <button type="button" onClick={togglerTimer}>
        {runTimer ? 'Stop' : 'Start'}
      </button>
      <div className="card  border-primary m-3  mx-auto mt-5 loginWidth bg-transparent  ">
        <h5 className="card-header">
          <span className="text-primary">TimeManagement</span> Here
        </h5>
        <hr className="m-0" />
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row ">
              <div className="form-group col">
                <label className="fs-5">
                  Time For Breeding <span className="badge-danger">in Minutes</span>
                </label>
                <input
                  name="timeManagement"
                  type="text"
                  placeholder="00:08"
                  {...register('timeManagement')}
                  className={`form-control mt-3 mb-3 ${errors.timeManagement ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.timeManagement?.message}</div>
              </div>
            </div>

            <div className="form-group d-grid mt-4">
              <button type="submit" className="btn btn-outline-primary mr-1">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BreedingTime
