import "./Footer.scss";
import { useNavigate } from "react-router-dom";
import {
  useGetCopyRightMutation,
  useGetSiteSettingsURLMutation,
} from "./footerApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Footer = () => {
  const navigate = useNavigate();

  const [getURL] = useGetSiteSettingsURLMutation();
  const [getCopyRight] = useGetCopyRightMutation();

  const [URLLink, setURLLink] = useState([]);
  const [copyData, setCopyData] = useState("");

  useEffect(() => {
    const fetchignURL = async () => {
      try {
        const urlResponse = await getURL();
        const getCopy = await getCopyRight();
        setCopyData(getCopy.data.getCopyRight.CopyRight);
        if (urlResponse.error) {
          return toast.error("URL Fetching ERROR");
        }
        setURLLink(urlResponse.data.siteSettingsResponse);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchignURL();
  }, []);

  return (
    <>
      <div className="py-3 footer-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
              <img
                alt=""
                src="/static/assets/images/logo.png"
                className="img-fluid"
              />
              <label className="text-lwhite f-12 ml-5 fw-400">
                {copyData === "" ? "Sorry Something Occured" : copyData}
              </label>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-5">
              <ul className="list-style d-flex flex-wrap  justify-content-center mb-0">
                <li onClick={() => navigate("/faq")}>
                  <a>Faq</a>
                </li>
                <li onClick={() => navigate("/aboutus")}>
                  <a>About Us</a>
                </li>
                <li onClick={() => navigate("/terms")}>
                  <a>Terms of Conditions</a>
                </li>
                <li onClick={() => navigate("/privacy")}>
                  <a>Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="d-flex media-icon justify-content-center ">
                <ul className="list-unstyled d-flex justify-content-center mb-0 ">
                  <li>
                    <a
                      target={URLLink === null ? "" : "_blank"}
                      href={URLLink === null ? " " : URLLink.faceBookUrl}
                    >
                      <i className="fab fa-facebook "></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={URLLink === null ? "#" : URLLink.whatsAppUrl}
                      target={URLLink === null ? "" : "_blank"}
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target={URLLink === null ? "" : "_blank"}
                      href={URLLink === null ? "#" : URLLink.telegramUrl}
                    >
                      <i className="fab fa-telegram "></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={URLLink === null ? "#" : URLLink.instagramUrl}
                      target={URLLink === null ? "" : "_blank"}
                    >
                      <i className="fab fa-instagram "></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
