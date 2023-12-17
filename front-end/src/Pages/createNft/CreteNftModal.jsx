// import React, { useState } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// const CreteNftModal = () => {
//   const [modal, setModal] = useState(false);
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const toggle = () => setModal(!modal);
//   const navigate = useNavigate();

//   return (
//     <div>
//       <li
//         className="nav-link text-white mx-3  cur-pointer"
//         onClick={handleShow}
//       >
//         Create Dog
//       </li>
//       <Modal isOpen={modal} toggle={toggle} style={{ zIndex: "1" }}>
//         <ModalHeader toggle={toggle}>Type Of Creation</ModalHeader>
//         <ModalBody>
//           <div className="row">
//             <div className="col-sm-6">
//               <div className="card">
//                 <div className="card-img alt=""-top">
//                   <img alt="" src={img1} className="img alt=""-fluid" alt="" />
//                 </div>
//                 <div className="card-body">
//                   <p className="text-muted">
//                     Create and Sell your Dog with Nft Collection
//                   </p>
//                   <button
//                     onClick={() => navigate("/sellcreation")}
//                     className="btn btn-warning"
//                   >
//                     Sell Creation
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="col-sm-6">
//               <div className="card">
//                 <div className="card-img alt=""-top">
//                   <img alt="" src={img2} className="img alt=""-fluid" alt="" />
//                 </div>
//                 <div className="card-body">
//                   <p className="text-muted">
//                     Create and Send to Stud Farm your Dog with Nft Collection
//                   </p>
//                   <button
//                     onClick={() => navigate("/studcreation")}
//                     className="btn btn-warning"
//                   >
//                     Stud Creation
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default CreteNftModal;

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import img1 from "../../assets/images/dognft.jpg";
import img2 from "../../assets/images/dogStud.jpg";
import { useNavigate } from "react-router-dom";

function CreteNftModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  return (
    <>
      <li
        className="nav-link text-white mx-3  cur-pointer"
        onClick={handleShow}
      >
        Create Dog
      </li>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "100000" }}
      >
        <Modal.Header className=" text-center">
          <Modal.Title>Type Of Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-img-top">
                  <img src={img1} className="img-fluid" alt="" />
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    Create and Sell your Dog with Nft Collection
                  </p>
                  <button
                    onClick={() => navigate("/sellcreation")}
                    className="btn btn-success"
                  >
                    Sell Creation
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-img-top">
                  <img alt="" src={img2} className="img-fluid" />
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    Create and Send to Stud Farm your Dog with Nft Collection
                  </p>
                  <button
                    onClick={() => navigate("/studcreation")}
                    className="btn btn-warning"
                  >
                    Stud Creation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreteNftModal;
