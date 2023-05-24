import React, { useCallback } from "react";
import TUser from "../../models/user/user.type";
import { useNavigate } from "react-router";

const UserListItem = ({ user }: { user: TUser }) => {
  const navigate = useNavigate();

  const onClickToUser = useCallback(() => {
    navigate(`/users/${user.id}`);
  }, [navigate, user]);
  return (
    <div
      className="border rounded p-2 hover:shadow-md cursor-pointer transition-shadow"
      onClick={onClickToUser}
    >
      <span>{user.name}</span>
      <i className="block">{user.email}</i>
    </div>
  );
};

export default React.memo(UserListItem);
