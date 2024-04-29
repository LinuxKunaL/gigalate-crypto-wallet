import { createSlice } from "@reduxjs/toolkit";

export const userAccountState = createSlice({
  initialState: {
    address: null,
    balance: 0,
  },
  name: "userState",
  reducers: {
    setAccountState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const reloadUseEffect = createSlice({
  initialState: 0,
  name: "counter",
  reducers: {
    increase: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setAccountState } = userAccountState.actions;
export const { increase } = reloadUseEffect.actions;
