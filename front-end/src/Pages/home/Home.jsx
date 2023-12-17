import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useGetAllDogsQuery } from "../breeding/breedingApi";
import noData from "../../assets/images/NoData/No data-cuate.png";
const Home = () => {
  const { isLoading, data: farmData, error, isSuccess } = useGetAllDogsQuery();
  let content;
  if (isLoading) {
    content = <h5 className="text-white">Content is Loading</h5>;
  } else if (isSuccess) {
    const getData = farmData.allDogs;
    content = (
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-md-12 text-center  ">
            <h1
              className=" f-130 fw-400 text-white may mb-0 text-stroke"
              data-text="Breeding"
            >
              Breeding
            </h1>
            <h2 className="f-50 fw-400 text-white dpuff ">In Stud</h2>
          </div>
        </div>
        <div className="row">
          {getData.length > 0 ? (
            <>
              {getData.slice(0, 6).map((item) => (
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                  <div className="grey-card mb-4">
                    <div className="d-flex">
                      <img
                        alt=""
                        src={`http://localhost:3991/${item?.nftImage}`}
                        className="img-fluid mr-3"
                        width={"100px"}
                      />
                      <div>
                        <label className="text-white d-block f-16 fw-500">
                          {item?.nftName}
                          <span
                            className="text-white opacity-5 f-12
                             fw-400"
                          >
                            Rare
                          </span>
                        </label>
                        <label className="text-white d-block f-14 fw-500">
                          #DG 22 . {item.gender} . {item.age}
                        </label>
                        <label className="text-white d-block f-18 fw-600">
                          ${item.breedfee} MATIC
                        </label>
                        <button className=" btn primary-btn " routerLink="/ ">
                          Breed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <img alt="" src={noData} className="img-fluid" />
          )}
          {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div className="grey-card mb-4">
              <div className="d-flex">
                <img alt=""
                  src="/static/assets/images/new-home/dog-2.svg"
                  className="img alt=""-fluid mr-3"
                />
                <div>
                  <label className="text-white d-block f-16 fw-500">
                    {" "}
                    Bassotto{" "}
                    <span
                      className="text-white opacity-5 f-12
                             fw-400"
                    >
                      Legendary
                    </span>
                  </label>
                  <label className="text-white d-block f-14 fw-500">
                    {" "}
                    #DG 22 . Stain . Winger
                  </label>
                  <label className="text-white d-block f-18 fw-600"> $50.10 </label>
                  <button className=" btn primary-btn " routerLink="/ ">
                    Breed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div className="grey-card mb-4">
              <div className="d-flex">
                <img alt=""
                  src="/static/assets/images/new-home/dog-3.svg"
                  className="img alt=""-fluid mr-3"
                />
                <div>
                  <label className="text-white d-block f-16 fw-500">
                    {" "}
                    Amstaff{" "}
                    <span
                      className="text-white opacity-5 f-12
                             fw-400"
                    >
                      Epic
                    </span>
                  </label>
                  <label className="text-white d-block f-14 fw-500">
                    {" "}
                    #DG 22 . Stain . Winger
                  </label>
                  <label className="text-white d-block f-18 fw-600"> $50.10 </label>
                  <button className=" btn primary-btn " routerLink="/ ">
                    Breed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div className="grey-card mb-4">
              <div className="d-flex">
                <img alt=""
                  src="/static/assets/images/new-home/dog-1.svg"
                  className="img alt=""-fluid mr-3"
                />
                <div>
                  <label className="text-white d-block f-16 fw-500">
                    {" "}
                    Fila{" "}
                    <span
                      className="text-white opacity-5 f-12
                             fw-400"
                    >
                      Rare
                    </span>
                  </label>
                  <label className="text-white d-block f-14 fw-500">
                    {" "}
                    #DG 22 . Stain . Winger
                  </label>
                  <label className="text-white d-block f-18 fw-600"> $50.10 </label>
                  <button className=" btn primary-btn " routerLink="/ ">
                    Breed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div className="grey-card mb-4">
              <div className="d-flex">
                <img alt=""
                  src="/static/assets/images/new-home/dog-2.svg"
                  className="img alt=""-fluid mr-3"
                />
                <div>
                  <label className="text-white d-block f-16 fw-500">
                    {" "}
                    Bassotto{" "}
                    <span
                      className="text-white opacity-5 f-12
                             fw-400"
                    >
                      Legendary
                    </span>
                  </label>
                  <label className="text-white d-block f-14 fw-500">
                    {" "}
                    #DG 22 . Stain . Winger
                  </label>
                  <label className="text-white d-block f-18 fw-600"> $50.10 </label>
                  <button className=" btn primary-btn " routerLink="/ ">
                    Breed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div className="grey-card mb-4">
              <div className="d-flex">
                <img alt=""
                  src="/static/assets/images/new-home/dog-3.svg"
                  className="img alt=""-fluid mr-3"
                />
                <div>
                  <label className="text-white d-block f-16 fw-500">
                    {" "}
                    Amstaff{" "}
                    <span
                      className="text-white opacity-5 f-12
                             fw-400"
                    >
                      Epic
                    </span>
                  </label>
                  <label className="text-white d-block f-14 fw-500">
                    {" "}
                    #DG 22 . Stain . Winger
                  </label>
                  <label className="text-white d-block f-18 fw-600"> $50.10 </label>
                  <button className=" btn primary-btn " routerLink="/ ">
                    Breed
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  } else {
    content = <h5>Sorry Failed to Load {error.message}</h5>;
  }

  return (
    <>
      <Header />

      <div className="container mb-4">
        <div className="row mt-5">
          <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6">
            <h1
              className="f-130 fw-400 text-white may text-stroke"
              data-text="Doggy Vill"
            >
              Doggy Vill
            </h1>
            <h2 className="f-50 fw-400 text-white dpuff">Discover Best</h2>
            <h2 className="f-88 fw-400 text-white dpuff">Digital Race &</h2>
            <h2 className="f-50 fw-400 text-white dpuff">Collect NFT’s</h2>
            <p className="popins f-14 text-grey1 mt-3 lh-30 fw-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              euismod sem sed consectetur aliquam vivamus. Ullamcorper turpis{" "}
            </p>

            <div className="my-4">
              <button className="btn primary-btn" routerLink="/">
                Start
              </button>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 text-center mb-5">
            <img
              alt=""
              src="/static/assets/images/new-home/home1.svg"
              className="dog-img1 img-fluid"
            />
            <img
              alt=""
              src="/static/assets/images/new-home/home2.svg"
              className=" dog-img  img-fluid"
            />
          </div>
        </div>
      </div>

      {/* <div className="container pt-5 ">
            <div className="row align-items-center">
               <div className="col-md-12 col-sm-12 col-lg-6 col-xl-3">
                  <div className="d-flex align-items-center my-5 pt-5">


                     <div className="dog-card p-3">
                        <img alt="" src="/static/assets/images/new-home/home3.svg" className="position-img alt=""" />
                        <div className="d-flex align-items-end d-flex-position">
                           <div className="rotate">
                              <p className="dpuff text-white f-50  fw-400">Alano</p>
                              <img alt="" src="/static/assets/images/new-home/home4.svg" className="ml-4" />
                           </div>
                           <div>
                              <div className="d-flex justify-content-between">
                                 <label className="text-lwhite mr-3 fw-400 f-14"> Speed</label>
                                 <label className="text-white  fw-400 f-14"> 40kmph</label>
                              </div>
                              <div className="d-flex justify-content-between">
                                 <label className="text-lwhite mr-3 fw-400 f-14"> Agility</label>
                                 <label className="text-white  fw-400 f-14"> 75%</label>
                              </div>
                              <div className="d-flex justify-content-between mb-3">
                                 <label className="text-lwhite mr-3 fw-400 f-14"> Gender</label>
                                 <label className="text-white  fw-400 f-14"> Male</label>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-md-12 col-sm-12 col-lg-6 col-xl-9">
                  <div className="next-run-bg p-3 p-xl-5">
                     <div className="row align-items-center justify-content-end">
                        <div className="col-md-12">
                           <h1 className="f-130 fw-400 text-center text-white may text-stroke1" data-text="Live">Live</h1>
                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-12 col-xl-8">

                           <h2 className="f-50 fw-400 text-center text-white dpuff">Next to Run
                           </h2>
                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-12 col-xl-2">
                           <button className="btn primary-btn" routerLink="/">
                              See All</button>
                        </div>
                     </div>

                     <div className="row my-4">
                        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                           <div className="active-violet">
                              <label className="f-14 fw-600 mb-3  text-white">Hamburg Daylight</label>
                              <div className="d-flex  justify-content-between">
                                 <label className="f-14 fw-400 mb-0  text-white">$30 USD</label>
                                 <button className="btn btn-auto " type="button">Live</button>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                           <div className="violet-card">
                              <label className="f-14 fw-600 mb-3  text-white">Viatdesire</label>
                              <div className="d-flex align-items-center justify-content-between">
                                 <label className="f-14 fw-400 mb-0  text-white">$30 USD</label>
                                 <label className="f-12 f-italic fw-400 mb-0  text-white">In 2m 32sec</label>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                           <div className="violet-card">
                              <label className="f-14 fw-600 mb-3  text-white">Pitsburg Juville</label>
                              <div className="d-flex align-items-center justify-content-between">
                                 <label className="f-14 fw-400 mb-0  text-white">$30 USD</label>
                                 <label className="f-12 f-italic fw-400 mb-0  text-white">In 2m 32sec</label>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                           <div className="violet-card">
                              <label className="f-14 fw-600 mb-3  text-white">Helenski</label>
                              <div className="d-flex align-items-center justify-content-between">
                                 <label className="f-14 fw-400 mb-0  text-white">$30 USD</label>
                                 <label className="f-12 f-italic fw-400 mb-0  text-white">In 2m 32sec</label>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div> */}

      {/* <div className="container">
            <div className="row align-items-center">
               <div className="col-md-12 col-sm-12 col-lg-6 col-xl-9">
                  <h1 className="f-130 fw-400 text-white may mb-0 text-stroke" data-text="Join">Join</h1>
                  <h2 className="f-50 fw-400 text-white dpuff">Up & Coming
                  </h2>
               </div>
               <div className="col-md-12 col-sm-12 col-lg-6 col-xl-3 text-xl-right text-md-right">
                  <button className=" btn primary-btn " routerLink="/ ">
                     More</button>
               </div>
            </div>
         </div> */}
      {content}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-sm-12 col-lg-6 col-xl-3 text-right">
            <div className="mb-5">
              <label className="text-white f-20 mr-3 fw-500 ">Age </label>
              <img
                alt=""
                src="/static/assets/images/new-home/g1.gif "
                className=" dog-gif img-fluid "
              />
            </div>
            <div className="mb-5">
              <label className="text-white f-20 mr-3 fw-500 ">
                Intelligence{" "}
              </label>
              <img
                alt=""
                src="/static/assets/images/new-home/g2.gif "
                className=" dog-gif img-fluid "
              />
            </div>
            <div className="mb-5">
              <label className="text-white f-20 mr-3 fw-500 ">Strength </label>
              <img
                alt=""
                src="/static/assets/images/new-home/g3.gif "
                className=" dog-gif img-fluid "
              />
            </div>
            <div className="mb-5">
              <label className="text-white f-20 mr-3 fw-500 ">Speed </label>
              <img
                alt=""
                src="/static/assets/images/new-home/g4.gif "
                className=" dog-gif img-fluid "
              />
            </div>
            <div className="mb-5">
              <label className="text-white f-20 mr-3 fw-500 ">Agility </label>
              <img
                alt=""
                src="/static/assets/images/new-home/g5.gif "
                className=" dog-gif img-fluid "
              />
            </div>
            <div className="mb-5">
              <label className="text-white f-20 mr-3 fw-500 ">
                Discipline{" "}
              </label>
              <img
                alt=""
                src="/static/assets/images/new-home/g6.gif "
                className=" dog-gif img-fluid "
              />
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 col-xl-6 ">
            <img
              alt=""
              src="/static/assets/images/new-home/home7.svg "
              className="img-fluid "
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 col-xl-3 ">
            <div className="mb-5">
              <img
                alt=""
                src="/static/assets/images/new-home/g7.gif "
                className=" mr-3 dog-gif img-fluid "
              />
              <label className="text-white f-20 fw-500 ">Gender </label>
            </div>
            <div className="mb-5">
              <img
                alt=""
                src="/static/assets/images/new-home/g8.gif "
                className=" mr-3 dog-gif img-fluid "
              />
              <label className="text-white f-20 fw-500 ">Blood Line </label>
            </div>
            <div className="mb-5">
              <img
                alt=""
                src="/static/assets/images/new-home/g9.gif "
                className=" mr-3 dog-gif img-fluid "
              />
              <label className="text-white f-20 fw-500 ">Feeding </label>
            </div>
            <div className="mb-5">
              <img
                alt=""
                src="/static/assets/images/new-home/g10.gif "
                className=" mr-3 dog-gif img-fluid "
              />
              <label className="text-white f-20 fw-500 ">Health </label>
            </div>
            <div className="mb-5">
              <img
                alt=""
                src="/static/assets/images/new-home/g11.gif "
                className=" mr-3 dog-gif img-fluid "
              />
              <label className="text-white f-20 fw-500 ">Happiness </label>
            </div>
            <div className="mb-5">
              <img
                alt=""
                src="/static/assets/images/new-home/g12.gif "
                className=" mr-3 dog-gif img-fluid "
              />
              <label className="text-white f-20 fw-500 ">
                Physical Condition{" "}
              </label>
            </div>
          </div>
        </div>
      </div>

      <section className="Tknomics my-5">
        <div className="container">
          <div className="TknChrt">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="TknChrtsBg">
                  <div className="row align-items-center">
                    <div className="col-md-6 pr-md-0">
                      <div className="TknChrtImg">
                        <img
                          alt=""
                          src="/static/assets/images/new-home/chrt-img.png"
                          className="img-fluid mx-auto d-block"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 pl-md-0">
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="ChrtDtls Mxsply">
                            <p>Max Supply</p>
                            <h4>5,000,000 (5 million) DOGGY</h4>
                          </div>
                          <div className="ChrtDtls Lpratio">
                            <p>LP Ratio</p>
                            <h4>1 DOGGY to 10 BUSD</h4>
                          </div>
                          <div className="ChrtDtls Mrktcap">
                            <p>Market Cap</p>
                            <h4>50,000,000 BUSD</h4>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="ChrtDtls Buyselltx">
                            <p>BUY/SELL/XFR TAX</p>
                            <h4>3%</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="TknDtls">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <h1
                  className="f-130 fw-400 text-white may mb-0 text-stroke"
                  data-text="Details"
                >
                  Details
                </h1>
                <h2 className="f-50 fw-400 text-white dpuff">Tokenomics</h2>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Presale</p>
                    <h4>55,555 NFTs</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Price Per NFT</p>
                    <h4>150 BUSD</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Funds Raised</p>
                    <h4>8,333,250BUSD</h4>
                    <h4>+</h4>
                    <h4>833,325DOGGY</h4>
                    <h6> for LP (16,6665%)</h6>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Platform</p>
                    <h4>3,500,000 DOGGY (70%)</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>InGame Earnings</p>
                    <h4>1,750,000 DOGGY</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Racing/Breeding Pool</p>
                    <h4>700,000 DOGGY</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Betting Pool</p>
                    <h4>350,000 DOGGY</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Staking Pool</p>
                    <h4>350,000 DOGGY</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Game Development</p>
                    <h4>350,000 DOGGY</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Team</p>
                    <h4>500,000 DOGGY (10%)</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="TknDtlsBox">
                  <div className="TknDtlsCnt text-center">
                    <p>Marketing</p>
                    <h4>166,675 DOGGY (3,3335%)</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default Home;
