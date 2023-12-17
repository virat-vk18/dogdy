import { createSlice } from "@reduxjs/toolkit";

const connectWalletSlice = createSlice({
  name: "connectMetamask",
  initialState: {
    // Initial state properties
    isConnected: false,
    account: null,
    address: "",
    balance: "",
    currentUserId: null,
    alreadyOwnDog: "",
  },
  reducers: {
    // Add your reducer functions here
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    setAlreadyOwnDog: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
});
export const connectMetamask = (state) => state.connectMetamask;

export const {
  setConnected,
  setAccount,
  setAddress,
  setBalance,
  setCurrentUserId,
  setAlreadyOwnDog,
} = connectWalletSlice.actions;
export default connectWalletSlice.reducer;
