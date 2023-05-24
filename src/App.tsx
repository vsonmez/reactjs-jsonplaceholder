import React, { useEffect } from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import useUserList from "./hooks/user-list.hook";
import PreloaderComponent from "./components/Preloader.component";
import useIsLoading from "./hooks/useIsLoading.hook";

const App = () => {
  const { isLoading } = useIsLoading();
  const { fetchAllUsers, userList } = useUserList();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <>
      {userList.length > 0 && (
        <>
          <header className="flex items-center space-x-2 border-b">
            <Link className="p-2" to="/">
              Home
            </Link>
            <Link className="p-2" to="/users">
              Users
            </Link>
            <Link className="p-2" to="/posts">
              Posts
            </Link>
            <Link className="p-2" to="/photos">
              Photos
            </Link>
          </header>
          <Outlet></Outlet>
        </>
      )}
      {isLoading && <PreloaderComponent></PreloaderComponent>}
    </>
  );
};

export default React.memo(App);
