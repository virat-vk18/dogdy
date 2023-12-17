import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { useSellCreateMutation } from "../walletApi/walletApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { connectMetamask } from "../../redux/feature/connectWalletSlice";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
  nftImage: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "File size is too large", (value) => {
      return value.length && value[0].size <= 1024000;
    }),
  nftName: yup.string().required("nftName is required").trim(),
  age: yup.string().required("Age is required"),
  gender: yup.string().required("Gender is Required"),
  feeding: yup
    .string()
    .required("feeding is required")
    .matches(/^\d+$/, "Only a Number")
    .max(2, "Maximum two Digits Only")
    .trim(),
  physicalcondition: yup
    .string()
    .required("physicalcondition is required")
    .matches(/^\d+$/, "Only a Number")
    .max(2, "Maximum two Digits Only")
    .trim(),
  intelligence: yup
    .string()
    .required("intelligence is required")
    .matches(/^\d+$/, "Only a Number")
    .max(2, "Maximum two Digits Only")
    .trim(),
  stregenth: yup
    .string()
    .required("stregenth is required")
    .matches(/^\d+$/, "Only a Number")
    .max(2, "Maximum two Digits Only")
    .trim(),
  speed: yup
    .string()
    .required("speed is required")
    .matches(/^\d+$/, "Only a Number")
    .max(2, "Maximum two Digits Only")
    .trim(),
  agility: yup
    .string()
    .required("agility is required")
    .matches(/^\d+$/, "Only a Number")
    .max(2, "Maximum two Digits Only")
    .trim(),
  description: yup.string().required("Description is Required").trim(),
  happiness: yup
    .string()
    .required("happiness is Required")
    .matches(/^\d+$/, "Only a Number")
    .max(2)
    .trim(),
  typeofsale: yup.string().required("Type of sale is required"),
  // sellprice: yup.string().required("SellPrice is required").matches(/^\d+$/, "Only a Number").trim(),
  //   startprice: yup.string().required("startauction is required").matches(/^\d+$/, "Only a Number").trim(),
  // auctionend: yup.string().required("auctionend is required").matches(/^\d+$/, "Only a Number").trim(),
  // daystud: yup.string().required("StudFarm is required").matches(/^\d+$/, "Only a Number").trim(),
});

const SellNft = () => {
  const [showDiv, setShowDiv] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellCreate] = useSellCreateMutation();
  const { currentUserId } = useSelector(connectMetamask);
  console.log(currentUserId);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  // Image Function

  const handleDivChange = (e) => {
    if (e.target.value === " ") {
      return toast.error("Sell Price is Required");
    } else {
      return setShowDiv(e.target.value);
    }
  };
  console.log();
  async function onSubmit(data) {
    // display form data on success
    console.log(data);
    const number = /^[0-9\b]+$/;
    const imageFile = data.nftImage[0];

    if (showDiv === "Sell Creation") {
      if (!number.test(sellPrice)) {
        toast.error("Sell_price Only Number");
        return;
      }

      if (sellPrice.length == 0) {
        toast.error("Sell_price is Empty");
        return;
      }
    }
    try {
      const formData = new FormData();

      const MATIC = parseFloat(sellPrice).toFixed(2);

      formData.append("nftImage", imageFile);
      formData.append("nftName", data.nftName);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("feeding", data.feeding);
      formData.append("physicalcondition", data.physicalcondition);
      formData.append("intelligence", data.intelligence);
      formData.append("stregenth", data.stregenth);
      formData.append("speed", data.speed);
      formData.append("agility", data.agility);
      formData.append("description", data.description);
      formData.append("happiness", data.happiness);
      if (showDiv === "Sell Creation") {
        formData.append("sellprice", MATIC);
      }
      formData.append("typeofsale", data.typeofsale);
      formData.append("ownedby", currentUserId);
      let result = await sellCreate(formData);
      if (result.error) {
        return toast.error(result.error.data.message);
      } else {
        toast.success(result.data.message);
        console.log("response" + result);
        return navigate("/my-stable");
      }
    } catch (error) {
      console.error("Error adding Nft:", error);
    }
  }
  return (
    <>
      <Header />
      <div className="crtPg">
        <div className="container">
          <div className="crtPgHd">
            <h1>Create NFT SELL CREATION</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="crtPgBd">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6">
                      {/* Upload NFT Image */}
                      <div className="form-group">
                        <label htmlFor="">Upload NFT Image</label>
                        <div className="custom-file">
                          {/* <img alt="" src={uploadImg} />
                          <input
                            type="file"
                            name="file"
                            {...register("screenShotImg")}
                            className={`form-control py-4 ${
                              errors.screenShotImg ? "is-invalid" : ""
                            }`}
                            onChange={(e) => handleImage(e)}
                            // onChange={(e) =>
                            //   handleFileChange(e, setScreeShotImg)
                            // }
                          /> */}
                          <input
                            type="file"
                            name="file"
                            className={`form-control  text-white custom-file-input   ${
                              errors.nftImage ? "is-invalid" : ""
                            }`}
                            {...register("nftImage")}
                            id="customFile"
                          />
                          <label
                            className="custom-file-label text-white"
                            htmlFor="customFile"
                          >
                            Choose Image
                          </label>
                          <div className="invalid-feedback">
                            {errors.nftImage?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* NFT Name */}
                      <div className="form-group">
                        <label htmlFor="">NFT Name</label>
                        <input
                          type="text"
                          className={`form-control   ${
                            errors.nftName ? "is-invalid" : ""
                          }`}
                          {...register("nftName")}
                          placeholder="Name your NFT"
                        />
                        <div className="invalid-feedback">
                          {errors.nftName?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      {/* Age */}
                      <div className="form-group">
                        <label htmlFor="">Age</label>
                        <select
                          className={`form-control  ${
                            errors.age ? "is-invalid" : ""
                          }`}
                          {...register("age")}
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
                          <option
                            value="German Shepherd"
                            className="text-black-50"
                          >
                            German Shepherd
                          </option>
                          <option
                            value="  American Pit Bull Terrier"
                            className="text-black-50"
                          >
                            American Pit Bull Terrier
                          </option>
                          <option
                            value="Siberian Husky"
                            className="text-black-50"
                          >
                            Siberian Husky
                          </option>
                          <option value="Boxer" className="text-black-50">
                            Boxer
                          </option>
                          <option value="Bulldog" className="text-black-50">
                            Bulldog
                          </option>
                          <option
                            value="American Bully"
                            className="text-black-50"
                          >
                            American Bully
                          </option>
                        </select>
                        <div className="invalid-feedback">
                          {errors.age?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* Gender */}
                      <div className="form-group">
                        <label htmlFor="">Gender</label>
                        <select
                          className={`form-control   ${
                            errors.gender ? "is-invalid" : ""
                          }`}
                          {...register("gender")}
                        >
                          <option value="" className="text-black-50">
                            Select an option
                          </option>
                          {showDiv === "Breed Creation" ? (
                            " "
                          ) : (
                            <option value="Male" className="text-black-50">
                              Male
                            </option>
                          )}
                          <option value="Female" className="text-black-50">
                            Female
                          </option>
                        </select>
                        <div className="invalid-feedback">
                          {errors.gender?.message}
                        </div>
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
                          className={`form-control   ${
                            errors.feeding ? "is-invalid" : ""
                          }`}
                          {...register("feeding")}
                          placeholder="it feed around 70%"
                        />
                        <div className="invalid-feedback">
                          {errors.feeding?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* physicalcondition */}
                      <div className="form-group">
                        <label htmlFor="">Physical Condition</label>
                        <input
                          type="text"
                          className={`form-control   ${
                            errors.physicalcondition ? "is-invalid" : ""
                          }`}
                          placeholder="Physical Condition like 18%"
                          {...register("physicalcondition")}
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
                          className={`form-control    ${
                            errors.intelligence ? "is-invalid" : ""
                          }`}
                          {...register("intelligence")}
                          placeholder="Intelligence like 18%"
                        />
                        <div className="invalid-feedback">
                          {errors.intelligence?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* stregenth */}
                      <div className="form-group">
                        <label htmlFor="">Stregenth</label>
                        <input
                          type="text"
                          className={`form-control   ${
                            errors.stregenth ? "is-invalid" : ""
                          }`}
                          {...register("stregenth")}
                          placeholder="Stregenth like 18%"
                        />
                        <div className="invalid-feedback">
                          {errors.stregenth?.message}
                        </div>
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
                          className={`form-control    ${
                            errors.speed ? "is-invalid" : ""
                          }`}
                          {...register("speed")}
                          placeholder="Speed like 18%"
                        />
                        <div className="invalid-feedback">
                          {errors.speed?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* agility */}
                      <div className="form-group">
                        <label htmlFor="">Agility</label>
                        <input
                          type="text"
                          className={`form-control  mb-3  ${
                            errors.agility ? "is-invalid" : ""
                          }`}
                          {...register("agility")}
                          placeholder="Agility like 18%"
                        />
                        <div className="invalid-feedback">
                          {errors.agility?.message}
                        </div>
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
                            errors.description ? "is-invalid" : ""
                          }`}
                          {...register("description")}
                          placeholder="Description Write Something about Dog%"
                        />
                        <div className="invalid-feedback">
                          {errors.description?.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* happiness */}
                      <div className="form-group">
                        <label htmlFor="">Happiness</label>
                        <input
                          type="text"
                          className={`form-control  mb-3  ${
                            errors.happiness ? "is-invalid" : ""
                          }`}
                          {...register("happiness")}
                          placeholder="Happiness like 18%"
                        />
                        <div className="invalid-feedback">
                          {errors.happiness?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {/* Age */}
                    <div className="form-group">
                      <label htmlFor="">Type Of Sale</label>
                      <select
                        className={`form-control mb-3  ${
                          errors.typeofsale ? "is-invalid" : ""
                        }`}
                        {...register("typeofsale")}
                        onChange={(e) => handleDivChange(e)}
                      >
                        <option className="text-black-50" value="">
                          Select an option
                        </option>
                        <option value="Sell Creation" className="text-black-50">
                          Sell Creation
                        </option>
                        <option
                          value="Breed Creation"
                          className="text-black-50"
                        >
                          Breed Creation
                        </option>
                      </select>
                      <div className="invalid-feedback">
                        {errors.typeofsale?.message}
                      </div>
                    </div>
                  </div>
                  {/* Type of Creation */}
                  {showDiv === "Sell Creation" ? (
                    <div className="form-group">
                      <label htmlFor="">Sell Price </label>
                      <input
                        type="text"
                        className={`form-control`}
                        onChange={(e) => setSellPrice(e.target.value)}
                        placeholder="Sellprice like 1.025"
                      />
                      {/* <div className="invalid-feedback">
                        {errors.sellprice?.message}
                      </div> */}
                    </div>
                  ) : showDiv === "Breed Creation" ? (
                    <p className="text-white">
                      Note :
                      <span className=" text-warning mx-1">
                        Breeding Feamle Only Recive pet(or) Mystrey Box
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="form-group text-center">
                    <button className="btn btnSbm">Create</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SellNft;
