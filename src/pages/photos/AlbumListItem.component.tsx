import React, { useCallback } from "react";
import TAlbum from "../../models/photo/album.type";
import UpperCaseComponent from "../../components/UpperCase.component";
import { useNavigate } from "react-router";

const AlbumListItem = ({ album }: { album: TAlbum }) => {
  const navigate = useNavigate();
  const onClickAlbum = useCallback(() => {
    navigate(`/photos/album/${album.id}`);
  }, [navigate, album]);
  return (
    <div
      className="border rounded p-2 hover:shadow-md cursor-pointer transition-shadow text-center"
      onClick={onClickAlbum}
    >
      <UpperCaseComponent value={album.title} isTitleCase></UpperCaseComponent>
    </div>
  );
};

export default React.memo(AlbumListItem);
