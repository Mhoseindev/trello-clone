import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import boardsReducer from "./boardsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["boards"],
};

const persistedBoardsReducer = persistReducer<ReturnType<typeof boardsReducer>>(
  persistConfig,
  boardsReducer,
);

export const store = configureStore({
  reducer: {
    boards: persistedBoardsReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types from redux-persist
      ignoredActions: [
        "persist/PERSIST",
        "persist/REHYDRATE",
        "persist/PAUSE",
        "persist/FLUSH",
        "persist/PURGE",
        "persist/REGISTER",
      ],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
