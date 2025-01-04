// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartReducer from "./features/cart/cartSlice";
import orderTrackingReducer from "./features/cart/orderTrackingSlice";
import userReducer from "./features/userauthSlice";  // Import user slice

// Persist configuration for `user` slice
const userPersistConfig = {
  key: 'user',  // Key used to save to storage
  storage: AsyncStorage,  // Storage medium
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Persist configuration for `orderTracker`
const orderTrackerPersistConfig = {
  key: 'orderTracker',
  storage: AsyncStorage,
};

const persistedOrderTrackerReducer = persistReducer(orderTrackerPersistConfig, orderTrackingReducer);

// Create the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orderTracker: persistedOrderTrackerReducer,
    user: persistedUserReducer,  // Add the persisted user slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
