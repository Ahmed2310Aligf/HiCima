
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { addFavorite, removeFavorite } from '../../store/slice/favoritesSlice';


// const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const apiKey = 'c34c48c6cee2aafec1b714acb3c3c992';
//   const dispatch = useDispatch();
//   const favorites = useSelector((state) => state.favorites.movies);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`);
//       setMovies(response.data.results);
//       setTotalPages(response.data.total_pages);
//     };

//     fetchMovies();
//   }, [currentPage]);

//   const toggleFavorite = (movie) => {
//     if (favorites.some(fav => fav.id === movie.id)) {
//       dispatch(removeFavorite(movie));
//     } else {
//       dispatch(addFavorite(movie));
//     }
//   };

//   return (
//     <Container>
//       <h1 className="my-4">Popular Movies</h1>
//       <Row>
//         {movies.map((movie) => (
//           <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//             <Card>
//               <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
//               <Card.Body>
//                 <Card.Title>{movie.title}</Card.Title>
//                 <Button variant="primary" as={Link} to={`/movies/${movie.id}`}>
//                   Details
//                 </Button>
//                 <Button
//                   variant="link"
//                   onClick={() => toggleFavorite(movie)}
//                   className="float-end"
//                 >
//                   {favorites.some(fav => fav.id === movie.id) ? (
//                     <FaHeart color="red" />
//                   ) : (
//                     <FaRegHeart color="gray" />
//                   )}
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <div className="d-flex justify-content-between align-items-center my-4">
//         <Button variant="secondary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//           Previous Page
//         </Button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <Button variant="secondary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next Page
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default Movies;











import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { fetchMovies } from '../../store/slice/moviesSlice';
import { addFavorite, removeFavorite } from '../../store/slice/favoritesSlice';

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const favorites = useSelector((state) => state.favorites.movies);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, currentPage, status]);

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchMovies(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchMovies(currentPage - 1));
    }
  };

  return (
    <Container>
      <h1 className="my-4">Popular Movies</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button variant="primary" as={Link} to={`/movies/${movie.id}`}>
                  Details
                </Button>
                <Button
                  variant="link"
                  onClick={() => toggleFavorite(movie)}
                  className="float-end"
                >
                  {favorites.some((fav) => fav.id === movie.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="gray" />
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-between align-items-center my-4">
        <Button
          variant="secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || status === 'loading'}
        >
          Previous Page
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || status === 'loading'}
        >
          Next Page
        </Button>
      </div>
    </Container>
  );
};

export default Movies;

