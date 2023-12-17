import { configureStore } from "@reduxjs/toolkit";
import { api } from "./service/api";
import connectWalletReducer from "../redux/feature/connectWalletSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    connectMetamask: connectWalletReducer,
  },
  middleware: (getDefalutMiddleware) =>
    getDefalutMiddleware().concat(api.middleware),
});
