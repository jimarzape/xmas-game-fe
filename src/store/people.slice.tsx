import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import { appError } from "./app.slice";

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    peopleList: [],
  },
  reducers: {
    peoples: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { peoples } = peopleSlice.actions;
export default peopleSlice.reducer;

/* ----------------------------------- API ---------------------------------- */
export const peopleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreatePeople: builder.mutation({
      query: (data) => ({
        url: "/people/create",
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
          dispatch(peoples({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    UpdatePeople: builder.mutation({
      query: ({ data, id }) => ({
        url: `/people/update/${id}`,
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
          dispatch(peoples({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    DeletePeople: builder.mutation({
      query: ({ data, id }) => ({
        url: `/people/delete/${id}`,
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
          dispatch(peoples({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    ListPeople: builder.mutation({
      query: (data) => ({
        url: `/people/list`,
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
          dispatch(peoples({ peopleList: data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
  }),
});

export const {
  useCreatePeopleMutation,
  useUpdatePeopleMutation,
  useDeletePeopleMutation,
  useListPeopleMutation,
} = peopleApiSlice;
