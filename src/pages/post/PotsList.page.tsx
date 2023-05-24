import React, { useEffect } from "react";
import usePostList from "../../hooks/post-list.hook";
import PostListItemComponent from "./PostListItem.component";

const PostListPage = () => {
  const { postList, fetchAllPosts } = usePostList();

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  return (
    <div className="flex flex-col space-y-3 p-3">
      {postList.map((post) => (
        <PostListItemComponent
          post={post}
          key={post.id}
        ></PostListItemComponent>
      ))}
    </div>
  );
};

export default React.memo(PostListPage);
