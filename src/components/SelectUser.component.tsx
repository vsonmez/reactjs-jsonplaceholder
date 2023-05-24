import React, { useCallback, SyntheticEvent } from "react";
import useUserList from "../hooks/user-list.hook";
import useUser from "../hooks/user.hook";
import { useNavigate } from "react-router";

const SelectUser = ({
  canNavigteSelectedUserPosts,
  canNavigteSelectedUserAlbums,
}: {
  canNavigteSelectedUserPosts?: boolean;
  canNavigteSelectedUserAlbums?: boolean;
}) => {
  const navigate = useNavigate();
  const { userList } = useUserList();
  const { selectedUser, setSelectedUser } = useUser();

  const navigateToUserPosts = useCallback(
    (userId: string) => {
      if (canNavigteSelectedUserPosts) {
        navigate(`/posts/user/${userId}`);
      }
    },
    [canNavigteSelectedUserPosts, navigate]
  );

  const navigateToUserAlbums = useCallback(
    (userId: string) => {
      if (canNavigteSelectedUserAlbums) {
        navigate(`/photos/user/${userId}`);
      }
    },
    [canNavigteSelectedUserAlbums, navigate]
  );

  const onChange = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      setSelectedUser(Number(value));
      navigateToUserPosts(value);
      navigateToUserAlbums(value);
    },
    [setSelectedUser, navigateToUserPosts, navigateToUserAlbums]
  );
  return (
    <select
      className="border rounded p-1"
      value={selectedUser?.id || "undefined"}
      onChange={onChange}
    >
      <option value="undefined">Select User</option>
      {userList.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default React.memo(SelectUser);
