import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, thunkAPI) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
