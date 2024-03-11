import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../slices/postsSlice";
import usersSlice from "../slices/usersSlice";
import commentSlice from "../slices/commentSlice";

import { persistStore, persistReducer } from "redux-persist";
import profileSlice from "../slices/profileSlice";
import storage from "redux-persist/lib/storage";
import authSlice from "../slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistUserProfile = persistReducer(persistConfig, profileSlice);
const persistAuthUser = persistReducer(persistConfig,authSlice )

export const store = configureStore({
  reducer: {
    auth: persistAuthUser,
    profile: persistUserProfile,
    users: usersSlice,
    posts: postsSlice,
    comments: commentSlice,
  },
  middleware : (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, 
    });
  },
});
export const persistor = persistStore(store);

console.log("Create Store >>>", store.getState());
store.subscribe(() => console.log("Change Store >>>", store.getState()));
