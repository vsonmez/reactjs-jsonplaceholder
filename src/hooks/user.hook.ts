import { useCallback } from "react";
import ApplicationStore from "../store/store";
import UserStore from "../store/user.store";

const useUser = () => {
  const dispatch = ApplicationStore.useAppDispatch();
  const userList = ApplicationStore.useAppSelector(UserStore.select.userList);
  const selectedUser = ApplicationStore.useAppSelector(
    UserStore.select.selectedUser
  );

  const setSelectedUser = useCallback(
    (userId: number) => {
      const selectedUser = userList.find((user) => user.id === userId);
      dispatch(UserStore.actions.setSelectedUser(selectedUser));
    },
    [userList, dispatch]
  );

  return {
    selectedUser,
    setSelectedUser,
  };
};

export default useUser;
