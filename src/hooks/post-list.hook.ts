import { useCallback } from "react";
import PostStore from "../store/post.store";
import ApplicationStore from "../store/store";
import useIsLoading from "./useIsLoading.hook";

const usePostList = () => {
  const { setIsLoading } = useIsLoading();
  const dispatch = ApplicationStore.useAppDispatch();
  const postList = ApplicationStore.useAppSelector(PostStore.select.postList);

  const fetchAllPosts = useCallback(() => {
    setIsLoading(true);
    dispatch(PostStore.fetchAllPosts()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch, setIsLoading]);

  const getPostListByUserId = useCallback(
    (userId: number) => {
      setIsLoading(true);
      dispatch(PostStore.fetchPostsByUserId(userId)).finally(() => {
        setIsLoading(false);
      });
    },
    [dispatch, setIsLoading]
  );

  return {
    postList,
    fetchAllPosts,
    getPostListByUserId,
  };
};

export default usePostList;
