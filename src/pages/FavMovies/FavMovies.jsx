
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { FaHeart } from 'react-icons/fa';
// import { removeFavorite } from '../../store/slice/favoritesSlice';

// const Favorites = () => {
//   const favorites = useSelector((state) => state.favorites.movies);
//   const dispatch = useDispatch();

//   return (
//     <Container>
//       <h1 className="my-4">My Favorites</h1>
//       {favorites.length === 0 ? (
//         <p>You have no favorite movies.</p>
//       ) : (
//         <Row>
//           {favorites.map((movie) => (
//             <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//               <Card>
//                 <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
//                 <Card.Body>
//                   <Card.Title>{movie.title}</Card.Title>
//                   <Button
//                     variant="link"
//                     onClick={() => dispatch(removeFavorite(movie))}
//                     className="float-end"
//                   > Remove the Movie
//                     <FaHeart color="red" />
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default Favorites;



// src/pages/Favorites.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { removeFavorite } from '../../store/slice/favoritesSlice';


const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.movies);
  const dispatch = useDispatch();

  const handleRemove = (movie) => {
    dispatch(removeFavorite(movie));
  };

  return (
    <Container>
      <h1 className="my-4">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite movies.</p>
      ) : (
        <Row>
          {favorites.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(movie)} // Handle remove action
                    className="mt-2"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;
