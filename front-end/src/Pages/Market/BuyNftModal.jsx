import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNftBuyerDetailsMutation } from "./marketApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function BuyNftModal({ getData, setShowBuyBtn, id }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  //RTK For NFT Buyer
  const [nftBuyerDetails] = useNftBuyerDetailsMutation();
  const handleShow = () => setShow(true);

  //Owned By LocalStorageId
  const ownedBy = JSON.parse(localStorage.getItem("ownedBy"));

  const handleBuyNow = async () => {
    try {
      let getQueryData;
      getQueryData = getData[0];
      if (getQueryData.ownedby !== ownedBy) {
        const data = {
          nftId: getQueryData._id,
          nftBuyer: ownedBy,
          nftname: getQueryData.nftName,
          nftage: getQueryData.age,
          nftgender: getQueryData.gender,
          sellprice: getQueryData.sellprice,
        };
        const response = await nftBuyerDetails(data);
        if (response.error) {
          return toast.error(response.error.data.message);
        }
        console.log(response);
        toast.success("Thanks For Choosing us Buy More And Make More Fun");
        setShowBuyBtn(false);
        setShow(false);
        return navigate("/market-place");
      } else {
        return toast.error("Owner Can't Buy Own Nft");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}
      <button
        className="btn  f15 fw-500 dpuff btn-bg "
        type="button"
        onClick={handleShow}
      >
        {" "}
        Buy Now
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm Would You Like to Buy Nft</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBuyNow}>
            BuyNow
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BuyNftModal;
