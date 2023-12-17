import {
  Button,
  Card,
  CardBody,
  CardHeader,
  UncontrolledCollapse,
} from "reactstrap";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { useGetFAQDatasMutation } from "./faqApi";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [faqDataArr] = useGetFAQDatasMutation();

  useEffect(() => {
    const hanleGetFaqData = async () => {
      const response = await faqDataArr();
      setFaqData(response.data.faqDatas);
    };
    hanleGetFaqData();
  }, []);

  console.log(faqData);

  return (
    <>
      <Header />

      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12 faq-block">
            {faqData?.length < 0 ? (
              <h3 className="text-white text-center">Sorry An Error Occured</h3>
            ) : (
              faqData.map((item, i) => (
                <Card className="mb-3" key={item._id}>
                  <CardHeader>
                    <div
                      className="d-flex liqu-head"
                      accordion-heading
                      role="button"
                      id={`toffle${i}`}
                    >
                      <span className="cardtit f-14 fw-400 text-white">
                        {item.questions}
                      </span>
                      <span className="ml-auto text-blackclr">
                        <img
                          alt=""
                          src="/static/assets/images/market-place/plus.svg"
                          className="img-plus"
                        />
                      </span>
                    </div>
                  </CardHeader>

                  <UncontrolledCollapse toggler={`#toffle${i}`}>
                    <CardBody>
                      <div className="justify-content-center mt-2">
                        <div className="">
                          <p
                            className="f-13 text-justify text-grey2 mb-2"
                            dangerouslySetInnerHTML={{
                              __html: item?.answers,
                            }}
                          ></p>
                        </div>
                      </div>
                    </CardBody>
                  </UncontrolledCollapse>
                </Card>
              ))
            )}
            {/* <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                    id="toggler"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler1">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler1">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler2">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler2">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler3">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler3">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler4">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler4">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler5">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler5">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler6">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler6">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler7">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler7">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div>

            <div className="mb-3">
              <Card>
                <CardHeader>
                  <div
                    className="d-flex liqu-head"
                    accordion-heading
                    role="button"
                  >
                    <span className="cardtit f-14 fw-400 text-white">
                      What’s the difference between a Public Sale and Private
                      Sale?
                    </span>
                    <span className="ml-auto text-blackclr" id="toggler8">
                      <img
                        alt=""
                        src="/static/assets/images/market-place/plus.svg"
                        className="img-plus"
                      />
                    </span>
                  </div>
                </CardHeader>
                <UncontrolledCollapse toggler="#toggler8">
                  <CardBody>
                    <div className="justify-content-center mt-2">
                      <div className="">
                        <p className="f-13 text-justify text-grey2 mb-2">
                          Lorem Ipsum is simply dummy text of the printing
                          typesetting industry. Lorem Ipsum is simply dummy text
                          of the printing. Lorem Ipsum is simply dummy text of
                          the printing.simply dummy text of the printing. Lorem
                          Ipsum.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </UncontrolledCollapse>
              </Card>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Faq;
