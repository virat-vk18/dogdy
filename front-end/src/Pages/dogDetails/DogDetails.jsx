import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useMyDogDetailsPageMutation } from "../Market/marketApi";
import { useSelector } from "react-redux";
import { connectMetamask } from "../../redux/feature/connectWalletSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useClipboard from "react-use-clipboard";

const DogDetails = () => {
  const { id } = useParams();
  const [dog, setDogs] = useState("");
  const [daysOnStud, setDaysOnStud] = useState("");
  const [hoursOnStud, setHoursOnStud] = useState("");
  const [minOnStud, setMinOnStud] = useState("");

  const [studDogGender, setStudDogGender] = useState("");

  const ownedBy = JSON.parse(localStorage.getItem("ownedBy"));

  const navigate = useNavigate();
  const { address } = useSelector(connectMetamask);
  const [getMyDogs] = useMyDogDetailsPageMutation();
  useEffect(() => {
    try {
      const handleDog = async () => {
        const specifiedDogs = await getMyDogs({ id });
        const getData = specifiedDogs.data.studDogs;
        function formatTime(time) {
          return time < 10 ? `0${time}` : time;
        }
        const newDate = new Date(getData.studfarmdays);
        const currentDate = new Date();
        const totalSeconds = (newDate - currentDate) / 1000;
        const days = formatTime(Math.floor(totalSeconds / 3600 / 24));
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        setDaysOnStud(days);
        setHoursOnStud(hours);
        setMinOnStud(minutes);

        // const getStudDogs = specifiedDogs.data.studDogs;
        // const allDogs = getData.concat(getStudDogs);
        // const dogData = allDogs.find((item) => id == item._id);
        setDogs(getData);
        // console.log(dogData);
      };
      handleDog();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }, []);
  const [isCopied, setCopied] = useClipboard(address);

  return (
    <>
      <Header />

      <div className="DogDtlsPg">
        {/* {displayData} */}
        <div className="dog-bg DogDtlsBg py-5 ">
          <div className="container">
            <div className="DogDtlsTpHdd">
              <div className="GoBck">
                <a
                  className="text-white"
                  onClick={() => navigate("/my-stable")}
                >
                  <img
                    alt=""
                    src="/static/assets/images/pages/go-bck-icon.svg"
                    className="mr-2"
                  />
                  Go Back
                </a>
              </div>
              <div className="ShreLnk">
                <a className="mr-4">
                  <img
                    alt=""
                    src="/static/assets/images/pages/dog-dtls-lnk-icon1.png"
                    className="mr-2"
                  />
                  {address === ""
                    ? `Connect Wallet`
                    : `Connected..${address.substring(
                        0,
                        5
                      )}..${address.substring(39, 42)}`}
                </a>
                <a onClick={() => setCopied(address)}>
                  <img
                    alt=""
                    src="/static/assets/images/pages/dog-dtls-lnk-icon2.svg"
                    className="mr-2"
                  />
                  Share
                </a>
              </div>
            </div>
            <div className="row py-5 align-items-center">
              <div className="col-sm-12 col-lg-4 col-xl-3 col-md-4">
                <div className="shadow-dog mr-3 mt-5 DogBrdDtlsbg text-right">
                  <p>Bloodline</p>
                  <h4>{dog.nftName}</h4>
                </div>
                <div className="shadow-dog  mr-5 mt-5  DogBrdDtlsbg text-right">
                  <p>gen</p>
                  <h4>{dog.age}</h4>
                </div>
                <div className="shadow-dog mr-3 mt-5  DogBrdDtlsbg text-right">
                  <p>Gender</p>
                  <h4>{dog.gender}</h4>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 col-xl-6 col-md-4 text-center">
                <img
                  alt=""
                  src={`http://localhost:3991/${dog.nftImage}`}
                  className="img-fluid zoom-img  my-5"
                />
              </div>
              <div className="col-sm-12 col-lg-4 col-xl-3 col-md-4">
                <div className="shadow-dog-left ml-3 mt-5 DogBrdDtlsbg ">
                  <p>Intelligence</p>
                  <h4>{dog.intelligence}</h4>
                </div>
                <div className="shadow-dog-left ml-5 mt-5 DogBrdDtlsbg ">
                  <p>offspring</p>
                  <h4>
                    0<span>3 of 3 Left</span>
                  </h4>
                </div>
                <div className="shadow-dog-left ml-3 mt-5 DogBrdDtlsbg ">
                  <p>breeding decay</p>
                  <h4>
                    Tier 0 <span>4 of 4 left</span>
                  </h4>
                </div>
              </div>
              <div className="col-md-12 text-center DogNme">
                <h2 className="text-white mt-4 f60 kids">{dog.nftName}</h2>
                <h4>
                  Owner <span>Taar-Stables</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="CareerPrfSec mb-5">
            {dog.breedfee && dog.gender === "Male" ? (
              <div className="SlctMtBg DgDtlsPgSlctMt">
                <div className="SlctMtHdd align-items-center">
                  <div className="SlctMtSec TmLftSec d-flex">
                    <p className="mr-4">TIME LEFT</p>
                    <h4>
                      {daysOnStud}d {hoursOnStud}h {minOnStud}m
                    </h4>
                  </div>
                  <div className="SlctMtSec  d-flex align-items-center flex-wrap">
                    <div className="TmLftSec mr-3">
                      <h4 className="mb-0">STUD FEE</h4>
                    </div>
                    <div className="SlctMtSec StudFee d-flex mr-5 ">
                      <h4 className="mr-2 mb-0">{dog.breedfee}</h4>
                      <p>MATIC</p>
                    </div>
                    <div className="Btns d-flex">
                      <button
                        onClick={() => navigate(`/breeding-dog/${dog._id}`)}
                        className="btn Btn BtnGrdnt BtnPrmry Btn170-50 kids BtnF16-400 "
                      >
                        Breed Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="text-center AvlblDtls">
              <p>Dancing Glue is available for breeding until 13th Sep 2022</p>
            </div>
            <div className="CprfmsSec mb-4">
              <div className="CrPrfmHdd mr-3">
                <h4>Career Performance</h4>
              </div>
              <div className="CrPrfmHddDtls">
                <h4>
                  <span className="PrfmGrd mr-3">D</span>5/10
                  <img
                    alt=""
                    src="/static/assets/images/pages/tbl-prc-icon.svg"
                    className="ml-2"
                  />
                </h4>
              </div>
            </div>
            <div className="CrPrfmSubHdd">
              <h4>
                Discovery Phase
                <img
                  alt=""
                  src="/static/assets/images/pages/tbl-prc-icon.svg"
                  className="ml-2"
                />
              </h4>
            </div>
            <div className="PhaseLine">
              <ul className="wizard-timeline center-align">
                <li className="completed">
                  <div className="StpLine">
                    <span className="step-num">1</span>
                    <label className="TopThree">2nd</label>
                  </div>
                </li>
                <li className="completed">
                  <div className="StpLine">
                    <span className="step-num">2</span>
                    <label>4th</label>
                  </div>
                </li>
                <li className="completed">
                  <div className="StpLine">
                    <span className="step-num">3</span>
                    <label className="TopThree">1st</label>
                  </div>
                </li>
                <li className="completed">
                  <div className="StpLine">
                    <span className="step-num">4</span>
                    <label>9th</label>
                  </div>
                </li>
                <li className="completed">
                  <div className="StpLine">
                    <span className="step-num">5</span>
                    <label>9th</label>
                  </div>
                </li>
                <li className="active">
                  <div className="StpLine">
                    <span className="step-num">6</span>
                    <label>RACE</label>
                  </div>
                </li>
                <li>
                  <div className="StpLine">
                    <span className="step-num">7</span>
                  </div>
                </li>
                <li>
                  <div className="StpLine">
                    <span className="step-num">8</span>
                  </div>
                </li>
                <li>
                  <div className="StpLine">
                    <span className="step-num">9</span>
                  </div>
                </li>
                <li>
                  <div className="StpLine">
                    <span className="step-num">10</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="LinageOver mb-5 pb-5">
            <div className="LinageHdd">
              <div className="CrPrfmHdd mb-4 pb-1">
                <h4>Lineage Overview</h4>
              </div>
              <div className="CrPrfmSubHdd mb-4 pb-2">
                <h4>Parents</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <div className="LinPrntBg">
                  <div className="RcDogNme align-items-start mb-lg-0 mb-2">
                    <div className="d-flex mr-3">
                      <div className="">
                        <img
                          alt=""
                          src="/static/assets/images/pages/tbl-dog.png"
                          className=" TblDogImg"
                        />
                      </div>
                      <div className="">
                        <div className="EvntNme">Golden Satoshi</div>
                        <div className="PrntsDgNme">Z254 • Pacer • Buterin</div>
                      </div>
                    </div>
                    <div className="RcDogBdge mr-5">
                      <span>1505</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn Btn BtnTrnsp BtnPrmry Btnbg110-45 kids BtnF16-400">
                      Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="LinPrntBg">
                  <div className="RcDogNme align-items-start mb-lg-0 mb-2">
                    <div className="d-flex mr-3">
                      <div className="">
                        <img
                          alt=""
                          src="/static/assets/images/pages/tbl-dog.png"
                          className=" TblDogImg"
                        />
                      </div>
                      <div className="">
                        <div className="EvntNme">Golden Satoshi</div>
                        <div className="PrntsDgNme">Z254 • Pacer • Buterin</div>
                      </div>
                    </div>
                    <div className="RcDogBdge mr-5">
                      <span>1505</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn Btn BtnTrnsp BtnPrmry Btnbg110-45 kids BtnF16-400">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default DogDetails;
