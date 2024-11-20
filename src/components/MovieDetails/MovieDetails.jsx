// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';

const MovieDetails = () => {
  const { id } = useParams(); // Extract movie ID from route parameters
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [loading, setLoading] = useState(true); // State for loading status
  const apiKey = 'c34c48c6cee2aafec1b714acb3c3c992';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(response.data); // Store movie details in state
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false); // Update loading status
      }
    };

    fetchMovieDetails();
  }, [id]); // Dependency array includes id to refetch if the movie ID changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (!movie) {
    return <div>Movie details not available.</div>; // Show error message if no movie data
  }

  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
          <Button variant="primary" href="/movies">Back to Movies</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieDetails;
