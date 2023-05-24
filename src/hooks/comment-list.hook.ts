import { useCallback, useMemo, useState } from "react";
import CommentStore from "../store/comment.store";
import ApplicationStore from "../store/store";
import useIsLoading from "./useIsLoading.hook";

const useCommentList = () => {
  const [postId, setPostId] = useState<number>();
  const { setIsLoading } = useIsLoading();
  const dispatch = ApplicationStore.useAppDispatch();
  const _commentList = ApplicationStore.useAppSelector(
    CommentStore.select.commentList
  );

  const commentList = useMemo(() => _commentList[postId], [_commentList]);

  const fetchCommentsByPostId = useCallback(
    (postId: number) => {
      setPostId(postId);
      setIsLoading(true);
      dispatch(CommentStore.asyncThunks.fetchCommentsByPostId(postId)).finally(
        () => {
          setIsLoading(false);
        }
      );
    },
    [setIsLoading, dispatch]
  );

  return {
    commentList,
    fetchCommentsByPostId,
  };
};

export default useCommentList;
