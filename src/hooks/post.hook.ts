import { useCallback, useState } from "react";
import useUserList from "./user-list.hook";
import TUser from "../models/user/user.type";
import useUser from "./user.hook";

const usePost = () => {
  const { setSelectedUser } = useUser();
  const [author, setAuthor] = useState<TUser>();
  const { getUserById } = useUserList();
  const setPostAuthor = useCallback(
    (userId: number) => {
      const author = getUserById(userId);
      setAuthor(author);
      setSelectedUser(author.id);
    },
    [getUserById, setSelectedUser]
  );
  return {
    author,
    setPostAuthor,
  };
};

export default usePost;
