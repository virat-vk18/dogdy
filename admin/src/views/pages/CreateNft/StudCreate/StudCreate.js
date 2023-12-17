import React from 'react'
// import Footer from '../../Components/Footer/Footer'
// import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
// import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { useStudCreateMutation } from '../walletApi/walletApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useStudCreateMutation } from '../createNftApi'
// import { connectMetamask } from '../../redux/feature/connectWalletSlice'
// import { useSelector } from 'react-redux'

const validationSchema = yup.object().shape({
  nftImage: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      return value.length && value[0].size <= 1024000
    })
    .required('File is Required'),
  nftName: yup.string().required('nftName is required').trim(),
  age: yup.string().required('Age is required').trim(),
  gender: yup.string().required('Gender is Required'),
  feeding: yup
    .string()
    .required('feeding is required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2, 'Maximum two Digits Only')
    .trim(),
  physicalcondition: yup
    .string()
    .required('physicalcondition is required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2, 'Maximum two Digits Only')
    .trim(),
  intelligence: yup
    .string()
    .required('intelligence is required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2, 'Maximum two Digits Only')
    .trim(),
  stregenth: yup
    .string()
    .required('stregenth is required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2, 'Maximum two Digits Only')
    .trim(),
  speed: yup
    .string()
    .required('speed is required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2, 'Maximum two Digits Only')
    .trim(),
  agility: yup
    .string()
    .required('agility is required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2, 'Maximum two Digits Only')
    .trim(),
  description: yup.string().required('Description is Required').trim(),
  happiness: yup
    .string()
    .required('happiness is Required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2)
    .trim(),
  studfarmdays: yup.date().required('StudFarmDays is Required'),
  breedfee: yup
    .string()
    .required('breedFee is Required')
    .matches(/^\d+$/, 'Only a Number')
    .max(2)
    .trim(),
  // sellprice: yup.string().required("SellPrice is required").matches(/^\d+$/, "Only a Number").trim(),
  //   startprice: yup.string().required("startauction is required").matches(/^\d+$/, "Only a Number").trim(),
  // auctionend: yup.string().required("auctionend is required").matches(/^\d+$/, "Only a Number").trim(),
  // daystud: yup.string().required("StudFarm is required").matches(/^\d+$/, "Only a Number").trim(),
})

const StudCreate = () => {
  const [studCreate] = useStudCreateMutation()
  const currentUserId = localStorage.getItem('2FaAdminId')
  //   const [studCreate] = useStudCreateMutation()
  //   const { currentUserId } = useSelector(connectMetamask)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })
  // Image Function
  //   const handleImage = (e) => {
  //     console.log('function is triggering')
  //     const file = e.target.files[0]
  //     setSelectedFile(file)
  //   }
  async function onSubmit(data) {
    console.log(data, 'sdffcdufh')
    // display form data on success
    const imageFile = data.nftImage[0]
    const MATIC = parseFloat(data.breedfee).toFixed(2)
    try {
      const formData = new FormData()
      formData.append('nftImage', imageFile)
      formData.append('nftName', data.nftName)
      formData.append('age', data.age)
      formData.append('gender', data.gender)
      formData.append('feeding', data.feeding)
      formData.append('physicalcondition', data.physicalcondition)
      formData.append('intelligence', data.intelligence)
      formData.append('stregenth', data.stregenth)
      formData.append('speed', data.speed)
      formData.append('agility', data.agility)
      formData.append('description', data.description)
      formData.append('happiness', data.happiness)
      formData.append('studfarmdays', data.studfarmdays)
      formData.append('breedfee', MATIC)
      formData.append('ownedby', currentUserId)
      let result = await studCreate(formData)
      if (result.error) {
        return toast.error(result.error.data.message)
      } else {
        toast.success(result.data.message)
        console.log('response' + result)
        return navigate('/market-place')
      }
    } catch (error) {
      console.error('Error adding Nft:', error)
    }
  }
  return (
    <div>
      <div>
        {/* <Header /> */}
        <div className="crtPg">
          <div className="container">
            <div className="crtPgHd">
              <h1>STUD FARM NFT CREATION</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="crtPgBd">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        {/* Upload NFT Image */}
                        <div className="form-group">
                          <label htmlFor="">Upload NFT Image</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="file"
                              //   onChange={(e) => handleImage(e)}
                              className={`form-control custom-file-input mb-3  ${
                                errors.nftImage ? 'is-invalid' : ''
                              }`}
                              {...register('nftImage', { required: 'Nft Image Is Required' })}
                              id="customFile"
                            />

                            <div className="invalid-feedback">{errors.nftImage?.message}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/* NFT Name */}
                        <div className="form-group">
                          <label htmlFor="">NFT Name</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${errors.nftName ? 'is-invalid' : ''}`}
                            {...register('nftName')}
                            placeholder="Name your NFT"
                          />
                          <div className="invalid-feedback">{errors.nftName?.message}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* Age */}
                        <div className="form-group">
                          <label htmlFor="">Age</label>
                          <select
                            className={`form-control mb-3  ${errors.age ? 'is-invalid' : ''}`}
                            {...register('age')}
                          >
                            <option value="" className="text-black-50">
                              Select an option
                            </option>
                            <option value="Puppy" className="text-black-50">
                              Puppy
                            </option>
                            <option value="Rottweiler" className="text-black-50">
                              Rottweiler
                            </option>
                            <option value="German Shepherd" className="text-black-50">
                              German Shepherd
                            </option>
                            <option value="  American Pit Bull Terrier" className="text-black-50">
                              American Pit Bull Terrier
                            </option>
                            <option value="Siberian Husky" className="text-black-50">
                              Siberian Husky
                            </option>
                            <option value="Boxer" className="text-black-50">
                              Boxer
                            </option>
                            <option value="Bulldog" className="text-black-50">
                              Bulldog
                            </option>
                            <option value="American Bully" className="text-black-50">
                              American Bully
                            </option>
                          </select>
                          <div className="invalid-feedback">{errors.gender?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/* Gender */}
                        <div className="form-group">
                          <label htmlFor="">Gender</label>
                          <select
                            className={`form-control mb-3  ${errors.gender ? 'is-invalid' : ''}`}
                            {...register('gender')}
                          >
                            <option value="" className="text-black-50">
                              Select an option
                            </option>
                            <option value="Male" className="text-black-50">
                              Male
                            </option>
                          </select>
                          <div className="invalid-feedback">{errors.gender?.message}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* Feeding */}
                        <div className="form-group">
                          <label htmlFor="">Feeding</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${errors.feeding ? 'is-invalid' : ''}`}
                            {...register('feeding')}
                            placeholder="it feed around 70%"
                          />
                          <div className="invalid-feedback">{errors.feeding?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/* physicalcondition */}
                        <div className="form-group">
                          <label htmlFor="">Physical Condition</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${
                              errors.physicalcondition ? 'is-invalid' : ''
                            }`}
                            placeholder="Physical Condition like 18%"
                            {...register('physicalcondition')}
                          />
                          <div className="invalid-feedback">
                            {errors.physicalcondition?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* intelligence */}
                        <div className="form-group">
                          <label htmlFor="">Intelligence</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${
                              errors.intelligence ? 'is-invalid' : ''
                            }`}
                            {...register('intelligence')}
                            placeholder="Intelligence like 18%"
                          />
                          <div className="invalid-feedback">{errors.intelligence?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/* stregenth */}
                        <div className="form-group">
                          <label htmlFor="">Stregenth</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${
                              errors.stregenth ? 'is-invalid' : ''
                            }`}
                            {...register('stregenth')}
                            placeholder="Stregenth like 18%"
                          />
                          <div className="invalid-feedback">{errors.stregenth?.message}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* speed */}
                        <div className="form-group">
                          <label htmlFor="">Speed</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${errors.speed ? 'is-invalid' : ''}`}
                            {...register('speed')}
                            placeholder="Speed like 18%"
                          />
                          <div className="invalid-feedback">{errors.speed?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/* agility */}
                        <div className="form-group">
                          <label htmlFor="">Agility</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${errors.agility ? 'is-invalid' : ''}`}
                            {...register('agility')}
                            placeholder="Agility like 18%"
                          />
                          <div className="invalid-feedback">{errors.agility?.message}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* description */}
                        <div className="form-group">
                          <label htmlFor="">Description</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${
                              errors.description ? 'is-invalid' : ''
                            }`}
                            {...register('description')}
                            placeholder="Description Write Something about Dog%"
                          />
                          <div className="invalid-feedback">{errors.description?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/* happiness */}
                        <div className="form-group">
                          <label htmlFor="">Happiness</label>
                          <input
                            type="text"
                            className={`form-control  mb-3  ${
                              errors.happiness ? 'is-invalid' : ''
                            }`}
                            {...register('happiness')}
                            placeholder="Happiness like 18%"
                          />
                          <div className="invalid-feedback">{errors.happiness?.message}</div>
                        </div>
                      </div>
                    </div>
                    {/* Type of Creation */}
                    <div className="form-group">
                      <label htmlFor="">Stud Farm Days </label>
                      <input
                        name="userDoB"
                        type="date"
                        {...register('studfarmdays')}
                        className={`form-control py-0 ${errors.studfarmdays ? 'is-invalid' : ''}`}
                        placeholder="Date of Birth"
                        max="2023-12-30"
                        min="2023-12-07"
                      />
                      {/* <input
                      type="text"
                      className={`form-control  mb-3  ${
                        errors.studfarmdays ? "is-invalid" : ""
                      }`}
                      {...register("studfarmdays")}
                      placeholder="StudFarm is like 10 Days"
                    /> */}
                      <div className="invalid-feedback">{errors.studfarmdays?.message}</div>
                    </div>
                    {/* Type of Creation */}
                    <div className="form-group">
                      <label htmlFor="">Breed Fee </label>
                      <input
                        type="text"
                        className={`form-control  mb-3  ${errors.breedfee ? 'is-invalid' : ''}`}
                        {...register('breedfee')}
                        placeholder="StudFarm is like 10 Days"
                      />
                      <div className="invalid-feedback">{errors.breedfee?.message}</div>
                    </div>
                    <div className="form-group text-center">
                      <button className="btn btnSbm btn btn-dark">Create</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default StudCreate
