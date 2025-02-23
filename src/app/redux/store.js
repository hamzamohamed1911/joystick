import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import cartReducer from './cartSlice';
import filterReducer from './filterSlice';
import authReducer from './authSlice';

const persistConfig = {
  key: 'cart',
  storage, // This will use localStorage
};

// Persisted reducer for cart slice
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,  // Use the persisted cart reducer
    filters: filterReducer,
    auth: authReducer,
    
  },
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
