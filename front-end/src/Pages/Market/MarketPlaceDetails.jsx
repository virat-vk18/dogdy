import { useNavigate, useParams } from "react-router-dom";
import { useGetMarketDogsMutation, useGetsellSpecDogsQuery } from "./marketApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BuyNftModal from "./BuyNftModal";
import noData from "../../assets/images/NoData/No data-cuate.png";
const MarketPlaceDetails = () => {
  const { id: dogId } = useParams();
  const navigate = useNavigate();
  const [showBuyBtn, setShowBuyBtn] = useState(true);
  const [getData, setGetData] = useState([]);
  const ownedBy = JSON.parse(localStorage.getItem("ownedBy"));
  //Dog Details RTK

  const [getMarketDogs] = useGetMarketDogsMutation();
  //Nft Buyer RTK
  useEffect(() => {
    const handleSellNowBtn = async () => {
      try {
        const response = await getMarketDogs({ id: dogId });

        const resultData = response.data.getData;
        setGetData(resultData);
        if (response.data.data.ownedby === ownedBy) {
          setShowBuyBtn(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    handleSellNowBtn();
  }, [showBuyBtn]);
  //BUY BUTTON FUNCTION

  //Routed and Finded Dog

  return (
    <>
      <section>
        {getData.length > 0 ? (
          <div className="container">
            <div className="mb-2">
              <a
                onClick={() => navigate("/market-place")}
                className="text-white bck_btn"
              >
                <span>
                  <img
                    alt=""
                    className=""
                    src="/static/assets/images/market-place/back-arrow.svg"
                  />
                </span>
                Go Back
              </a>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="myst_box">
                  <img
                    alt=""
                    src={`http://localhost:3991/${getData[0].nftImage}`}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className=" align-items-center justify-content-between flex-wrap">
                  <div className="myst_txt">
                    <h2 className="text-white">{getData[0].nftName}</h2>
                    <p className="text-muted">Age :{getData[0].age}</p>
                    <p className="text-muted">Gender:{getData[0].gender}</p>
                    <p className="text-white">{getData[0].description}</p>

                    <h3>
                      {getData[0].sellprice}
                      <span> MATIC </span>
                    </h3>
                  </div>
                  {showBuyBtn === true ? (
                    <BuyNftModal
                      getData={getData}
                      setShowBuyBtn={setShowBuyBtn}
                      id={dogId}
                    />
                  ) : (
                    " "
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <img src={noData} className="img-fluid" alt="No data" />
        )}
      </section>
    </>
  );
};
export default MarketPlaceDetails;
