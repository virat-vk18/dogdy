import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useExpiryDogMutation, useGetAllDogsQuery } from "./breedingApi";
import { useNavigate } from "react-router-dom";
import noData from "../../assets/images/NoData/No data-cuate.png";
const Breeding = () => {
  const [rowShow, setRowShow] = useState(false);
  const { isLoading, data: farmData, error, isSuccess } = useGetAllDogsQuery();
  const [expiryDogs] = useExpiryDogMutation();
  const navigate = useNavigate();
  let content;

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  const handleBreedRoute = (id) => {
    setRowShow(!rowShow);
    navigate(`/breeding/${id}`);
  };

  let sellDogId;

  if (isSuccess)
    if (isLoading) {
      content = <p>Data Loading</p>;
    } else if (isSuccess) {
      const allStudDogs = farmData.allDogs;
      content = (
        <>
          {allStudDogs.length > 0 ? (
            allStudDogs?.map((item) => {
              // const studDays = new Date(item.studfarmdays).getDate();
              // const createDay = new Date(item.createdAt).getDate();

              // const getDays = studDays - createDay;

              // const decreseTime =
              //   getDays * 24 * 60 * 60 * 1000 - 1 * 24 * 60 * 60 * 1000;

              // if (decreseTime <= 0) {
              //   sellDogId = item._id;
              // }

              // const studFarmDays = new Date(item.studfarmdays);
              // const currentDate = new Date();
              // const totalSeconds = (studFarmDays - currentDate) / 1000;
              // const days = formatTime(Math.floor(totalSeconds / 3600 / 24));
              // const hours = Math.floor(totalSeconds / 3600) % 24;
              // const minutes = Math.floor(totalSeconds / 60) % 60;
              return (
                <tr
                  onClick={() => handleBreedRoute(item._id)}
                  aria-controls="collapseBasic"
                  key={item._id}
                >
                  <td>
                    <div className="d-flex ">
                      <div className=" ">
                        <img
                          src={`http://localhost:3991/${item?.nftImage}`}
                          className=" TblDogImg"
                          alt="Mapp Ima"
                        />
                      </div>
                      <div className=" ">
                        <div className="EvntNme ">{item.nftName}</div>
                        <div className=" ">Z254 • Pacer • {item.age}</div>
                      </div>
                    </div>
                  </td>
                  <td>Dream Stable</td>
                  <td>
                    <div className="tblDtTxtfff ">
                      {/* {days}d {hours}h {minutes}m */}
                    </div>
                  </td>
                  <td>
                    <span className="PlyBnbTxt ">{item.breedfee}</span> MATIC
                  </td>
                </tr>
              );
            })
          ) : (
            <div className="mx-5">
              <img src={noData} className="img-fluid" alt="no data" />
            </div>
          )}
        </>
      );
    } else {
      content = <>{error.message}</>;
    }

  // useEffect(() => {
  //   if (!(sellDogId === undefined)) {
  //     expiryDogs({ id: sellDogId })
  //       .then((data) => console.log(data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [sellDogId]);

  return (
    <>
      <Header />

      <div className="MystbleSec pt-xl-5 pt-3 py-5">
        <div className="container mt-xl-5">
          <div className="MyStblBnnr StudFrmBg mb-5">
            <div className="row">
              <div className="col-lg-7 mx-auto">
                <div className="BrdHdd text-center">
                  <h4>Stud Farm</h4>
                  <p>
                    This is the stud farm, where you can look for the perfect
                    match for your filly or mare. Below you will see all of the
                    colts and stallions currently in the stud farm and ready to
                    breed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="StblInYbl">
            <div className="FiltrSec mb-5">
              <form className="d-flex flex-wrap align-items-center SerchCnt mb-3">
                <div className=" FltrSrch d-flex mr-3 ">
                  <input
                    type="text "
                    className="form-control "
                    placeholder="Search "
                  />
                </div>
                <span>5430 of 5430 racedogs</span>
              </form>
              <div className="FltrButns mb-3 ">
                <div className="mr-4 ">
                  <button
                    className="btn text-white f16 btn-bg bg-transparent kids Btn138-40 "
                    type="button "
                    routerlink="/connect-wallet "
                  >
                    Filter
                    <img
                      alt=""
                      src="/static/assets/images/pages/fltr-icon.svg "
                      className="ml-2 "
                    />
                  </button>
                </div>
                <div className="CusSlect ">
                  <select className="form-control custom-select ">
                    <option>Sort by</option>
                    <option>Sort by</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="Notify BrdBottm pb-4">
              <div className="row">
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="NtifyChkSec">
                        <div className="NtifyChkHdd mb-4">
                          <h4>Bloodline</h4>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Nakamoto
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Szabo
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Finney
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Buterin
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="NtifyChkSec">
                        <div className="NtifyChkHdd mb-4">
                          <h4>Gender</h4>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Colt
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Stallion
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="NtifyChkSec">
                        <div className="NtifyChkHdd mb-4">
                          <h4>Breads</h4>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Genesis
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Legendary
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Exclusive
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Elite
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Cross
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Pacer
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="NtifyChkSec">
                        <div className="NtifyChkHdd mb-4">
                          <h4>Color Group</h4>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Special
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Classic
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Earth
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Wild
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Moon
                          </label>
                        </div>
                        <div className="checkbox FrmChkBx mb-1">
                          <label>
                            <input
                              type="checkbox"
                              data-ng-model="example.check"
                            />
                            <span className="box"></span>
                            Fiery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="">
                    <div className="NtifyChkHdd mb-4">
                      <h4>Generation</h4>
                    </div>
                    <div data-role="main" className="ui-content">
                      <form method="post" action="">
                        <div className="MinMaxInptSec mb-4">
                          <input
                            type="text"
                            value="1"
                            className="form-control mr-2 mb-2"
                          />
                          <input
                            type="text"
                            value="265"
                            className="form-control  mb-2"
                          />
                        </div>
                        <div data-role="rangeslider range-slider-block">
                          <input
                            type="range"
                            name="price-min"
                            id="price-min"
                            value="200"
                            min="0"
                            max="1000"
                            className="range-slider__range"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="PlyTbl table-responsive BrdingTbl ">
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col ">Stallion</th>
                    <th scope="col ">Stable</th>
                    <th scope="col ">Time Left</th>
                    <th scope="col ">Stud Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="BreadStd ">
                    <td colspan="4 ">
                      <div className="SlctRarSec ">
                        <div className="SlctRar ">
                          <h4>
                            <span>
                              <img
                                alt=""
                                src="/static/assets/images/pages/dog-shadow.png "
                                className="mr-5"
                              />
                            </span>
                            Add a Racedog to Stud Farm
                          </h4>
                        </div>
                        <div className=" ">
                          <button className="btn BtnNords BtnPrmry Btn195-45 BtnF16-400 ">
                            Select Raredog
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Breeding;
