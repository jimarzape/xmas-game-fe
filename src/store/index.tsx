import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import appReducer from "./app.slice";
import authReducer from "./auth.slice";
import userReducer from "./users.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    users: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //file upload issue need to set to false to ignore serialization
    }).concat(apiSlice.middleware),

  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
