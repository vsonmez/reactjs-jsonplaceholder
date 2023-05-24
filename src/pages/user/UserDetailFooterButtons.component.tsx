import React from "react";
import { Link } from "react-router-dom";
import TUser from "../../models/user/user.type";

const UserDetailFooterButtons = ({ selectedUser }: { selectedUser: TUser }) => {
  return (
    <>
      <Link
        to={`/posts/user/${selectedUser?.id}`}
        className="p-2 border rounded"
      >
        Posts
      </Link>
      <Link
        to={`/photos/user/${selectedUser?.id}`}
        className="p-2 border rounded"
      >
        Photos
      </Link>
      <Link to="/todos" className="p-2 border rounded">
        Todos
      </Link>
    </>
  );
};

export default React.memo(UserDetailFooterButtons);
