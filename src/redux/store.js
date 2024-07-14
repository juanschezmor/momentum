// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./authSlice";
import groupsReducer from "./groupsSlice";

// Configuración de Redux Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "groups"],
  blacklist: ["auth/registerUser"],
};

// Combinación de reducers
const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupsReducer,
});

// Reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
