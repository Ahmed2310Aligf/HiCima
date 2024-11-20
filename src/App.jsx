
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

import Favorites from './pages/FavMovies/FavMovies';
import Search from './pages/searsh/srh';
import Home from './pages/home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails';
import store from './store/store.js';
import { Provider } from 'react-redux';
import Movies from './pages/Movies/movies.jsx';
import { langContext, LangProvider } from './context/lang.js';
const App = () => {

  const [lang, setLang] = useState("En");
  return (

    <Provider store={store}>
      <LangProvider value={{ lang, setLang }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies/:id" element={<MovieDetails />} /> {/* Dynamic route */}



          </Routes>
        </Router>
      </LangProvider>

    </Provider>
  );
};

export default App;
