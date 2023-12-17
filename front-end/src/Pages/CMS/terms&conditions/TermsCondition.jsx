import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import { useClientGetTermsAndConditionsQuery } from "../cmsApi";

const TermsCondition = () => {
  const { isLoading, isSuccess, error, data } =
    useClientGetTermsAndConditionsQuery();
  console.log(isSuccess && data);
  let content;

  if (isLoading) {
    content = <h3 className="text-white text-center">About Us Loading....!</h3>;
  } else if (isSuccess) {
    const termsAndConditionsData = data.getTermsAndCondtionsData[0];
    content = (
      <div className="container mt-xl-5">
        <div className="CmsHdd text-center mb-5 ">
          <h4 className="text-white">{termsAndConditionsData.title}</h4>
        </div>
        <div className="CmsCnt mb-4">
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: termsAndConditionsData.content }}
          ></div>
        </div>
      </div>
    );
  } else {
    content = (
      <h3 className="text-white text-center">
        Sorry An Error {error.message}...!
      </h3>
    );
  }
  return (
    <>
      <Header />

      <div className="CmsPge py-5">
        <div className="container mt-xl-5">
          {content}
          {/* <div className="CmsHdd text-center mb-5">
            <h4>Terms Condition</h4>
          </div>
          <div className="CmsCnt mb-4">
            <h4>Lorem ipsum dolor</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              posuere porttitor rutrum. Suspendisse nec cursus magna, non
              tincidunt dolor. Nulla egestas pulvinar tellus ac malesuada.
              Quisque pretium turpis vel justo consectetur feugiat. Morbi semper
              sapien purus, sit amet facilisis felis commodo id. Ut vitae arcu
              eu risus aliquam mattis. Fusce molestie interdum rutrum. Curabitur
              aliquet sed tellus in porta. Phasellus non ipsum cursus, porttitor
              tellus eu, gravida est. Duis euismod massa neque, non commodo
              purus varius convallis. Fusce lobortis odio risus, sed tristique
              risus rhoncus eu. Fusce interdum velit vitae mattis finibus. Etiam
              congue justo metus, sit amet maximus nisl ultrices et. Fusce sed
              venenatis dolor.
            </p>
          </div>
          <div className="CmsCnt mb-4">
            <h4>Lorem ipsum dolor</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              posuere porttitor rutrum. Suspendisse nec cursus magna, non
              tincidunt dolor. Nulla egestas pulvinar tellus ac malesuada.
              Quisque pretium turpis vel justo consectetur feugiat. Morbi semper
              sapien purus, sit amet facilisis felis commodo id. Ut vitae arcu
              eu risus aliquam mattis. Fusce molestie interdum rutrum. Curabitur
              aliquet sed tellus in porta.
            </p>
          </div>
          <div className="CmsCnt mb-4">
            <h4>Lorem ipsum dolor</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              posuere porttitor rutrum. Suspendisse nec cursus magna, non
              tincidunt dolor. Nulla egestas pulvinar tellus ac malesuada.
              Quisque pretium turpis vel justo consectetur feugiat. Morbi semper
              sapien purus, sit amet facilisis felis commodo id. Ut vitae arcu
              eu risus aliquam mattis. Fusce molestie interdum rutrum. Curabitur
              aliquet sed tellus in porta. Phasellus non ipsum cursus, porttitor
              tellus eu, gravida est. Duis euismod massa neque, non commodo
              purus varius convallis. Fusce lobortis odio risus, sed tristique
              risus rhoncus eu. Fusce interdum velit vitae mattis finibus. Etiam
              congue justo metus, sit amet maximus nisl ultrices et. Fusce sed
              venena.
            </p>
            <p>
              Nulla egestas pulvinar tellus ac malesuada. Quisque pretium turpis
              vel justo consectetur feugiat. Morbi semper sapien purus, sit amet
              facilisis felis commodo id. Ut vitae arcu eu risus aliquam mattis.
              Fusce molestie interdum rutrum. Curabitur aliquet sed tellus in
              porta. Phasellus non ipsum cursus, porttitor tellus eu, gravida
              est. Duis euismod massa neque, non commodo purus varius convallis.
              Fusce lobortis odio risus, sed tristique risus rhoncus eu. Fusce
              interdum velit vitae mattis finibus. Etiam congue justo metus, sit
              amet maximus nisl ultrices et. Fusce sed venenatis dolor.
            </p>
          </div>
          <div className="CmsCnt mb-4">
            <h4>Lorem ipsum dolor</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              posuere porttitor rutrum. Suspendisse nec cursus magna, non
              tincidunt dolor. Nulla egestas pulvinar tellus ac malesuada.
              Quisque pretium turpis vel justo consectetur feugiat. Morbi semper
              sapien purus, sit amet facilisis felis commodo id.{" "}
            </p>
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default TermsCondition;
