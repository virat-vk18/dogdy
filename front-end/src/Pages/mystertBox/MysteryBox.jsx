const MysteryBox = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="mb-2">
            <a className="text-white bck_btn">
              <span>
                <img alt=""
                  className=""
                  src="/static/assets/images/market-place/back-arrow.svg"
                  alt=""
                />
              </span>
              Go Back
            </a>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="myst_box">
                <img alt=""
                  src="/static/assets/images/market-place/mrkt-2.gif"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="myst_txt">
                  <h2 className="text-white">NBFLETCHER</h2>
                  <h3>
                    $29.3<span> BNB </span>
                  </h3>
                </div>
                <div className="">
                  <button
                    className="btn text-white f15 btn-bg bg-transparent"
                    type="button"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade email-bg1"
        bsModal
        tabindex="-1"
        role="dialog"
        aria-labelledby="dialog-static-name"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content email-bg">
            <div className="modal-header justify-content-center  border-0 pt-5 text-center"></div>
            <div className="modal-body">
              <div className="MystryMdlSec">
                <div className="MystryBox">
                  <img alt=""
                    src="/static/assets/images/pages/mystry-box.gif"
                    className="img alt=""-fluid d-block mx-auto"
                  />
                </div>
                <div className="MystryDogSec">
                  <div className="MystryDogImg">
                    <img alt=""
                      src="/static/assets/images/pages/mystry-dog.png"
                      className="img alt=""-fluid"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn BtnPrmry BtnGrd150-50 kids fw-400">
                      collect
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="position-relative">
              <img alt=""
                src="/static/assets/images/wallet/close.svg"
                className="img alt=""-fluid close-bg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MysteryBox;
