import { configureStore } from "@reduxjs/toolkit";
import { reloadUseEffect, userAccountState } from "./Slice.js";

const store = configureStore({
  reducer: {
    userStates: userAccountState.reducer,
    reloadUseEffect: reloadUseEffect.reducer,
  },
});

export default store;
