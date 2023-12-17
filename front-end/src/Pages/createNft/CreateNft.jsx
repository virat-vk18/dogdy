import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNftCreateMutation } from "../walletApi/walletApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  nftImage: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "File size is too large", (value) => {
      return value.length && value[0].size <= 1024000;
    }),
  nftName: yup.string().required("nftName is required").trim(),
  age: yup.string().required("Age is required").trim(),
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
  // sellprice: yup.string().required("SellPrice is required").matches(/^\d+$/, "Only a Number").trim(),
  //   startprice: yup.string().required("startauction is required").matches(/^\d+$/, "Only a Number").trim(),
  // auctionend: yup.string().required("auctionend is required").matches(/^\d+$/, "Only a Number").trim(),
  // daystud: yup.string().required("StudFarm is required").matches(/^\d+$/, "Only a Number").trim(),
});

const CreateNft = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [activeTab, setActiveTab] = useState("1");
  const toggle1 = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [sellPrice, setSellPrice] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [auctionDays, setAuctionDays] = useState("");
  const [studFarmDays, setStudFarmDays] = useState("");

  const [modal1, setModal1] = useState(false);
  const toggle2 = () => setModal1(!modal1);

  const [modal2, setModal2] = useState(false);
  const toggle3 = () => setModal2(!modal2);

  const [modal3, setModal3] = useState(false);
  const toggle4 = () => setModal3(!modal3);

  const [modal4, setModal4] = useState(false);
  const toggle5 = () => setModal4(!modal4);

  const [modal5, setModal5] = useState(false);
  const toggle6 = () => setModal5(!modal5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nftCreate] = useNftCreateMutation();
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
  const handleImage = (e) => {
    console.log("function is triggering");
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  async function onSubmit(data) {
    // display form data on success
    const imageFile = data.nftImage[0];
    try {
      const formData = new FormData();
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
      formData.append("sellPrice", sellPrice);
      let result = await nftCreate(formData);
      if (result.error) {
        return toast.error(result.error.data.message);
      } else {
        toast.success(result.data.message);
        console.log("response" + result);
        return navigate("/market-place");
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
            <h1>Create NFT</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="crtPgBd">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-6">
                      {/* Upload NFT Image */}
                      <div className="form-group">
                        <label htmlFor="">Upload NFT Image</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="file"
                            onChange={(e) => handleImage(e)}
                            className={`form-control custom-file-input mb-3  ${
                              errors.nftImage ? "is-invalid" : ""
                            }`}
                            {...register("nftImage")}
                            id="customFile"
                          />
                          <label className="custom-file-label" for="customFile">
                            Choose NFT Image
                          </label>
                          <div className="invalid-feedback">
                            {errors.nftImage?.message}
                          </div>
                          {selectedFile && (
                            <p className="text-white">
                              Selected file: {selectedFile.name} (
                              {selectedFile.type})
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* NFT Name */}
                      <div className="form-group">
                        <label htmlFor="">NFT Name</label>
                        <input
                          type="text"
                          className={`form-control  mb-3  ${
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
                          className={`form-control mb-3  ${
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
                          {errors.gender?.age}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {/* Gender */}
                      <div className="form-group">
                        <label htmlFor="">Gender</label>
                        <select
                          className={`form-control mb-3  ${
                            errors.gender ? "is-invalid" : ""
                          }`}
                          {...register("gender")}
                        >
                          <option value="" className="text-black-50">
                            Select an option
                          </option>
                          <option value="Male" className="text-black-50">
                            Male
                          </option>
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
                          className={`form-control  mb-3  ${
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
                          className={`form-control  mb-3  ${
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
                          className={`form-control  mb-3  ${
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
                          className={`form-control  mb-3  ${
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
                          className={`form-control  mb-3  ${
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
                  {/* Type of Creation */}
                  {/* navs Tabs */}
                  <div className="PlyPgHdd stbl-tab dpuff">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "1" })}
                          onClick={() => {
                            toggle1("1");
                          }}
                        >
                          Sell
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "2" })}
                          onClick={() => {
                            toggle1("2");
                          }}
                        >
                          Auction
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "3" })}
                          onClick={() => {
                            toggle1("3");
                          }}
                        >
                          Stud Farm
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        {/* sell Fixed Price */}
                        <form>
                          <div className="form-group mt-3">
                            <label htmlFor="">Sell Fixed Price</label>
                            <input
                              type="text"
                              className="form-control  mb-3"
                              onChange={(e) => setSellPrice(e.target.value)}
                              // {`form-control  mb-3  ${
                              //               errors1.happiness ? "is-invalid" : ""
                              //             }`}
                              {...register("sellprice ")}
                              placeholder="Happiness like 18%"
                            />
                            <div className="invalid-feedback">
                              {/* {errors1.happiness?.message} */}
                            </div>
                          </div>
                        </form>
                      </TabPane>
                      <TabPane tabId="2">
                        <div className="row mt-3">
                          {/* Auction */}
                          <form>
                            <div className="row">
                              <div className="col-lg-6">
                                {/* Auction Start Price */}
                                <div className="form-group">
                                  <label htmlFor="">Start Price</label>
                                  <input
                                    type="text"
                                    className={`form-control  mb-3 `}
                                    onChange={(e) =>
                                      setAuctionPrice(e.target.value)
                                    }
                                    placeholder="Happiness like 18%"
                                  />
                                  <div className="invalid-feedback">
                                    {/* {errors.startprice?.message} */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                {/* auction Days */}
                                <div className="form-group">
                                  <label htmlFor="">Aucion Days</label>
                                  <input
                                    type="text"
                                    className={`form-control  mb-3 `}
                                    onChange={(e) =>
                                      setAuctionDays(e.target.value)
                                    }
                                    placeholder="Happiness like 18%"
                                  />
                                  <div className="invalid-feedback">
                                    {/* {errors.auctionend?.message} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </TabPane>
                      <TabPane tabId="3">
                        <div className="row mt-3">
                          <form>
                            <div className=" col-sm-12 ">
                              {/* stud */}
                              <div className="form-group">
                                <label htmlFor="">Stud</label>
                                <input
                                  type="text"
                                  className={`form-control  mb-3`}
                                  onChange={(e) =>
                                    setStudFarmDays(e.target.value)
                                  }
                                  placeholder="Happiness like 18%"
                                />
                                <div className="invalid-feedback">
                                  {/* {errors.daystud?.message} */}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
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
export default CreateNft;
