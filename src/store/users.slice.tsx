import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import { appError } from "./app.slice";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: [],
    userList: {},
    currentUser: {},
    UserPage: {
      count: 0,
      currentPage: 1,
      lastPage: 1,
      nextPage: null,
      prevPage: null,
    },
    UserPgBtn: {
      page: 1,
      take: 50,
      query: "",
    },
  },
  reducers: {
    listUser: (state, { payload }) => ({ ...state, ...payload }),
    getUser: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { listUser, getUser } = userSlice.actions;
export default userSlice.reducer;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    UserList: builder.mutation({
      query: (data) => ({
        url: `/user/list`,
        method: "POST",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(listUser({ userList: { ...data.data, ...data.data } }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    CreateUser: builder.mutation({
      query: (data) => ({
        url: `/user/create`,
        method: "POST",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    UpdateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/user/${id}`,
        method: "POST",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: data,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUser({ userData: { ...data.data, ...data.data } }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
    ViewProfile: builder.mutation({
      query: ({ id }) => ({
        url: `/user/profile/${id}`,
        method: "GET",
        credentials: "include",
        withCredentials: true,
        crossorigin: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUser({ currentUser: { ...data.data, ...data.data } }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useUserListMutation,
  useViewProfileMutation,
} = userApiSlice;
