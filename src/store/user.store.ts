import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TUser from "../models/user/user.type";
import { makeImmutable } from "../herlpers/make-immutable.helper";
import Http from "../http/http";
import ApplicationStore from "./store";

namespace UserStore {
  export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
    const response = await Http.axios.get<TUser[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  });
  type TUserState = {
    isUserListLoading: boolean;
    selectedUser: TUser;
    userList: TUser[];
  };
  const initialState: TUserState = {
    isUserListLoading: false,
    selectedUser: undefined,
    userList: [],
  };
  const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
      setSelectedUser: (state, action: PayloadAction<TUser>) => {
        const selectedUser = action.payload;
        return {
          ...state,
          selectedUser,
        };
      },
      setIsUserListLoading: (state, action: PayloadAction<boolean>) => {
        const isUserListLoading = action.payload;
        return {
          ...state,
          isUserListLoading,
        };
      },
    },
    extraReducers: (builder) => {
      builder.addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<TUser[]>) => {
          const userList = makeImmutable(action.payload);
          return {
            ...state,
            userList,
          };
        }
      );
    },
  });
  export const actions = userSlice.actions;
  export const reducer = userSlice.reducer;
  export const select = {
    isUserListLoading: (state: ApplicationStore.RootState) =>
      state.user.isUserListLoading,
    userList: (state: ApplicationStore.RootState) => state.user.userList,
    selectedUser: (state: ApplicationStore.RootState) =>
      state.user.selectedUser,
  };
}

export default UserStore;
