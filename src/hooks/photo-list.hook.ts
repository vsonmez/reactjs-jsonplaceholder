import { useCallback } from "react";
import PhotoStore from "../store/photo.store";
import ApplicationStore from "../store/store";
import useIsLoading from "./useIsLoading.hook";

const usePhotoList = () => {
  const { setIsLoading } = useIsLoading();
  const dispatch = ApplicationStore.useAppDispatch();
  const photoList = ApplicationStore.useAppSelector(
    PhotoStore.select.photoList
  );
  const fetchAllPhotos = useCallback(() => {
    setIsLoading(true);
    dispatch(PhotoStore.asyncThunks.fetchAllPhotos()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const fetchPhotosByAlbumId = useCallback((albumId: number) => {
    setIsLoading(true);
    dispatch(PhotoStore.asyncThunks.fetchPhotosByAlbumId(albumId)).finally(
      () => {
        setIsLoading(false);
      }
    );
  }, []);
  return {
    photoList,
    fetchAllPhotos,
    fetchPhotosByAlbumId,
  };
};

export default usePhotoList;
