import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import { appError } from "./app.slice";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categorylist: [],
  },
  reducers: {
    categories: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { categories } = categorySlice.actions;
export default categorySlice.reducer;

/* ----------------------------------- API ---------------------------------- */
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create",
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
          dispatch(categories({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    UpdateCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/category/update/${id}`,
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
          dispatch(categories({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    DeleteCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/category/delete/${id}`,
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
          dispatch(categories({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    ListCategory: builder.mutation({
      query: (data) => ({
        url: `/category/list`,
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
          dispatch(categories({ categorylist: data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useListCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApiSlice;
