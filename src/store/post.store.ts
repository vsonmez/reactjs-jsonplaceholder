import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Http from "../http/http";
import TPost from "../models/post.type";
import { makeImmutable } from "../herlpers/make-immutable.helper";
import ApplicationStore from "./store";

namespace PostStore {
  export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async () => {
      const response = await Http.axios.get<TPost[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.data;
    }
  );
  export const fetchPostsByUserId = createAsyncThunk(
    "posts/fetchPostsByUserId",
    async (userId: number) => {
      const response = await Http.axios.get<TPost[]>(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      return response.data;
    }
  );
  type PosetState = {
    postList: TPost[];
    postListByUserId: TPost[];
  };
  const initialState: PosetState = {
    postList: [],
    postListByUserId: [],
  };
  const postSlice = createSlice({
    initialState,
    name: "post",
    reducers: {
      setPostlistByUserId: (state, action: PayloadAction<number>) => {
        const userId = action.payload;
        const postList = makeImmutable(state.postList);
        const postListByUserId = postList.filter(
          (post) => post.userId === userId
        );
        return {
          ...state,
          postListByUserId: makeImmutable(postListByUserId),
        };
      },
    },
    extraReducers: (builder) => {
      builder.addCase(
        fetchAllPosts.fulfilled,
        (state, action: PayloadAction<TPost[]>) => {
          const postList = makeImmutable(action.payload);
          return {
            ...state,
            postList,
          };
        }
      );
      builder.addCase(
        fetchPostsByUserId.fulfilled,
        (state, action: PayloadAction<TPost[]>) => {
          const postList = makeImmutable(action.payload);
          return {
            ...state,
            postList,
          };
        }
      );
    },
  });
  export const actions = postSlice.actions;
  export const reducer = postSlice.reducer;
  export const select = {
    postList: (state: ApplicationStore.RootState) => state.post.postList,
    postListByUserId: (state: ApplicationStore.RootState) =>
      state.post.postListByUserId,
  };
}

export default PostStore;
