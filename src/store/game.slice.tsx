import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import { appError } from "./app.slice";

export const gameSlice = createSlice({
  name: "games",
  initialState: {
    gamelist: [],
    gameData: null,
  },
  reducers: {
    setGames: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setGames } = gameSlice.actions;
export default gameSlice.reducer;

/* ----------------------------------- API ---------------------------------- */
export const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    UploadFile: builder.mutation({
      query: (data) => ({
        url: "/game/upload",
        method: "POST",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    CrateGame: builder.mutation({
      query: (data) => ({
        url: `/game/create`,
        method: "POST",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setGames({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    UpdateGame: builder.mutation({
      query: ({ data, id }) => ({
        url: `/game/update/${id}`,
        method: "PUT",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setGames({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    ListGame: builder.mutation({
      query: (data) => ({
        url: `/game/list`,
        method: "POST",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setGames({ gamelist: data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    DelGame: builder.mutation({
      query: ({ data, id }) => ({
        url: `/game/delete/${id}`,
        method: "DELETE",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    ViewGame: builder.mutation({
      query: ({ data, id }) => ({
        url: `/game/view/${id}`,
        method: "GET",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setGames({ gameData: data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
  }),
});

export const {
  useUploadFileMutation,
  useCrateGameMutation,
  useListGameMutation,
  useDelGameMutation,
  useUpdateGameMutation,
  useViewGameMutation,
} = gameApiSlice;
