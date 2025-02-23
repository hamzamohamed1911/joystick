
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalItems: 0, favorites: {} },
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedColor, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.id === id && item.selectedColor === selectedColor
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
      state.totalItems += 1;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
        state.totalItems -= 1;
      }
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = Math.max(action.payload.quantity, 1);
      }
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      
      if (state.favorites[productId]) {
        delete state.favorites[productId];
      } else {
        state.favorites[productId] = true;
      }
    },
    clearPurchasedItems: (state, action) => {
      const purchasedItems = action.payload;
      state.items = state.items.filter(
        (item) => !purchasedItems.some(
          (purchasedItem) => purchasedItem.id === item.id && purchasedItem.selectedColor === item.selectedColor
        )
      );
      state.totalItems = state.items.length;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
    
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleFavorite, clearPurchasedItems,clearCart } = cartSlice.actions;
export default cartSlice.reducer;