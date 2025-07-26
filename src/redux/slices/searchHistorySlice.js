import { createSlice } from "@reduxjs/toolkit";

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: {
    history: [],
  },
  reducers: {
    addSearch: (state, action) => {
      const city = action.payload.trim();
      if (!city) return;

      const lowerCity = city.toLowerCase();
      const filtered = state.history.filter(
        (item) => item.toLowerCase() !== lowerCity
      );

      state.history = [city, ...filtered].slice(0, 5);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addSearch, clearHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
