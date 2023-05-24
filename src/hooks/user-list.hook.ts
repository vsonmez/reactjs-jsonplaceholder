import { useCallback } from "react";
import ApplicationStore from "../store/store";
import UserStore from "../store/user.store";
import { makeImmutable } from "../herlpers/make-immutable.helper";
import useIsLoading from "./useIsLoading.hook";

const useUserList = () => {
  const { setIsLoading } = useIsLoading();
  const dispatch = ApplicationStore.useAppDispatch();
  const userList = ApplicationStore.useAppSelector(UserStore.select.userList);

  const fetchAllUsers = useCallback(() => {
    setIsLoading(true);
    dispatch(UserStore.fetchAllUsers()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch, setIsLoading]);

  const getUserById = useCallback(
    (userId: number) => {
      const selectedUser = userList.find((user) => user.id === userId);
      return makeImmutable(selectedUser);
    },
    [userList]
  );

  return {
    userList,
    fetchAllUsers,
    getUserById,
  };
};

export default useUserList;
