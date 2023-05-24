import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TAlbum from "../models/photo/album.type";
import TPhoto from "../models/photo/photo.type";
import Http from "../http/http";
import { makeImmutable } from "../herlpers/make-immutable.helper";
import ApplicationStore from "./store";

namespace PhotoStore {
  export const asyncThunks = {
    fetchAllAlbums: createAsyncThunk("photos/fetchAllAlbums", async () => {
      const response = await Http.axios.get<TAlbum[]>(
        "https://jsonplaceholder.typicode.com/albums"
      );
      return response.data;
    }),
    fetchAlbumsByUserId: createAsyncThunk(
      "photos/fetchAlbumsByUserId",
      async (userId: Number) => {
        const response = await Http.axios.get<TAlbum[]>(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        return response.data;
      }
    ),
    fetchAlbumById: createAsyncThunk(
      "photos/fetchAlbumById",
      async (id: Number) => {
        const response = await Http.axios.get<TAlbum[]>(
          `https://jsonplaceholder.typicode.com/albums?id=${id}`
        );
        return response.data;
      }
    ),
    fetchAllPhotos: createAsyncThunk("photos/fetchAllPhotos", async () => {
      const response = await Http.axios.get<TPhoto[]>(
        "https://jsonplaceholder.typicode.com/photos"
      );
      return response.data;
    }),
    fetchPhotosByAlbumId: createAsyncThunk(
      "photos/fetchPhotosByAlbumId",
      async (albumId: number) => {
        const response = await Http.axios.get<TPhoto[]>(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        );
        return response.data;
      }
    ),
  };

  type PhotoState = {
    selectedAlbum: TAlbum;
    albumList: TAlbum[];
    photoList: TPhoto[];
  };
  const initialState: PhotoState = {
    selectedAlbum: undefined,
    albumList: [],
    photoList: [],
  };
  const photoSlice = createSlice({
    initialState,
    name: "photo",
    reducers: {
      setSelectedAlbum: (state, action: PayloadAction<number>) => {
        const albumId = action.payload;
        const albumList = makeImmutable(state.albumList);
        const selectedAlbum = albumList.find((album) => album.id === albumId);
        return {
          ...state,
          selectedAlbum,
        };
      },
    },
    extraReducers: (builder) => {
      builder.addCase(
        asyncThunks.fetchAllAlbums.fulfilled,
        (state, action: PayloadAction<TAlbum[]>) => {
          const albumList = makeImmutable(action.payload);
          return {
            ...state,
            albumList,
          };
        }
      );
      builder.addCase(
        asyncThunks.fetchAlbumsByUserId.fulfilled,
        (state, action: PayloadAction<TAlbum[]>) => {
          const albumList = makeImmutable(action.payload);
          return {
            ...state,
            albumList,
          };
        }
      );
      builder.addCase(
        asyncThunks.fetchAlbumById.fulfilled,
        (state, action: PayloadAction<TAlbum[]>) => {
          const selectedAlbum = makeImmutable(action.payload[0]);
          return {
            ...state,
            selectedAlbum,
          };
        }
      );
      builder.addCase(
        asyncThunks.fetchAllPhotos.fulfilled,
        (state, action: PayloadAction<TPhoto[]>) => {
          const photoList = makeImmutable(action.payload);
          return {
            ...state,
            photoList,
          };
        }
      );
      builder.addCase(
        asyncThunks.fetchPhotosByAlbumId.fulfilled,
        (state, action: PayloadAction<TPhoto[]>) => {
          const photoList = makeImmutable(action.payload);
          return {
            ...state,
            photoList,
          };
        }
      );
    },
  });
  export const actions = photoSlice.actions;
  export const reducer = photoSlice.reducer;
  export const select = {
    albumList: (state: ApplicationStore.RootState) => state.photo.albumList,
    photoList: (state: ApplicationStore.RootState) => state.photo.photoList,
    selectedAlbum: (state: ApplicationStore.RootState) =>
      state.photo.selectedAlbum,
  };
}

export default PhotoStore;
