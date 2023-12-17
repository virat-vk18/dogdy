const MarketPlaceDetails2 = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="mb-2">
            <a className="text-white bck_btn">
              <span>
                <img
                  alt=""
                  className=""
                  src="/static/assets/images/market-place/back-arrow.svg"
                  alt=""
                />
              </span>{" "}
              Go Back
            </a>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="myst_box">
                <img alt="" src="/static/assets/images/gift.gif" alt="" />
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="myst_txt">
                  <h2 className="text-white">NBFLETCHER</h2>
                  <h3>
                    $29.3<span> BNB </span>{" "}
                  </h3>
                </div>
                <div className="">
                  <button
                    className="btn  f15 fw-500 dpuff btn-bg "
                    type="button"
                  >
                    Sell Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MarketPlaceDetails2;
