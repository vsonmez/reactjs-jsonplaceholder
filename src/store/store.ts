import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserStore from "./user.store";
import PostStore from "./post.store";
import GlobalStore from "./global.store";
import PhotoStore from "./photo.store";
import CommentStore from "./comment.store";

namespace ApplicationStore {
  export const store = configureStore({
    reducer: {
      user: UserStore.reducer,
      post: PostStore.reducer,
      comment: CommentStore.reducer,
      photo: PhotoStore.reducer,
      global: GlobalStore.reducer,
    },
  });
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export const useAppDispatch: () => AppDispatch = useDispatch;
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
}

export default ApplicationStore;
