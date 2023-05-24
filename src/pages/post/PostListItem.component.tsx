import React, { useEffect, useMemo } from "react";
import TPost from "../../models/post.type";
import { Link } from "react-router-dom";
import usePost from "../../hooks/post.hook";
import UpperCaseComponent from "../../components/UpperCase.component";
import PostCommentListComponent from "./PostCommentList.component";

const PostListItem = ({
  post,
  isShowAuthorPostLink = true,
  isShowComments = false,
}: {
  post: TPost;
  isShowAuthorPostLink?: boolean;
  isShowComments?: boolean;
}) => {
  const { setPostAuthor, author } = usePost();
  const authorPostListLink = useMemo(
    () => author && `/posts/user/${author.id}`,
    [author]
  );

  useEffect(() => {
    setPostAuthor(post.userId);
  }, [setPostAuthor, post]);

  return (
    <div key={post.id} className="border rounded p-2">
      <span className="block text-[18px]">
        <UpperCaseComponent value={post.title} isTitleCase></UpperCaseComponent>
      </span>
      <span>
        <UpperCaseComponent
          isOnlyFirstLetter
          value={post.body}
        ></UpperCaseComponent>
      </span>
      {author && (
        <div className="border-t mt-3 pt-3 flex items-center space-x-2">
          <Link
            className="block text-[14px] underline italic"
            to={`/users/${author.id}`}
          >
            Author: {author.name}
          </Link>
          {isShowAuthorPostLink && (
            <Link to={authorPostListLink} className="text-[12px] underline">
              Show more post from {author.name}
            </Link>
          )}
        </div>
      )}
      {isShowComments && (
        <div className="mt-4">
          <PostCommentListComponent postId={post.id}></PostCommentListComponent>
        </div>
      )}
    </div>
  );
};

export default React.memo(PostListItem);
