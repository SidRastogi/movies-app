import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import AddMovieForm from '../../components/AddMovieForm';
import MovieList from '../../components/MovieList';

const Movies = (props) => {
  const { width, height } = window.screen;
  let { genre } = useParams();
  return (
    <div className='movies' style={{ minHeight: height, minWidth: width - 50 }}>
      {genre ? (
        <MovieList />
      ) : (
        <>
          <AddMovieForm />
          <MovieList />
        </>
      )}
    </div>
  );
};

export default Movies;
