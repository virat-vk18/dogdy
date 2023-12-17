import React from "react";
import { useGetStudDogsQuery } from "./breedingApi";
import { useSelector } from "react-redux";
import { connectMetamask } from "../../redux/feature/connectWalletSlice";
import { useNavigate, useParams } from "react-router-dom";
import SelectMate from "./SelectMate";

const BreedingDiv = () => {
  const { id: dogId } = useParams();
  const navigate = useNavigate();
  const { isSuccess, isLoading, data, error } = useGetStudDogsQuery({
    id: dogId,
  });

  const { address } = useSelector(connectMetamask);

  let content;
  try {
    if (isLoading) {
      content = (
        <h1 className=" text-white text-center">Data is Loading....!</h1>
      );
    } else if (isSuccess) {
      function formatTime(time) {
        return time < 10 ? `0${time}` : time;
      }
      const today = new Date();
      let options = { timeStyle: "short", hour12: true };
      let timeString = today.toLocaleTimeString("en-US", options);

      const getData = data.singleDog;
      const newDate = new Date(getData.studfarmdays);
      const currentDate = new Date();
      const totalSeconds = (newDate - currentDate) / 1000;
      const days = formatTime(Math.floor(totalSeconds / 3600 / 24));
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      content = (
        <td colspan="4" className="hiddenRow px-0 my-5">
          <div id="demo3" className="accordian-body collapsed">
            <div className="EvntNxtBg mb-3">
              <div className="text-right mb-2">
                <i
                  className="fa fa-times"
                  onClick={() => navigate("/breeding")}
                ></i>
              </div>
              <div className="EvnNxtHddSec mb-3">
                <div className="EvnNxtHd">
                  <h4>{getData.nftName} </h4>
                </div>
                <div className="BrdHdAccnt pr-5 text-right">
                  <p>{timeString}</p>
                  <div>
                    {address === null ? (
                      <p className="text-muted">Please Connect Metamask</p>
                    ) : (
                      `${address.substring(0, 12)}..${address.substring(
                        39,
                        42
                      )}`
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="BrdDogImg">
                        <img
                          alt=""
                          src={`http://localhost:3991/${getData.nftImage}`}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="BrdDogDtls mb-4">
                        <p>GEN</p>
                        <h4>
                          Z204 <span>{getData.age}</span>
                        </h4>
                      </div>
                      <div className="BrdDogDtls mb-4">
                        <p>COAT</p>
                        <h4>Cotton Candy</h4>
                      </div>
                      <div className="BrdDogDtls mb-4">
                        <p>WIN %</p>
                        <h4>5</h4>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="BrdDogDtls mb-4">
                        <p>BLOODLINE</p>
                        <h4>Buterin</h4>
                      </div>
                      <div className="BrdDogDtls mb-4">
                        <p>AGILITY`</p>
                        <h4>{getData.agility}</h4>
                      </div>
                      <div className="BrdDogDtls mb-4">
                        <p>OFFSPRING</p>
                        <h4>
                          0<span className="ml-2">3 of 3 left</span>
                        </h4>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="BrdDogDtls mb-4">
                        <p>GENDER</p>
                        <h4>Colt</h4>
                      </div>
                      <div className="BrdDogDtls mb-4">
                        <p>CAREER</p>
                        <h4>1/0/0</h4>
                      </div>
                      <div className="BrdDogDtls mb-4">
                        <p>BREEDING DECAY</p>
                        <h4>
                          Level 0<span className="ml-2">4 of 4 left</span>
                          <img
                            alt=""
                            src="/static/assets/images/pages/tbl-prc-icon.svg"
                            className="ml-2"
                          />
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="SlctMtBg">
                    <div className="SlctMtHdd mb-2">
                      <div className="SlctMtSec">
                        <p>OWNER STABLE</p>
                        <h4>Z268 LAB!</h4>
                      </div>
                      <div className="SlctMtSec TmLftSec">
                        <p>TIME LEFT</p>
                        <h4>
                          {days}d {hours}h {minutes}m
                        </h4>
                      </div>
                    </div>
                    <div className="SlctMtSec  d-flex mb-3">
                      <div className="TmLftSec mr-3">
                        <h4>BREED FEE</h4>
                      </div>
                      <div className="SlctMtSec StudFee d-flex">
                        <h4 className="mr-2">{getData.breedfee}</h4>
                        <p>MATIC</p>
                      </div>
                    </div>
                    <div className="Btns d-flex mt-2 flex-wrap">
                      <button
                        className="btn Btn BtnGrdnt BtnPrmry Btn170-50 kids BtnF16-400 "
                        onClick={() => navigate(`/dog-details/${getData._id}`)}
                      >
                        Breed Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      );
    } else {
      content = <p className="text-white">{error.message}</p>;
    }
  } catch (err) {
    console.log(err.message);
  }
  return (
    <>
      <div className="mt-5">{content}</div>
    </>
  );
};

export default BreedingDiv;
