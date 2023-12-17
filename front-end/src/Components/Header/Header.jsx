import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import { connectMetamask } from "../../redux/feature/connectWalletSlice.js";
import { useSelector } from "react-redux";
import CreteNftModal from "../../Pages/createNft/CreteNftModal.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { address } = useSelector(connectMetamask);
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light mynavbar px-lg-0">
          <div className="container">
            <a className="navbar-brand d-xl-none d-lg-none">
              <img
                alt=""
                src="/static/assets/images/logo.png"
                className="logolight"
              />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <i className="fas fa-bars text-yellow"></i>
            </button>
            <div
              className={`collapse navbar-collapse ${menu ? "in show" : ""}`}
              id="navbarCollapse"
            >
              <ul className="navbar-nav nav mx-auto align-items-center">
                <li className="nav-item">
                  <a
                    className="nav-link mx-1 text-white active cur-pointer pl-lg-0"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => navigate("/breeding")}
                    className="nav-link text-white mx-3  cur-pointer"
                  >
                    Breeding
                  </a>
                </li>
                <li className="nav-item">
                  <CreteNftModal />
                </li>

                <a className="navbar-brand">
                  <img
                    alt=""
                    src="/static/assets/images/logo.png"
                    className="logolight mx-3"
                  />
                </a>
                <li className="nav-item">
                  <a
                    onClick={() => navigate("/market-place")}
                    className="nav-link text-white mx-3  cur-pointer"
                  >
                    Marketplace
                  </a>
                </li>

                {/* <li className="nav-item header-drop ">
                           <div className="btn-group mx-3 py-1 mb-2 " dropdown>
                              <button id="button-basic" dropdownToggle type="button" className="btn 
                         border-dark
                          dropdown-toggle bg-transparent border-0  lh-21" aria-controls="dropdown-basic">

                                 <img alt="" src="/static/assets/images/country.svg" />  <span className="text-white f-14 pl-2 fw-400">US</span> <span className="caret"></span>
                              </button>
                              <ul id="dropdown-basic" className="dropdown-menu" role="menu" aria-labelledby="button-basic" style={{minWidth:"auto!important"}}>
                                 <li role="menuitem">
                                    <a className="dropdown-item text-white" > <img alt="" src="/static/assets/images/country.svg" className="pr-2" /> US</a>
                                 </li>
                                 <li role="menuitem">
                                    <a className="dropdown-item text-white" > <img alt="" src="/static/assets/images/country.svg" className="pr-2" /> US </a>
                                 </li>
                                 <li role="menuitem">
                                    <a className="dropdown-item text-white" > <img alt="" src="/static/assets/images/country.svg" className="pr-2" /> US </a>
                                 </li>

                              </ul>
                           </div>
                        </li> */}

                <li className="mb-2">
                  <div className="">
                    <Link
                      to="/connect-wallet"
                      className="btn primary-btn mt-2 mx-3"
                      type="button"
                    >
                      <span>
                        {address === ""
                          ? `Connect Wallet`
                          : `Connected..${address.substring(
                              0,
                              5
                            )}..${address.substring(39, 42)}`}
                      </span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
