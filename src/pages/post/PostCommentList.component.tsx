import React, { useCallback, useEffect, useState } from "react";
import useCommentList from "../../hooks/comment-list.hook";
import PostCommentListItemComponent from "./PostCommentListItem.component";
import IconCaretDown from "../../asseets/icons/IconCaretDown.component";
import IconCaretUp from "../../asseets/icons/IconCaretUp.component";

const PostCommentList = ({ postId }: { postId: number }) => {
  const [isCommentListOpened, setIsCommentListOpened] = useState(false);
  const { commentList, fetchCommentsByPostId } = useCommentList();

  const onToggleCommentList = useCallback(() => {
    setIsCommentListOpened(!isCommentListOpened);
  }, [isCommentListOpened, setIsCommentListOpened]);

  useEffect(() => {
    fetchCommentsByPostId(postId);
  }, [fetchCommentsByPostId, postId]);

  return (
    <div className="p-3">
      <div className="flex items-center">
        <span className="text-[18px]">Comments ({commentList?.length})</span>
        <button className="ml-3 cursor-pointer" onClick={onToggleCommentList}>
          {!isCommentListOpened && <IconCaretDown></IconCaretDown>}
          {isCommentListOpened && <IconCaretUp></IconCaretUp>}
        </button>
      </div>
      {isCommentListOpened &&
        commentList?.map((comment) => (
          <PostCommentListItemComponent
            key={comment.id}
            comment={comment}
          ></PostCommentListItemComponent>
        ))}
    </div>
  );
};

export default React.memo(PostCommentList);
