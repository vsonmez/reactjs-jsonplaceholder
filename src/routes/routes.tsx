import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import PostListByUserPage from "../pages/post/PostListByUser.page";

const App = lazy(() => import("../App"));
const UserListPage = lazy(() => import("../pages/user/UserList.page"));
const UserDetailPage = lazy(() => import("../pages/user/UserDetail.page"));
const PostListPage = lazy(() => import("../pages/post/PotsList.page"));
const AlbumListPage = lazy(() => import("../pages/photos/AlbumList.page"));
const AlbumDetailPage = lazy(() => import("../pages/photos/AlbumDetail.page"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <App></App>
      </Suspense>
    ),
    children: [
      {
        path: "/users",
        element: (
          <Suspense>
            <UserListPage></UserListPage>
          </Suspense>
        ),
        children: [
          {
            path: "/users/:userId",
            element: (
              <Suspense>
                <UserDetailPage></UserDetailPage>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/posts",
        element: (
          <Suspense>
            <PostListPage></PostListPage>
          </Suspense>
        ),
      },
      {
        path: "/posts/user/:userId",
        element: (
          <Suspense>
            <PostListByUserPage></PostListByUserPage>
          </Suspense>
        ),
      },
      {
        path: "/photos",
        element: (
          <Suspense>
            <AlbumListPage></AlbumListPage>
          </Suspense>
        ),
      },
      {
        path: "/photos/user/:userId",
        element: (
          <Suspense>
            <AlbumListPage></AlbumListPage>
          </Suspense>
        ),
      },
      {
        path: "/photos/album/:albumId",
        element: (
          <Suspense>
            <AlbumDetailPage></AlbumDetailPage>
          </Suspense>
        ),
      },
    ],
  },
]);
export default router;
