import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connectMetamask } from "../../redux/feature/connectWalletSlice";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const { address } = useSelector(connectMetamask);
  const token = JSON.parse(localStorage.getItem("token"));

  return address === "" ? <Navigate to={"/connect-wallet"} /> : <Outlet />;
};

export default PrivateRouter;
