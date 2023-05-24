import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ApplicationStore from "./store";
namespace GlobalStore {
  type GLobalState = {
    isLoading: boolean;
  };
  const initialState: GLobalState = {
    isLoading: false,
  };
  const globalSlice = createSlice({
    initialState,
    name: "global",
    reducers: {
      setIsLoading: (state, action: PayloadAction<boolean>) => {
        const isLoading = action.payload;
        return {
          ...state,
          isLoading,
        };
      },
    },
  });
  export const actions = globalSlice.actions;
  export const reducer = globalSlice.reducer;
  export const select = {
    isLoading: (state: ApplicationStore.RootState) => state.global.isLoading,
  };
}

export default GlobalStore;
