import React from "react";
import TComment from "../../models/comment.type";
import UpperCaseComponent from "../../components/UpperCase.component";

const PostCommentListItem = ({ comment }: { comment: TComment }) => {
  return (
    <div className="p-3">
      <div className="flex items-center mb-2">
        <span className="text-[18px]">
          <UpperCaseComponent
            value={comment.name}
            isTitleCase
          ></UpperCaseComponent>
        </span>
        <i className="ml-5">From: {comment.email}</i>
      </div>
      <div>
        <UpperCaseComponent
          value={comment.body}
          isOnlyFirstLetter
        ></UpperCaseComponent>
      </div>
    </div>
  );
};

export default React.memo(PostCommentListItem);
