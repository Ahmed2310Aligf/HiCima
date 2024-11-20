


import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import favoritesReducer from './slice/favoritesSlice';
import moviesReducer from './slice/moviesSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
