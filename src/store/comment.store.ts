import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TComment from "../models/comment.type";
import ApplicationStore from "./store";
import Http from "../http/http";
import { makeImmutable } from "../herlpers/make-immutable.helper";
namespace CommentStore {
  export const asyncThunks = {
    fetchCommentsByPostId: createAsyncThunk(
      "comments/fetchCommentsByPostId",
      async (postId: number) => {
        const response = await Http.axios.get<TComment[]>(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        return response.data;
      }
    ),
  };
  type CommentState = {
    commentList: {
      [key: string]: TComment[];
    };
  };
  const initialState: CommentState = {
    commentList: {},
  };
  const commentSlice = createSlice({
    initialState,
    name: "comment",
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(
        asyncThunks.fetchCommentsByPostId.fulfilled,
        (state, action: PayloadAction<TComment[]>) => {
          const commentList = action.payload;
          const postId = commentList[0]?.postId;
          const _commentList = makeImmutable(state.commentList);
          _commentList[postId] = makeImmutable(commentList);
          return {
            ...state,
            commentList: _commentList,
          };
        }
      );
    },
  });
  export const actions = commentSlice.actions;
  export const reducer = commentSlice.reducer;
  export const select = {
    commentList: (state: ApplicationStore.RootState) =>
      state.comment.commentList,
  };
}

export default CommentStore;
