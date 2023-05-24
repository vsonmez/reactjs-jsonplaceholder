import React, { useEffect } from "react";
import useAlbumList from "../../hooks/album-list.hook";
import AlbumListItemComponent from "./AlbumListItem.component";
import SelectUserComponent from "../../components/SelectUser.component";
import useUser from "../../hooks/user.hook";
import { useParams } from "react-router";

const AlbumListPage = () => {
  const { userId } = useParams<"userId">();
  const { fetchAllAlbums, albumList, fetchAlbumsByUserId } = useAlbumList();
  const { setSelectedUser } = useUser();
  useEffect(() => {
    if (userId) {
      fetchAlbumsByUserId(Number(userId));
    } else {
      fetchAllAlbums();
      setSelectedUser(undefined);
    }
  }, [fetchAllAlbums, setSelectedUser, userId, fetchAlbumsByUserId]);
  return (
    <>
      <div className="text-center mt-3">
        <SelectUserComponent canNavigteSelectedUserAlbums></SelectUserComponent>
      </div>
      <div className="grid grid-cols-6 gap-3 p-3">
        {albumList.map((album) => (
          <AlbumListItemComponent
            key={album.id}
            album={album}
          ></AlbumListItemComponent>
        ))}
      </div>
    </>
  );
};

export default React.memo(AlbumListPage);
