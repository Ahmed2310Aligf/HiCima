// src/store/slice/moviesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = 'c34c48c6cee2aafec1b714acb3c3c992';


export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (page = 1) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
    return response.data; 
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results; 
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
