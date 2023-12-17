import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useGetSellDogsMutation } from "./marketApi";
import { useNavigate } from "react-router-dom";
import noData from "../../assets/images/NoData/No data-cuate.png";
import { useEffect, useState } from "react";

const MarketPlace = () => {
  const navigate = useNavigate();
  const [getDogs] = useGetSellDogsMutation();
  const [marketDogs, setMarketDogs] = useState([]);
  useEffect(() => {
    const handleGetMarketDogs = async () => {
      try {
        const response = await getDogs();
        //Get Dogs
        const allDogs = response.data.data;
        setMarketDogs(allDogs);
      } catch (err) {
        console.log(err.message);
      }
    };
    handleGetMarketDogs();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="f20 text-yellow fw-400  text-uppercase dpuff">
            Marketplace
          </div>

          <div className="dpuff">
            <div className="row align-items-center">
              <div className="col-lg-4  mt-3">
                <div className="fc_search ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Dog Name"
                  />
                  <a>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9345 10.958C11.2051 10.6893 11.6388 10.6893 11.9093 10.958L13.6976 12.4015H13.7287C14.0904 12.7672 14.0904 13.3601 13.7287 13.7257C13.3669 14.0914 12.7803 14.0914 12.4185 13.7257L10.9345 12.0249L10.8782 11.9614C10.7733 11.8286 10.7153 11.6631 10.7153 11.4915C10.7153 11.2913 10.7942 11.0993 10.9345 10.958ZM6.00435 0C7.5968 0 9.12403 0.639405 10.2501 1.77755C11.3761 2.9157 12.0087 4.45936 12.0087 6.06895C12.0087 9.42074 9.32046 12.1379 6.00435 12.1379C2.68824 12.1379 0 9.42074 0 6.06895C0 2.71716 2.68824 0 6.00435 0Z"
                        fill="#757575"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="col-lg-8  mt-3 text-right">
                <div className="mrkt_btn dpuff">
                  <UncontrolledDropdown className="btn-group  mx-3 mrkt_plc_drpdwn mrkt_plc_drpdwn1 mb-2 border-gradient">
                    <DropdownToggle caret color="">
                      All
                    </DropdownToggle>
                    <DropdownMenu>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">All</a>
                      </li>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">
                          Mystery Box
                        </a>
                      </li>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">Dogs</a>
                      </li>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown className="btn-group  mx-3 mrkt_plc_drpdwn mrkt_plc_drpdwn1 mb-2 border-gradient">
                    <DropdownToggle caret color="">
                      Filter By
                    </DropdownToggle>
                    <DropdownMenu>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">All</a>
                      </li>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">Auction</a>
                      </li>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">Fixed</a>
                      </li>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown className="btn-group  mx-3 mrkt_plc_drpdwn mrkt_plc_drpdwn1 mb-2 border-gradient">
                    <DropdownToggle caret color="">
                      Sort By
                    </DropdownToggle>
                    <DropdownMenu>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">All</a>
                      </li>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">BUSD</a>
                      </li>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">BNB</a>
                      </li>
                      <li role="menuitem" className="cur-pointer">
                        <a className="dropdown-item mrkt_drp_bor">DOGGY</a>
                      </li>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </div>

            <div className="row align-items-center py-lg-5 py-3 dpuff">
              {marketDogs.length > 0 ? (
                <>
                  {marketDogs.map((item) => (
                    <div
                      onClick={() =>
                        navigate(`/market-place-details/${item._id}`)
                      }
                      className="col-sm-12 col-lg-4 col-xl-4 col-md-6"
                      key={item._id}
                    >
                      <div className="mrkt-dg-img  cur-pointer">
                        <div className="rookie-dg-img text-center">
                          <img
                            alt=""
                            className="img-fluid"
                            src={`http://localhost:3991/${item.nftImage}`}
                          />
                        </div>
                        <div className="rookie-dg-cnt">
                          <h3 className="mb-0">#1328</h3>
                          <h2 className="mb-0">
                            0.0001<span>MATIC</span>
                          </h2>
                          <div className="tym-bg">
                            <span className="f_18 f_w_500 text-center">
                              09:12
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <img src={noData} alt="No data" className="img-fluid" />
              )}
              {/* {content} */}
              {/* <div className="col-sm-12 col-lg-4 col-xl-3 col-md-6">
                        <div className="mrkt-dg-img alt="" cur-pointer">
                           <div className="rookie-dg-img alt="" text-center">
                              <img alt="" src="/static/assets/images/market-place/dog-img alt=""/alano-1.png" alt="" />
                           </div>
                           <div className="rookie-dg-cnt">
                              <h3 className="mb-0">
                                 #1328
                              </h3>
                              <h2 className="mb-0">0.0001<span>BUSD</span></h2>
                              <div className="tym-bg">
                                 <span className="f_18 f_w_500 text-center">09:12</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="col-sm-12 col-lg-4 col-xl-3 col-md-6">
                        <div className="mrkt-dg-img alt="" cur-pointer">
                           <div className="rookie-dg-img alt="" text-center">
                              <img alt="" src="/static/assets/images/market-place/dog-img alt=""/gift-img alt="".png" alt="" />
                           </div>
                           <div className="rookie-dg-cnt">
                              <h3 className="mb-0">
                                 #1328
                              </h3>
                              <h2 className="mb-0">0.0001<span>BUSD</span></h2>
                              <div className="tym-bg">
                                 <span className="f_18 f_w_500 text-center">09:12</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="col-sm-12 col-lg-4 col-xl-3 col-md-6">
                        <div className="mrkt-dg-img alt="" cur-pointer">
                           <div className="rookie-dg-img alt="" text-center">
                              <img alt="" src="/static/assets/images/market-place/dog-img alt=""/gift-img alt="".png" alt="" />
                           </div>
                           <div className="rookie-dg-cnt">
                              <h3 className="mb-0">
                                 #1328
                              </h3>
                              <h2 className="mb-0">0.0001<span>BUSD</span></h2>
                              <div className="tym-bg">
                                 <span className="f_18 f_w_500 text-center">09:12</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-12 col-lg-4 col-xl-3 col-md-6">
                        <div className="mrkt-dg-img alt="" cur-pointer">
                           <div className="rookie-dg-img alt="" text-center">
                              <img alt="" src="/static/assets/images/market-place/dog-img alt=""/gift-img alt="".png" alt="" />
                           </div>
                           <div className="rookie-dg-cnt">
                              <h3 className="mb-0">
                                 #1328
                              </h3>
                              <h2 className="mb-0">0.0001<span>BUSD</span></h2>
                              <div className="tym-bg">
                                 <span className="f_18 f_w_500 text-center">09:12</span>
                              </div>
                           </div>
                        </div>
                     </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MarketPlace;
