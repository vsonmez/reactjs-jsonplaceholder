import React, { useEffect } from "react";
import { useParams } from "react-router";
import useUser from "../../hooks/user.hook";
import UserDetailFooterButtonsComponent from "./UserDetailFooterButtons.component";

const UserDetailPage = () => {
  const { userId } = useParams<"userId">();
  const { setSelectedUser, selectedUser } = useUser();
  useEffect(() => {
    if (userId) {
      setSelectedUser(Number(userId));
    }
  }, [userId, setSelectedUser]);
  return (
    <ul className="mt-4">
      <li className="text-[18px] border-b mb-1 text-center">
        {selectedUser?.name}
      </li>
      <li className="flex items-center">
        <span className="w-[96px] py-1">Email:</span>
        {selectedUser?.email}
      </li>
      <li className="flex items-center">
        <span className="w-[96px] py-1">Phone:</span>
        {selectedUser?.phone}
      </li>
      <li className="flex items-center">
        <span className="w-[96px] py-1">Username:</span>
        {selectedUser?.username}
      </li>
      <li className="flex items-center">
        <span className="w-[96px] py-1">Website:</span>
        {selectedUser?.website}
      </li>
      <li className="mt-3 border-b mb-1">
        <span className="text-center block">Address</span>
      </li>
      <li>
        {selectedUser?.address.city}, {selectedUser?.address.street} st.
      </li>
      <li>
        {selectedUser?.address.suite}, ZIP {selectedUser?.address.zipcode}
      </li>
      <li className="mt-3 border-b mb-1">
        <span className="text-center block">Company</span>
      </li>
      <li>{selectedUser?.company.name}</li>
      <li>
        {selectedUser?.company.catchPhrase}, {selectedUser?.company.bs}.
      </li>
      <li className="flex space-x-2 mt-2 justify-center border-t pt-3">
        <UserDetailFooterButtonsComponent
          selectedUser={selectedUser}
        ></UserDetailFooterButtonsComponent>
      </li>
    </ul>
  );
};

export default React.memo(UserDetailPage);
