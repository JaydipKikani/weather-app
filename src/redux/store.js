import { configureStore, combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import searchHistoryReducer from "./slices/searchHistorySlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const searchHistoryPersistConfig = {
  key: "searchHistory",
  storage,
};

const persistedSearchHistoryReducer = persistReducer(
  searchHistoryPersistConfig,
  searchHistoryReducer
);

const rootReducer = combineReducers({
  weather: weatherReducer,
  searchHistory: persistedSearchHistoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
