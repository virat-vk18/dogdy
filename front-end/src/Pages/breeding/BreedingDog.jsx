import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useMyDogDetailsPageMutation } from "../Market/marketApi";
import { toast } from "react-toastify";
import {
  useCompletedBreedMutation,
  useFemaleDogMutation,
  useFemaleDogsBreedingMutation,
  useGetTimeForBreedMutation,
  useGetTimeManagementMutation,
} from "./breedingApi";
import noData from "../../assets/images/NoData/No data-cuate.png";
import { useCountdown } from "./hook/breedingTimerHook";
const BreedingDog = () => {
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const [maleDog, setMaleDog] = useState("");
  const [femaleDog, setFemaleDog] = useState([]);
  const [breedFemale, setBreedFemale] = useState(null);
  const [femaleSelected, setFemaleSelected] = useState(false);
  const [timerLogicData, setTimerLogicData] = useState("");
  const [expireLogicData, setExpireLogicData] = useState("");

  const navigate = useNavigate();
  const toggle = () => setModal(!modal);

  const [getMyDogs] = useMyDogDetailsPageMutation();
  const [getFemaleDog] = useFemaleDogsBreedingMutation();
  const [getTime] = useGetTimeManagementMutation();
  const [getFemale] = useFemaleDogMutation();
  const [getTimer] = useGetTimeForBreedMutation();
  const [completedBreed] = useCompletedBreedMutation();
  useEffect(() => {
    try {
      const handleDog = async () => {
        const specifiedDogs = await getMyDogs({ id });
        const getResponseDogs = specifiedDogs.data?.studDogs;
        setMaleDog(getResponseDogs);

        const femaleDogs = await getFemaleDog();

        setFemaleDog(femaleDogs.data?.femaleDogs);
      };
      handleDog();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }, []);

  const handleFemaleDog = async (id) => {
    try {
      console.log(id);
      const response = await getFemale({ id: id });
      setBreedFemale(response.data.femaleDogs);
      setModal(false);

      setFemaleSelected(true);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleBreed = async () => {
    try {
      // Same Owner Can't Breed They're  Dog Logic
      if (maleDog.ownedby === breedFemale.ownedby) {
        toast.error("Same Owner Can't Breed They're Own Dog");
        setBreedFemale(null);
        setFemaleSelected(false);
        return;
      }
      //Timer Management From Admin
      const data = {
        maleDogId: maleDog._id,
        femaleDogId: breedFemale._id,
        maleDogOwnerId: maleDog.ownedby,
        femaleDogOwnerId: breedFemale.ownedby,
      };
      const getResponseTime = await getTime(data);
      console.log(getResponseTime);
      if (getResponseTime.error) {
        return toast.error(getResponseTime.error.data.message);
      }
      if (getResponseTime.data.setOwnerForBreed) {
        toast.success(getResponseTime.data.message);
        localStorage.setItem(
          "CurrentBreeding",
          getResponseTime.data.setOwnerForBreed._id
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const localOnBreed = localStorage.getItem("CurrentBreeding");
  useEffect(() => {
    const handleGetTimer = async () => {
      const response = await getTimer({ id: localOnBreed });
      let createTimer;
      let expireTimer;
      if (response.data?.findTimer) {
        createTimer = response.data.findTimer.createdAt;
        expireTimer = response.data.findTimer.expiresIn;
      }
      setTimerLogicData(createTimer);
      setExpireLogicData(expireTimer);
    };
    handleGetTimer();
  }, [localOnBreed]);
  const [minutes, seconds] = useCountdown(expireLogicData, timerLogicData);

  useEffect(() => {
    const breedCompleted = async () => {
      console.log(breedFemale);
      const data = {
        id: localOnBreed,
      };
      const getResponseCompletedBreed = await completedBreed(data);
      console.log(getResponseCompletedBreed, "Response For Complete Breed");
      localStorage.removeItem("CurrentBreeding");
    };
    if (minutes + seconds <= 0) {
      console.log("minutes Decresed");
      breedCompleted();
    }
  }, [minutes]);

  return (
    <>
      <Header />
      {localOnBreed ? (
        <div className=" text-white ">
          <div className="d-flex justify-content-center align-items-center vh-50">
            <h1>Current Breed Time Left</h1>
          </div>
          <div className="d-flex justify-content-center ">
            <div>
              <h2 className="d-inline">{minutes}</h2>
              <h2 className="d-inline">:</h2>
              <h2 className="d-inline">{seconds}</h2>
            </div>
            <div className="d-grid mx-4">
              <button
                type="button"
                className=" ms-4 btn btn-warning"
                onClick={() => navigate("/")}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {maleDog === "" ? (
            <h4>No Data to Show </h4>
          ) : (
            <section class="pt-xl-5 pt-3 py-xl-5">
              <div class="container mt-xl-5 pt-xl-5">
                <div class="mb-2">
                  <a
                    onClick={() => navigate("/breeding")}
                    class="text-white bck_btn"
                  >
                    <span>
                      <img
                        class=""
                        src="/static/assets/images/market-place/back-arrow.svg"
                        alt=""
                      />
                    </span>
                    Go Back
                  </a>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <h5 class="text-white text-center f-30 mb-5 d-block kids text-uppercase ">
                      breeding
                    </h5>
                  </div>
                </div>
                <div class="row pb-5 align-items-center position-relative">
                  <div class="p-0 detail">
                    <ul class="text-white">
                      <li>{maleDog?.nftName}</li>
                      <li>Z39 {maleDog?.age}</li>
                      <li>{maleDog?.gender}</li>
                      <li>Stregenth : {maleDog?.stregenth}</li>
                    </ul>
                  </div>

                  <div class="col-sm-12 col-lg-5 col-md-12 col-xl-5">
                    <div class="black-border p-3 w-dog text-center mr-auto">
                      <label class="f-14 fw-400 text-white sen">
                        {maleDog?.nftName}
                        <span class="ml-2 f-14 danger-text">1505</span>
                      </label>
                      <label class="f-16 fw-400 text-grey sen">
                        Glue is a Colt andhe is ready to mate.
                      </label>
                    </div>
                    <div class="text-center pb-4 margin-4">
                      <img
                        src={`http://localhost:3991/${maleDog?.nftImage}`}
                        alt=" "
                        class="position-img1 d-block m-auto img-fluid "
                      />
                      <img
                        src="/static/assets/images/market-place/stone-b.svg "
                        alt=" "
                        class="mix-bled img-fluid "
                      />
                    </div>
                    <div class="black-border p-3 text-center w-50 m-auto">
                      <label class="f-14 fw-400 d-block text-white sen">
                        PERFORMANCE
                      </label>
                      <label class="f-14 fw-400  d-block  text-white sen">
                        {maleDog?.feeding} 2/{maleDog?.intelligence}/
                        {maleDog?.speed} W 11.11%
                      </label>
                      <label class="f-16 fw-400  d-block  text-grey sen">
                        0 3 of 3 left
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-12 col-lg-2 col-md-12 col-xl-2 text-center">
                    <img
                      src="/static/assets/images/heart.svg "
                      alt=" "
                      class="img-fluid my-4"
                    />
                    {femaleSelected === true ? (
                      <button className="btn btn-warning" onClick={handleBreed}>
                        Breed
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="col-sm-12 col-lg-5 col-md-12 col-xl-5 ">
                    {breedFemale === null ? (
                      <div
                        class="black-border py-4 w-dog text-center ml-auto"
                        onClick={toggle}
                        role="button"
                      >
                        <label
                          class="f-20 fw-400 text-yellow sen"
                          role="button"
                        >
                          Select Female
                        </label>
                      </div>
                    ) : (
                      <div class="black-border p-3 w-dog text-center mr-auto">
                        <label class="f-14 fw-400 text-white sen">
                          {breedFemale?.nftName}
                          <span class="ml-2 f-14 danger-text">1505</span>
                        </label>
                        <label class="f-16 fw-400 text-grey sen">
                          Glue is a Colt andhe is ready to mate.
                        </label>
                      </div>
                    )}
                    <div class="text-center pb-4 margin-r-4">
                      {breedFemale === null ? (
                        <img
                          src="/static/assets/images/black-dog.svg"
                          alt=" "
                          class="position-img1 d-block m-auto img-fluid "
                        />
                      ) : (
                        <img
                          src={`http://localhost:3991/${breedFemale?.nftImage}`}
                          alt=" "
                          class="position-img1 d-block m-auto img-fluid "
                        />
                      )}
                      <img
                        src="/static/assets/images/market-place/stone-b.svg"
                        alt=" "
                        class="mix-bled img-fluid "
                      />
                    </div>
                    <div class="black-border p-3 text-center  w-50 m-auto h-33">
                      <label class="f-14 fw-400 d-block text-white sen">
                        PERFORMANCE
                      </label>
                      <label class="f-14 fw-400  d-block  text-white sen">
                        {breedFemale?.feeding} 2/{breedFemale?.intelligence}/
                        {breedFemale?.speed} W 11.11%
                      </label>
                      <label class="f-16 fw-400  d-block  text-grey sen">
                        0 3 of 3 left
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {maleDog === "" ? (
            <h4>No data to Show</h4>
          ) : (
            <Modal
              isOpen={modal}
              toggle={toggle}
              className={"modal-md"}
              modalClassName="email-bg1"
              contentClassName="email-bg"
              centered={true}
            >
              <ModalHeader
                toggle={toggle}
                className="justify-content-center border-0 pt-5 text-center "
              >
                {breedFemale === null ? (
                  <h4
                    id="dialog-static-name "
                    class="modal-title text-white pull-left kids text-uppercase "
                  >
                    Select Female
                  </h4>
                ) : (
                  <div class="black-border p-3 w-dog text-center mr-auto">
                    <label class="f-14 fw-400 text-white sen">
                      {maleDog?.nftName}
                      <span class="ml-2 f-14 danger-text">1505</span>
                    </label>
                    <label class="f-16 fw-400 text-grey sen">
                      Glue is a Colt andhe is ready to mate.
                    </label>
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="select-breed ">
                <div class="breed-h ">
                  {femaleDog?.length > 0 ? (
                    femaleDog.map((item) => {
                      // <>maleDog.ownedby === item.ownedby ? setOwner(true) : "";</>;

                      return (
                        <div>
                          <div
                            class="d-flex flex-wrap align-items-center BrdBottm pb-2 mb-3 "
                            key={item._id}
                            onClick={() => handleFemaleDog(item?._id)}
                          >
                            <div>
                              <img
                                src={`http://localhost:3991/${item?.nftImage}`}
                                class="img-fluid mr-3 mb-3 "
                                width={"70px"}
                                alt="femaleDog"
                              />
                            </div>
                            <div class="ml-xl-4 ml-sm-4 ">
                              <label class="text-white f-16 fw-400 sen ">
                                {item?.nftName}
                              </label>
                              <span class="text-grey f-16 fw-400 stall sen ml-2 ">
                                Z2
                              </span>
                              <span class="text-grey f-16 fw-400 sen ">
                                Stallion
                              </span>
                              <span class="text-grey f-16 d-block fw-400 sen ">
                                2 Breeds Left
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <img src={noData} className="img-fluid" alt="No Data" />
                  )}
                </div>
              </ModalBody>
              <div class="position-relative" onClick={toggle}>
                <img
                  src="/static/assets/images/wallet/close.svg "
                  class="img-fluid close-bg "
                />
              </div>
            </Modal>
          )}

          <Footer />
        </>
      )}
    </>
  );
};
export default BreedingDog;
