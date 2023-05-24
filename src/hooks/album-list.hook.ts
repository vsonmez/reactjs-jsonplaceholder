import { useCallback } from "react";
import PhotoStore from "../store/photo.store";
import ApplicationStore from "../store/store";
import useIsLoading from "./useIsLoading.hook";

const useAlbumList = () => {
  const { setIsLoading } = useIsLoading();
  const dispatch = ApplicationStore.useAppDispatch();
  const albumList = ApplicationStore.useAppSelector(
    PhotoStore.select.albumList
  );
  const selectedAlbum = ApplicationStore.useAppSelector(
    PhotoStore.select.selectedAlbum
  );

  const fetchAllAlbums = useCallback(() => {
    setIsLoading(true);
    dispatch(PhotoStore.asyncThunks.fetchAllAlbums()).finally(() => {
      setIsLoading(false);
    });
  }, [setIsLoading, dispatch]);

  const fetchAlbumsByUserId = useCallback(
    (userId: number) => {
      setIsLoading(true);
      dispatch(PhotoStore.asyncThunks.fetchAlbumsByUserId(userId)).finally(
        () => {
          setIsLoading(false);
        }
      );
    },
    [setIsLoading, dispatch]
  );

  const fetchAlbumById = useCallback(
    (albumId: number) => {
      setIsLoading(true);
      dispatch(PhotoStore.asyncThunks.fetchAlbumById(albumId)).finally(() => {
        setIsLoading(false);
      });
    },
    [dispatch, setIsLoading]
  );

  const setSelectedAlbum = useCallback(
    (albumId: number) => {
      dispatch(PhotoStore.actions.setSelectedAlbum(albumId));
    },
    [dispatch]
  );

  return {
    selectedAlbum,
    albumList,
    fetchAllAlbums,
    fetchAlbumsByUserId,
    fetchAlbumById,
    setSelectedAlbum,
  };
};

export default useAlbumList;
