import { useNavigate, useParams } from "react-router-dom";
import { useMyStableDogsQuery } from "../Market/marketApi";

const Specification = () => {
  const { id } = useParams();
  const ownedBy = JSON.parse(localStorage.getItem("ownedBy"));
  const navigate = useNavigate();
  const {
    isLoading,
    data: getMyDogs,
    isError,
  } = useMyStableDogsQuery({ id: ownedBy });
  const loggedIn = JSON.parse(localStorage.getItem("token"));
  let content;
  let displayData;

  try {
    if (isError) {
      displayData = <p>Sorry An Error Occured</p>;
    } else if (isLoading) {
      displayData = <p>Data is Loadingg....</p>;
    } else {
      const getData = getMyDogs.sellDogs;
      const getStudDogs = getMyDogs.studDogs;
      const allDogs = getData.concat(getStudDogs);
      const dog = allDogs.find((item) => id == item._id);
      displayData = (
        <section className="specifications pt-0">
          <div className="container  pt-5">
            <div className="row ">
              <div className="col-sm-4 col-5">
                <div className="mb-5 myclass  text-center">
                  <a
                    className="text-yellow bck_btn"
                    onClick={() => navigate("/my-stable")}
                  >
                    <span>
                      <img
                        alt=""
                        className="myclass"
                        src="/static/assets/images/pages/go-bck-icon.svg"
                      />
                    </span>
                    Go Back
                  </a>
                </div>
              </div>
            </div>
            <div className="row align-items-center pt-3">
              <div className="col-xl-5 spe_cation mt-3">
                <div className="">
                  <div className="text-center">
                    <img
                      alt=""
                      className="img-fluid"
                      src={`http://localhost:3991/${dog.nftImage}`}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-7 mt-3">
                <div className="spe_cation_cd">
                  <h2>Specifications</h2>
                  <div className="row">
                    <div className="col-sm-6">
                      <div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_1.gif"
                            />
                          </div>
                          <h3>
                            Age : <span>Puppy</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_2.gif"
                            />
                          </div>
                          <h3>
                            Gender : <span>{dog.gender}</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_3.gif"
                            />
                          </div>
                          <h3>
                            Blood Line : <span>Big</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_4.gif"
                            />
                          </div>
                          <h3>
                            Feeding : <span>70.0 %</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_7.gif"
                            />
                          </div>
                          <h3>
                            Health : <span>69 %</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_6.gif"
                            />
                          </div>
                          <h3>
                            Happiness : <span>{dog.happiness}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_7.gif"
                            />
                          </div>
                          <h3>
                            Physical Condition : <span>12 %</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_8.gif"
                            />
                          </div>
                          <h3>
                            Intelligence : <span>12 %</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_9.gif"
                            />
                          </div>
                          <h3>
                            Strength : <span>12 %</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_10.gif"
                            />
                          </div>
                          <h3>
                            Speed : <span>{dog.speed}</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_11.gif"
                            />
                          </div>
                          <h3>
                            Agility : <span>12 %</span>
                          </h3>
                        </div>
                        <div className="d-flex align-items-center icon_size_spc_hd_total ">
                          <div className="icon_size_spc_hd mr-1">
                            <img
                              alt=""
                              className="icon_size_spc "
                              src="/static/assets/images/spi_icon_12.gif"
                            />
                          </div>
                          <h3>
                            Discipline : <span>Discipline</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  } catch (err) {
    console.log(err.message);
  }
  if (!loggedIn) {
    content = (
      <h1>
        Please Connect to MetaMask
        <button
          className="btn btn-danger"
          onClick={() => navigate("/connect-wallet")}
        >
          Click Here
        </button>
      </h1>
    );
  } else {
    content = displayData;
  }
  // // const getData = getData.data
  // if (isLoading)
  // {
  //    content =   <div className="f20 text-yellow fw-400  text-uppercase dpuff">
  //              Market place is Loading
  //             </div>
  // }
  // else {
  //    content = <>
  //       {getData.map((item) => (
  //             //   <div className="col-sm-12 col-lg-4 col-xl-3 col-md-6">
  //             //          <div className="mrkt-dg-img alt="" cur-pointer">
  //             //             <div className="rookie-dg-img alt="" text-center">
  //             //                <img alt="" className="img alt=""-fluid" src={`http://localhost:3981/${item.nftImage}`} alt="" />
  //             //             </div>
  //             //             <div className="rookie-dg-cnt">
  //             //                <h3 className="mb-0">
  //             //                   #1328
  //             //                </h3>
  //             //                <h2 className="mb-0">0.0001<span>MATIC</span></h2>
  //             //                <div className="tym-bg">
  //             //                   <span className="f_18 f_w_500 text-center">09:12</span>
  //             //                </div>
  //             //             </div>
  //             //          </div>
  //          //       </div>
  //           <div className="col-xl-7 mt-3">
  //                      <div className="spe_cation_cd">
  //                         <h2>Specifications</h2>
  //                         <div className="row">
  //                               <div className="col-sm-6">
  //                                  <div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_1.gif" alt="" />
  //                                           </div>
  //                                           <h3>Age : <span>Puppy</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_2.gif" alt="" />
  //                                           </div>
  //                                           <h3>Gender : <span>Male</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_3.gif" alt="" />
  //                                           </div>
  //                                           <h3>Blood Line : <span>Big</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_4.gif" alt="" />
  //                                           </div>
  //                                           <h3>Feeding : <span>70.0 %</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_7.gif" alt="" />
  //                                           </div>
  //                                           <h3>Health : <span>69 %</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_6.gif" alt="" />
  //                                           </div>
  //                                           <h3>Happiness : <span>71.0 %</span></h3>
  //                                     </div>

  //                                  </div>
  //                               </div>
  //                               <div className="col-sm-6">
  //                                  <div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_7.gif" alt="" />
  //                                           </div>
  //                                           <h3>Physical Condition : <span>12 %</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_8.gif" alt="" />
  //                                           </div>
  //                                           <h3>Intelligence : <span>12 %</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_9.gif" alt="" />
  //                                           </div>
  //                                           <h3>Strength : <span>12 %</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_10.gif" alt="" />
  //                                           </div>
  //                                           <h3>Speed : <span>23 %</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_11.gif" alt="" />
  //                                           </div>
  //                                           <h3>Agility : <span>12 %</span></h3>
  //                                     </div>
  //                                     <div className="d-flex align-items-center icon_size_spc_hd_total ">
  //                                           <div className="icon_size_spc_hd mr-1">
  //                                              <img alt="" className="icon_size_spc " src="/static/assets/images/spi_icon_12.gif" alt="" />
  //                                           </div>
  //                                           <h3>Discipline : <span>Discipline</span></h3>
  //                                     </div>

  //                                  </div>
  //                               </div>
  //                         </div>

  //                      </div>

  //                   </div>
  //          ))
  //    }
  //    </>
  // }
  //  } catch (err) {
  //    console.error(err.message);
  // }
  // console.log(getData);
  return (
    <>
      {/* <Header /> */}

      {content}

      {/* <Footer /> */}
    </>
  );
};
export default Specification;
