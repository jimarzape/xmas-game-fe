import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import { appError } from "./app.slice";

export const familySlice = createSlice({
  name: "family",
  initialState: {
    familyList: [],
  },
  reducers: {
    families: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { families } = familySlice.actions;
export default familySlice.reducer;

/* ----------------------------------- API ---------------------------------- */
export const familyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateFamily: builder.mutation({
      query: (data) => ({
        url: "/family/create",
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
          dispatch(families({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    UpdateFamily: builder.mutation({
      query: ({ data, id }) => ({
        url: `/family/update/${id}`,
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
          dispatch(families({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    DeleteFamily: builder.mutation({
      query: ({ data, id }) => ({
        url: `/family/delete/${id}`,
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
          dispatch(families({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    ListFamily: builder.mutation({
      query: (data) => ({
        url: `/family/list`,
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
          dispatch(families({ familyList: data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
  }),
});

export const {
  useCreateFamilyMutation,
  useUpdateFamilyMutation,
  useDeleteFamilyMutation,
  useListFamilyMutation,
} = familyApiSlice;
