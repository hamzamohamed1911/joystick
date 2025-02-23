import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category_id: null,
  brand_id: null,
  price_from: null,
  price_to: null,
  tags: null,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      // Explicitly handle null values
      Object.keys(action.payload).forEach((key) => {
        if (action.payload[key] === null || action.payload[key] === '') {
          state[key] = null;
        } else {
          state[key] = action.payload[key];
        }
      });
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;