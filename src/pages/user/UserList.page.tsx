import React from "react";
import { Outlet } from "react-router";
import useUserList from "../../hooks/user-list.hook";
import UserListItemComponent from "./UserListItem.component";

const UserListPage = () => {
  const { userList } = useUserList();

  return (
    <>
      <div className="grid grid-cols-6 gap-3 p-3">
        {userList.map((user) => (
          <UserListItemComponent
            key={user.id}
            user={user}
          ></UserListItemComponent>
        ))}
      </div>
      <div className="flex justify-center">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default React.memo(UserListPage);
