import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import { appError } from "./app.slice";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loginAuth: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { loginAuth } = authSlice.actions;
export default authSlice.reducer;

/* ----------------------------------- API ---------------------------------- */
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    LoginAuth: builder.mutation({
      query: (data) => ({
        url: "/user/auth/login",
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
          dispatch(loginAuth({ ...data.data }));
          localStorage.setItem("auth", JSON.stringify({ ...data.data }));
        } catch (error) {
          dispatch(appError(error));
        }
      },
    }),
  }),
});

export const { useLoginAuthMutation } = authApiSlice;
