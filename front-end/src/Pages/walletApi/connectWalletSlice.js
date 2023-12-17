import { createSlice } from "@reduxjs/toolkit";

const connectWalletSlice = createSlice({
  name: "metamask",
  initialState: {
    // Initial state properties
    isConnected: false,
    account: null,
  },
  reducers: {
    // Add your reducer functions here
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});
export const metamask = (state) => state.metamask;

export const { setConnected, setAccount } = connectWalletSlice.actions;
export default connectWalletSlice.reducer;
