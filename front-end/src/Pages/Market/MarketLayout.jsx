import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";

const MarketLayout = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <Header />

      <div className="container site-cnt">
        <div className="basic-layout mt-3">
          <div className="sidenav">
            <nav id="sidebar">
              <ul className="list-unstyled components">
                <li className="mt-3" onClick={() => navigate("/market-place")}>
                  <a className="sen-reg">
                    <i className="fa fa-shopping-cart mr-3"></i> Market Place{" "}
                  </a>
                </li>
                <li className="mt-3" onClick={() => navigate("/my-stable")}>
                  <a className="sen-reg">
                    <i className="fa fa-user mr-3"></i> My Stable{" "}
                  </a>
                </li>
                <li className="mt-3">
                  <a className="sen-reg">
                    <i className="fa fa-sign-out mr-3"></i> Logout{" "}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="main-cont">
            <div className="cnt-load-div">
              <button
                className="menutoggle d-xl-none ml-4 btn bg-primary1 mt-2"
                type="button"
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
              >
                <span className={openMenu ? "" : "d-none"}>
                  <i className="fa fa-bars text-pink"></i>
                </span>
                <span className={openMenu ? "d-none" : ""}>
                  <i className="fa fa-bars text-pink"></i>
                </span>
              </button>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MarketLayout;
