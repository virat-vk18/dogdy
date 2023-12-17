import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  connectMetamask,
  setConnected,
  setAddress,
  setBalance,
  setCurrentUserId,
} from "../../redux/feature/connectWalletSlice";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Web3 from "web3";

import { useJwtAddressMutation } from "./walletApi";
import { useState } from "react";

const ConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  //Local Storage ID
  // React Redux
  const dispatch = useDispatch();
  const { address, balance } = useSelector(connectMetamask);

  // Routing Pages Function Variable
  const [jwtAddress] = useJwtAddressMutation();
  const navigate = useNavigate();

  const web3Instance = new Web3(window.ethereum);
  const connectMetaMaskWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the selected account from MetaMask
        const accounts = await web3Instance.eth.getAccounts();
        // changing redux state
        dispatch(setConnected(true));
        const walletAddress = accounts[0];
        dispatch(setAddress(walletAddress));

        // Get the account balance
        const balance = await web3Instance.eth.getBalance(accounts[0]);
        const walletBalance = web3Instance.utils.fromWei(balance, "ether");
        dispatch(setBalance(walletBalance));
        // get Response From Jwt
        const getToken = await jwtAddress({ address: accounts[0] });
        if (getToken.data) {
          const localStorageID = getToken.data.accessToken;
          localStorage.setItem("token", localStorageID);
        }

        if (getToken.data) {
          //owner Id
          const ownId = getToken.data.id;
          localStorage.setItem("ownedBy", JSON.stringify(ownId));
          if (getToken.data.message == "Adress Saved Sucessfully") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Congratulations",
              text: "You've Recived 50 Matics Coins ",
              showConfirmButton: false,
              timer: 3000,
            });
          }
          const localStorageID = getToken.data.accessToken;
          const ownerId = getToken.data.id;
          dispatch(setCurrentUserId(ownerId));
          localStorage.setItem("token", JSON.stringify(localStorageID));
        }

        dispatch(setBalance(walletBalance));

        // Get the network ID
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x13881",
            },
          ],
        });

        const checkIfAccountChanged = async () => {
          try {
            const { ethereum } = window;
            await window.ethereum.on("accountsChanged", (accounts) => {
              console.log("Account changed to:", accounts[0]);
              setCurrentAccount(accounts[0]);
              dispatch(setAddress(currentAccount));
            });
          } catch (error) {
            console.log(error);
          }
        };
        checkIfAccountChanged();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("Install MetaMask");
    }
  };
  const loggedIn = JSON.parse(localStorage.getItem("token"));

  //Refresh If MetaMask Not Connected
  if (address === "") {
    if (window.ethereum.isConnected() === false) {
      connectMetaMaskWallet();
    } else {
      <Outlet />;
    }
  }
  return (
    <>
      <div className="connect-bg p-xl-5 p-3">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-6 col-sm-12 col-lg-6 col-md-12">
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-6 col-xl-6">
                  <div className="orange-filter  text-center p-xl-5 p-3 mb-5">
                    <img
                      alt=""
                      src="/static/assets/images/wallet/connect-1.svg"
                      className="mb-3"
                    />
                    <label className="text-white d-block sen-bold f18 fw-400">
                      Metamask
                    </label>
                    <label className="text-grey sen-reg  d-block f16 fw-400">
                      Browser Extension
                    </label>
                  </div>
                </div>
                {/* <div className="col-sm-12 col-lg-6 col-md-6 col-xl-6">
                           <div className="green-filter text-center p-xl-5 p-3 mb-5">
                              <img alt="" src="/static/assets/images/wallet/connect-2.svg" className="mb-3" />
                                 <label className="text-white d-block sen-bold f18 fw-400">BNB Extension</label>
                                 <label className="text-grey sen-reg  d-block f16  fw-400">Browser Extension</label>
                           </div>
                        </div> */}
              </div>
            </div>

            <div className="col-xl-6 col-sm-12 col-lg-6 col-md-12">
              <div className=" d-flex align-items-center position-relative">
                <button
                  className=" btn  f16 text-linear sen-bold letter fw-400 sen"
                  type="button"
                  onClick={connectMetaMaskWallet}
                >
                  <span>
                    {address === ""
                      ? `Connect Wallet`
                      : `Connected..${address.substring(
                          0,
                          5
                        )}..${address.substring(39, 42)}`}
                  </span>
                </button>

                <img
                  alt=""
                  src="/static/assets/images/wallet/arrow-1.svg"
                  className="position-arrow"
                />
              </div>
              <p className="btn f16 text-linear sen-bold letter fw-400 sen">
                {address === " " ? " " : <p>Balance : {balance}</p>}
              </p>

              <h2 className="f40 text-white  fw-400 kids lh-70">
                Start Playing <br />
                <span className="f60 text-white mt-4 fw-400 kids">
                  Osiz ville
                </span>
              </h2>
              <p className="text-grey sen-reg  d-block f18  fw-400">
                Select an option to login or connect your wallet to the game.
              </p>
              <label className="text-white d-block sen-reg mt-4 f18 fw-400">
                What is Metamask?
              </label>
              <p className="text-grey sen-reg  d-block f16 mt-4  lh-30 fw-400">
                A crypto-wallet that sits securely in your web browser. If you
                would like to set up your own Metamask wallet, please follow the
                following instructions. This wallet will allow you to enjoy the
                full Osiz ville experience.
              </p>
              {address === "" ? (
                ""
              ) : (
                <div>
                  <button
                    className=" btn  f16 text-linear sen-bold letter fw-400 sen"
                    type="button"
                  >
                    Disconnect Metamask
                  </button>
                </div>
              )}
              <div className="mt-5">
                <a
                  onClick={() => navigate("/")}
                  className="f16 text-white mt-4 fw-400 sen-reg"
                >
                  <img
                    alt=""
                    src="/static/assets/images/wallet/arrow-w.svg"
                    className="mr-2"
                  />
                  Go Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConnectWallet;
