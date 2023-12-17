import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGetFemaleDogsQuery } from "./breedingApi";
import { useNavigate } from "react-router-dom";
import noData from "../../assets/images/NoData/No data-cuate.png";
function SelectMate() {
  const navigate = useNavigate();
  const {
    isLoading,
    isSuccess,
    error,
    data: femaleDogs,
  } = useGetFemaleDogsQuery();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let content;
  try {
    if (isLoading) {
      content = (
        <h1 className=" text-white text-center">Data is Loading....!</h1>
      );
    } else if (isSuccess) {
      const getData = femaleDogs.femaleDogs;

      content = (
        <div className="row">
          {getData.length > 0 ? (
            getData.map((item) => (
              <div className="col-md-6">
                <div className="div" key={item._id}>
                  <div className="card">
                    <div className="card-img-top ">
                      <img
                        alt=""
                        src={`http://localhost:3991/${item.nftImage}`}
                        className="img-fluid"
                      />
                    </div>
                    <div className="card-body">
                      <h6>{item.nftName}</h6>
                      <p className="text-muted">Age:{item.age}</p>
                      <p>Stregenth:{item.stregenth}</p>
                      <p>Speed:{item.speed}</p>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => navigate(`/breeding-dog/${item._id}`)}
                      >
                        BreedNow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img src={noData} className="img-fluid" alt="No data" />
          )}
        </div>
      );
    } else {
      content = <p className="text-white">{error.message}</p>;
    }
  } catch (err) {
    console.log(err.message);
  }
  return (
    <>
      <li variant="primary" onClick={handleShow}>
        select mate
      </li>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SelectMate;
