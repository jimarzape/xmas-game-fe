import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import appReducer from "./app.slice";
import authReducer from "./auth.slice";
import userReducer from "./users.slice";
import categoryReducer from "./category.slice";
import familyReducer from "./family.slice";
import peopleReducer from "./people.slice";
import gemeReducer from "./game.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    users: userReducer,
    category: categoryReducer,
    family: familyReducer,
    people: peopleReducer,
    games: gemeReducer,
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
