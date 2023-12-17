import { useState } from "react";
import {
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import shadowDog from "../../assets/images/market-place/shadow1.svg";
import gift from "../../assets/images/gift.gif";
import close from "../../assets/images/wallet/close.png";
import bassotto2 from "../../assets/images/market-place/dog-img/bassotto-2.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { connectMetamask } from "../../redux/feature/connectWalletSlice";
import { useMyStableDogsQuery } from "./marketApi";
import noData from "../../assets/images/NoData/No data-cuate.png";
import useClipboard from "react-use-clipboard";

const MyStable = () => {
  const navigate = useNavigate();
  const { address } = useSelector(connectMetamask);
  const ownedBy = JSON.parse(localStorage.getItem("ownedBy"));
  const {
    data: getMyDogs,
    isLoading,
    isSuccess,
  } = useMyStableDogsQuery({ id: ownedBy });
  let content;

  try {
    if (isLoading) {
      content = (
        <div className="f20 text-yellow fw-400  text-uppercase dpuff">
          Dogs is Loading
        </div>
      );
    } else if (isSuccess) {
      const getData = getMyDogs.sellDogs;
      const getStudDogs = getMyDogs.studDogs;
      const allDogs = getData.concat(getStudDogs);
      content = (
        <>
          {allDogs.length > 0 ? (
            allDogs.map((item) => (
              <div className="col-lg-4 col-sm-6 col-12 mb-5" key={item._id}>
                <div className="card bg-dark text-white">
                  <img
                    src={`http://localhost:3991/${item.nftImage}`}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.nftName}</h5>
                    <p className="text-muted p-0">Gender : {item.gender}</p>
                    <div className="p-0 m-0">
                      <UncontrolledDropdown className="btn-group  mx-3 mrkt_plc_drpdwn mrkt_plc_drpdwn1 mb-2 border-gradient">
                        <DropdownToggle caret color="">
                          Make Offer
                        </DropdownToggle>
                        <DropdownMenu>
                          <li
                            role="menuitem"
                            className="cur-pointer"
                            onClick={() =>
                              navigate(`/specification/${item._id}`)
                            }
                          >
                            <a className="dropdown-item mrkt_drp_bor">
                              Specification
                            </a>
                          </li>
                          <li role="menuitem" className="cur-pointer">
                            <a className="dropdown-item mrkt_drp_bor">
                              Transfer
                            </a>
                          </li>
                          <li role="menuitem" className="cur-pointer">
                            <a className="dropdown-item mrkt_drp_bor">
                              Sell Now
                            </a>
                          </li>
                          <li role="menuitem" className="cur-pointer">
                            <a className="dropdown-item mrkt_drp_bor">
                              Auction Now
                            </a>
                          </li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img src={noData} className="img alt-fluid" alt="No Data" />
          )}
        </>
      );
    }
  } catch (err) {
    console.error(err.message);
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [activeTab, setActiveTab] = useState("1");
  const toggle1 = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
  const [isCopied, setCopied] = useClipboard(address);

  return (
    <>
      <div className="MystbleSec">
        <div className="container">
          <div className="MyStblBnnr mb-5">
            <div className="MStblPrflSec mb-4 pb-2">
              <div className="MystblUsr mb-2 mb-sm-0">
                <div className="MystblUsrImg">
                  <img
                    alt=""
                    src="/static/assets/images/pages/my-stbl-user.png"
                    className="img-fluid mr-3"
                  />
                </div>
                <div className="MystblUsrNme">
                  <p>My Stable</p>
                  <h4>
                    <span className="font-weight-light">Address</span>{" "}
                    {address.substring(0, 9)}
                    <span>
                      <img
                        alt=""
                        src="/static/assets/images/pages/my-stbl-cpy-icon.svg"
                        className="ml-2"
                        onClick={() => setCopied(address)}
                      />
                    </span>
                  </h4>
                </div>
              </div>
              <div className="SttngCnt">
                <a>
                  <img
                    alt=""
                    src="/static/assets/images/pages/setting-icon.svg"
                    className="mr-2"
                  />
                  Settings
                </a>
              </div>
            </div>
            <div className="TtwSec">
              <div className="TtwCnt text-center">
                <p>Thoroughbreds</p>
                <h4>0</h4>
              </div>
              <div className="TtwCnt text-center">
                <p>Total Career</p>
                <h4>-/-/-</h4>
              </div>
              <div className="TtwCnt text-center">
                <p>Win Rate</p>
                <h4>--%</h4>
              </div>
            </div>
          </div>
          <div className="StblInYbl">
            <div className="PlyPgTitl  mb-5 ">
              <h4>In stable</h4>
            </div>
            <div className="FiltrSec mb-5">
              <div className="FltrSrch mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
              <div className="FltrButns mb-3">
                <div className="mr-4">
                  <button
                    className="btn text-white f16 btn-bg bg-transparent kids Btn138-40"
                    type="button"
                    routerlink="/connect-wallet"
                  >
                    Filter{" "}
                    <img
                      alt=""
                      src="/static/assets/images/pages/fltr-icon.svg"
                      className="ml-2"
                    />
                  </button>
                </div>
                <div className="CusSlect">
                  <select className="form-control custom-select">
                    <option>Sort by</option>
                    <option>Sort by</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="PlyPgHdd stbl-tab dpuff">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle1("1");
                    }}
                  >
                    NFT Box
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle1("2");
                    }}
                  >
                    Dogs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle1("3");
                    }}
                  >
                    Injured Dogs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      toggle1("4");
                    }}
                  >
                    Puppies Born
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div className="row mt-3">
                    <div className="col-lg-3 col-sm-6 col-12 mb-5">
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="gft-stbl-cont-align ">
                          <div className="gft-stbl-cont-align ">
                            <div className="stbl-tab-img  text-center">
                              <img
                                alt=""
                                src="/static/assets/images/market-place/dog-img/gift-img.png"
                                className="img-fluid"
                              />
                            </div>
                            <div className="stbl-tab-cnt">
                              <h3 className="mb-0 lg-37 mt-2">#253</h3>
                            </div>
                          </div>
                        </div>
                        <div className="content-details">
                          <ul className="list-unstyled cur-pointer">
                            <li onClick={toggle2}>Open Now</li>
                            <li onClick={toggle3}>Transfer</li>
                            <li onClick={toggle4}>Sell Now</li>
                            <li onClick={toggle5}>Auction Now</li>
                            <li>Cancel Order</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 mb-5">
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="gft-stbl-cont-align ">
                          <div className="gft-stbl-cont-align ">
                            <div className="stbl-tab-img text-center">
                              <img
                                alt=""
                                src="/static/assets/images/market-place/dog-img/gift-img.png"
                                className="img-fluid"
                              />
                            </div>
                            <div className="stbl-tab-cnt">
                              <h3 className="mb-0 lg-37 mt-2">#253</h3>
                            </div>
                          </div>
                        </div>
                        <div className="content-details">
                          <ul className="list-unstyled cur-pointer">
                            <li onClick={toggle2}>Open Now</li>
                            <li onClick={toggle3}>Transfer</li>
                            <li onClick={toggle4}>Sell Now</li>
                            <li onClick={toggle5}>Auction Now</li>
                            <li>Cancel Order</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 mb-5">
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="gft-stbl-cont-align ">
                          <div className="gft-stbl-cont-align ">
                            <div className="stbl-tab-img text-center">
                              <img
                                src="/static/assets/images/market-place/dog-img/gift-img.png"
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                            <div className="stbl-tab-cnt">
                              <h3 className="mb-0 lg-37 mt-2">#253</h3>
                            </div>
                          </div>
                        </div>
                        <div className="content-details">
                          <ul className="list-unstyled cur-pointer">
                            <li>Open Now</li>
                            <li>Transfer</li>
                            <li>Sell Now</li>
                            <li>Auction Now</li>
                            <li>Cancel Order</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="row mt-3">
                    {content}

                    {/* <div className="col-lg-3 col-sm-6 col-12 mb-5">
                                 <div className="content">
                                       <div className="content-overlay"></div>
                                       <div className="gft-stbl-cont-align ">
                                          <div className="gft-stbl-cont-align ">

                                             <div className="stbl-tab-img alt="" text-center">
                                                   <img alt="" src="/static/assets/images/market-place/dog-img alt=""/amstaff-4.png" alt="" className="img alt=""-fluid" />
                                             </div>
                                             <div className="stbl-tab-cnt">
                                                   <h3 className="mb-0 lg-37 mt-2">
                                                      #253
                                                   </h3>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="content-details">
                                          <ul className="list-unstyled cur-pointer">
                                             <li>Specification</li>
                                             <li>Transfer</li>
                                             <li>Sell Now</li>
                                             <li>Auction Now</li>
                                          </ul>
                                       </div>
                                 </div>
                              </div>
                              <div className="col-lg-3 col-sm-6 col-12 mb-5">
                                 <div className="content">
                                       <div className="content-overlay"></div>
                                       <div className="gft-stbl-cont-align ">
                                          <div className="gft-stbl-cont-align ">

                                             <div className="stbl-tab-img alt="" text-center">
                                                   <img alt="" src="/static/assets/images/market-place/dog-img alt=""/amstaff-4.png" alt="" className="img alt=""-fluid" />
                                             </div>
                                             <div className="stbl-tab-cnt">
                                                   <h3 className="mb-0 lg-37 mt-2">
                                                      #253
                                                   </h3>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="content-details">
                                          <ul className="list-unstyled cur-pointer">
                                             <li>Specification</li>
                                             <li>Transfer</li>
                                             <li>Sell Now</li>
                                             <li>Auction Now</li>
                                          </ul>
                                       </div>
                                 </div>
                              </div> */}
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="row mt-3">
                    <div className="col-lg-3 col-sm-6 col-12 mb-5">
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="gft-stbl-cont-align ">
                          <div className="gft-stbl-cont-align ">
                            <div className="stbl-tab-img  text-center">
                              <img
                                alt=""
                                src="/static/assets/images/market-place/dog-img/tatra-3.png"
                                className="img-fluid"
                              />
                            </div>
                            <div className="stbl-tab-cnt">
                              <h3 className="mb-0 lg-37 mt-2">#253</h3>
                            </div>
                          </div>
                        </div>
                        <div className="content-details">
                          <ul className="list-unstyled cur-pointer">
                            <li>Specification</li>
                            <li>Transfer</li>
                            <li>Sell Now</li>
                            <li>Auction Now</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 mb-5">
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="gft-stbl-cont-align ">
                          <div className="gft-stbl-cont-align ">
                            <div className="stbl-tab-img  text-center">
                              <img
                                alt=""
                                src="/static/assets/images/market-place/dog-img/tatra-3.png"
                                className="img-fluid"
                              />
                            </div>
                            <div className="stbl-tab-cnt">
                              <h3 className="mb-0 lg-37 mt-2">#253</h3>
                            </div>
                          </div>
                        </div>
                        <div className="content-details">
                          <ul className="list-unstyled cur-pointer">
                            <li>Specification</li>
                            <li>Transfer</li>
                            <li>Sell Now</li>
                            <li>Auction Now</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="row mt-3">
                    <div className="col-lg-3 col-sm-6 col-12 mb-md-4 mb-3">
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="gft-stbl-cont-align ">
                          <div className="stbl-tab-img text-center">
                            <img alt="" src={shadowDog} className="img-fluid" />
                          </div>
                          <div className="stbl-tab-cnt">
                            <h3 className="mb-0  lg-37"></h3>
                          </div>
                        </div>
                        <div className="content-details nd_hover_show cur-pointer">
                          <div className="mb-3">
                            <h2> </h2>
                          </div>
                          <ul className="list-unstyled mb-3">
                            <div className="tym-bg">
                              <span
                                className="f_18 f_w_500 text-center"
                                onClick={toggle6}
                              >
                                Set Dog Name
                              </span>
                            </div>
                          </ul>
                          <div className="mb-3">
                            <h2></h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 mb-md-4 mb-3">
                      <div className="content">
                        <div className="content-overlay"></div>
                        <div className="gft-stbl-cont-align ">
                          <div className="stbl-tab-img  text-center">
                            <img alt="" src={shadowDog} className="img-fluid" />
                          </div>
                          <div className="stbl-tab-cnt">
                            <h3 className="mb-0  lg-37"></h3>
                          </div>
                        </div>
                        <div className="content-details nd_hover_show cur-pointer">
                          <div className="mb-3">
                            <h2> </h2>
                          </div>
                          <ul className="list-unstyled mb-3">
                            <div className="tym-bg">
                              <span className="f_18 f_w_500 text-center">
                                Set Dog Name
                              </span>
                            </div>
                          </ul>
                          <div className="mb-3">
                            <h2></h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>

      <Modal
        centered={true}
        isOpen={modal}
        toggle={toggle}
        className={"email-bg1"}
        contentClassName="email-bg"
        modalClassName="modal-md"
      >
        <ModalHeader
          toggle={toggle}
          className="justify-content-center  border-0 pt-5 text-center"
        >
          <h4
            id="dialog-static-name"
            className="modal-title text-white pull-left kids text-uppercase"
          >
            Specifications
          </h4>
        </ModalHeader>
        <ModalBody>
          <div className="MyStbMdlCnt">
            <div className="SpcfyCnt">
              <p>
                Age : <span>Young</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Gender : <span>Female</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Blood Line : <span>Buterin</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Feeding : <span>Hunger</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Health : <span>Well</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Physical Condition : <span>Restful</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Intelligence : <span>0.00</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Strength : <span>0.00</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Speed : <span>5 kmph</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Agility : <span>0.00</span>
              </p>
            </div>
            <div className="SpcfyCnt">
              <p>
                Discipline : <span>Disciplined dog</span>
              </p>
            </div>
          </div>
        </ModalBody>
        <div className="position-relative" onClick={toggle}>
          <img
            alt=""
            src="/static/assets/images/wallet/close.svg"
            className="img-fluid close-bg"
          />
        </div>
      </Modal>

      <Modal
        centered={true}
        isOpen={modal1}
        toggle={toggle2}
        className={"email-bg1"}
        contentClassName="email-bg"
        modalClassName="modal-md"
      >
        <ModalHeader
          toggle={toggle}
          className="justify-content-center  border-0 pt-5 text-center"
        ></ModalHeader>
        <ModalBody className="dpuff">
          <div className="MystryMdlSec">
            <div className="MystryBox">
              <img
                alt=""
                src={gift}
                id="mystBoxGif"
                className="img-fluid d-block mx-auto"
              />
            </div>
            <div className=" w-100">
              <div className="MystryDogImg">
                <div className="mrkt-dg-img ">
                  <div className="rookie-dg-cnt">
                    <h3 className="mb-3">Dog12345</h3>
                    <div
                      role="button"
                      className="btn f15 fw-500 mh-auto dpuff btn-bg"
                    >
                      COLLECT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        centered={true}
        isOpen={modal2}
        toggle={toggle3}
        className={"email-bg1"}
        contentClassName="email-bg"
        modalClassName="modal-md"
      >
        <ModalHeader
          toggle={toggle}
          className="justify-content-center  border-0 pt-5 text-center"
        >
          <h4
            id="dialog-static-name"
            className="modal-title text-yellow pull-left dpuff text-uppercase"
          >
            Dogs Transfer
          </h4>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="SttngFrm mb-5 GrdInptFrm">
              <label className="LblFrm">To address</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
              <button className="btn f15 fw-500 dpuff btn-bg" type="button">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
        <div className="position-relative text-center">
          <img alt="" src={close} className="img-fluid close-bg" />
        </div>
      </Modal>

      <Modal
        centered={true}
        isOpen={modal3}
        toggle={toggle4}
        className={"email-bg1"}
        contentClassName="email-bg"
        modalClassName="modal-md"
      >
        <ModalHeader
          toggle={toggle4}
          className="justify-content-center  border-0 pt-5 text-center"
        >
          <h4
            id="dialog-static-name"
            className="modal-title text-yellow pull-left dpuff text-uppercase"
          >
            Fixed sell
          </h4>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="SttngFrm mb-5 GrdInptFrm">
              <label className="LblFrm">Currency</label>
              <br />
              <select className="dropdown form-control text-left">
                <option
                  className="dropdown-item"
                  disabled
                  selected
                  value="undefined"
                >
                  --- Select ---
                </option>
                <option value="BNB">BNB</option>
                <option value="DOGGY">DOGGY Token</option>
                <option value="BUSD">BUSD Token</option>
              </select>

              <br />

              <label className="LblFrm">Amount</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="0.000"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
              <button className="btn f15 fw-500 dpuff btn-bg" type="submit">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
        <div className="position-relative text-center">
          <img
            alt=""
            src={close}
            className="img-fluid close-bg"
            onClick={toggle4}
          />
        </div>
      </Modal>

      <Modal
        centered={true}
        isOpen={modal4}
        toggle={toggle5}
        className={"email-bg1"}
        contentClassName="email-bg"
        modalClassName="modal-md"
      >
        <ModalHeader
          toggle={toggle5}
          className="justify-content-center  border-0 pt-5 text-center"
        >
          <h4
            id="dialog-static-name"
            className="modal-title text-yellow pull-left dpuff text-uppercase"
          >
            Auction Now
          </h4>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="SttngFrm mb-5 GrdInptFrm">
              <label className="LblFrm">Amount</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Amount"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="amount"
                />
              </div>
            </div>

            <label className="text-white">Currency</label>
            <select className="dropdown form-control input-group-text text-left">
              <option className="dropdown-item " selected value="undefined">
                --- Select ---
              </option>
              <option value="BNB">BNB</option>
              <option value="DOGGY">DOGGY Token</option>
              <option value="BUSD">BUSD Token</option>
            </select>
            <br />
            <div className="SttngFrm mb-5 GrdInptFrm">
              <label className="LblFrm">Date</label>
              <div className="input-group mb-3">
                <input
                  type="datetime-local"
                  className="form-control date"
                  placeholder="To Date"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="day"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
              <button className="btn f15 fw-500 dpuff btn-bg" type="submit">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
        <div className="position-relative text-center">
          <img
            alt=""
            src={close}
            className="img-fluid close-bg"
            onClick={toggle5}
          />
        </div>
      </Modal>

      <Modal
        centered={true}
        isOpen={modal5}
        toggle={toggle6}
        className={"email-bg1"}
        contentClassName="email-bg"
        modalClassName="modal-md"
      >
        <ModalHeader
          toggle={toggle6}
          className="justify-content-center  border-0 pt-5 text-center"
        >
          <h4
            id="dialog-static-name"
            className="modal-title text-white pull-left  text-uppercase text-yellow"
          >
            New Dog Name
          </h4>
        </ModalHeader>
        <ModalBody>
          <div className="MyStbMdlCnt">
            <div className="text-center mr-3">
              <img alt="" className="img-fluid " src={bassotto2} />
            </div>
            <form>
              <div className="SttngFrm mb-5 GrdInptFrm">
                <label className="LblFrm">Dog Name</label>
                <div className="input-group input_nd_dule mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Dog Name"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" id="">
                      {" "}
                      # 455
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mb-4 choose_option">
                <button className="btn f15 fw-500 dpuff btn-bg">Submit</button>
              </div>
            </form>
          </div>
        </ModalBody>
        <div className="position-relative text-center">
          <img
            alt=""
            src={close}
            className="img-fluid close-bg"
            onClick={toggle6}
          />
        </div>
      </Modal>
    </>
  );
};
export default MyStable;
