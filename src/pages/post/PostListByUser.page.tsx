import React, { useEffect } from "react";
import { useParams } from "react-router";
import usePostList from "../../hooks/post-list.hook";
import PostListItemComponent from "./PostListItem.component";
import SelectUserComponent from "../../components/SelectUser.component";

const PostListByUser = () => {
  const { userId } = useParams<"userId">();
  const { getPostListByUserId, postList } = usePostList();

  useEffect(() => {
    getPostListByUserId(Number(userId));
  }, [getPostListByUserId, userId]);

  return (
    <div className="flex flex-col space-y-3 p-3">
      <div className="flex items-center space-x-1">
        <span className="text-[16px]">Posts by</span>
        <SelectUserComponent canNavigteSelectedUserPosts></SelectUserComponent>
      </div>
      {postList.map((post) => (
        <PostListItemComponent
          key={post.id}
          post={post}
          isShowAuthorPostLink={false}
          isShowComments
        ></PostListItemComponent>
      ))}
    </div>
  );
};

export default React.memo(PostListByUser);
