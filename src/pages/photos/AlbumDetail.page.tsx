import React, { useEffect } from "react";
import { useParams } from "react-router";
import usePhotoList from "../../hooks/photo-list.hook";
import PhotoListItemComponent from "./PhotoListItem.component";
import useAlbumList from "../../hooks/album-list.hook";
import UpperCaseComponent from "../../components/UpperCase.component";

const AlbumDetailPage = () => {
  const { albumId } = useParams<"albumId">();
  const { selectedAlbum, fetchAlbumById } = useAlbumList();
  const { fetchPhotosByAlbumId, photoList } = usePhotoList();
  useEffect(() => {
    fetchAlbumById(Number(albumId));
    fetchPhotosByAlbumId(Number(albumId));
  }, [albumId, fetchPhotosByAlbumId, fetchAlbumById]);
  return (
    <>
      <span className="block text-[18px] text-center mt-3">
        <UpperCaseComponent
          value={selectedAlbum?.title}
          isTitleCase
        ></UpperCaseComponent>
      </span>
      <div className="grid grid-cols-6 gap-3 p-3">
        {photoList.map((photo) => (
          <PhotoListItemComponent
            key={photo.id}
            photo={photo}
          ></PhotoListItemComponent>
        ))}
      </div>
    </>
  );
};

export default React.memo(AlbumDetailPage);
