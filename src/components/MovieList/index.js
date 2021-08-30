import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Tag from '../Tag';
import './index.css';
import CheckBox from '../CheckBox';
import RadioBox from '../RadioBox';
import Button from '../InputButton';
import Input from '../Input';
import Loader from '../Loader';
import { editWatched, deleteMovie, movieFilter } from '../../redux/Movies';

const MovieList = (props) => {
  const dispatch = useDispatch();
  let { genre } = useParams();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(genre ? genre : '');
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editMovieName, setEditMovieName] = useState('');

  const { movies, filterData } = useSelector((state) => state.movies);

  let movieList = [
    movies.filter((movie) => movie.watched === false),
    movies.filter((movie) => movie.watched === true),
  ];

  if (search !== '' || filter !== '') {
    movieList = [
      filterData.filter((movie) => movie.watched === false),
      filterData.filter((movie) => movie.watched === true),
    ];
  }

  const searchHandel = (e) => {
    setSearch(e.target.value);
    dispatch(movieFilter({ search: e.target.value, filter }));
  };

  const filterHandel = (value) => {
    setFilter(value);
    dispatch(movieFilter({ search, filter: value }));
  };

  const FilterRefersh = () => {
    dispatch(movieFilter({ search, filter }));
  };

  useEffect(() => {
    FilterRefersh();
  }, [movies, genre]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [movies, filterData]);

  return (
    <div className='movie-List-Body'>
      <div className='movies-search-container'>
        <div className='movies-search'>
          <Input
            value={search}
            placeholder='Search'
            className='searchInput'
            onChange={searchHandel}
          />
        </div>
      </div>
      <div className='movies-filter-container'>
        <div className='movies-filter'>
          <RadioBox
            value={filter === 'Horror' ? true : false}
            onChange={() => filterHandel('Horror')}
          />
          <span>Horror</span>
        </div>
        <div className='movies-filter'>
          <RadioBox
            value={filter === 'Romance' ? true : false}
            onChange={() => filterHandel('Romance')}
          />
          <span>Romance</span>
        </div>
        <div className='movies-filter'>
          <RadioBox
            value={filter === 'Comedy' ? true : false}
            onChange={() => filterHandel('Comedy')}
          />
          <span>Comedy</span>
        </div>
        <div className='movies-filter'>
          <Button className='ResetButton' onClick={() => filterHandel('')}>
            Reset
          </Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Genres</th>
            <th>Watched</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
      {loading ? (
        <Loader />
      ) : (
        <table>
          <tbody>
            {movieList.map((movies) =>
              movies.map((movie, index) => (
                <tr key={`${index}movies`}>
                  {edit && edit === movie.id ? (
                    <Input
                      value={editMovieName}
                      placeholder='Enter Name'
                      className='editInput'
                      onChange={(e) => setEditMovieName(e.target.value)}
                    />
                  ) : (
                    <td>{movie.name}</td>
                  )}

                  <td>
                    {movie.genres.map((genre, index) => (
                      <Tag title={genre} key={`${index}genres`} />
                    ))}
                  </td>
                  <td>
                    <CheckBox
                      value={movie.watched}
                      onChange={(checked) =>
                        dispatch(editWatched({ ...movie, watched: checked }))
                      }
                    />
                  </td>
                  <td>
                    <Button
                      className='editButton'
                      onClick={() => {
                        if (!edit) {
                          setEditMovieName(movie.name);
                          setEdit(movie.id);
                        }
                        if (edit && edit === movie.id && editMovieName !== '') {
                          dispatch(
                            editWatched({ ...movie, name: editMovieName })
                          );
                          setEdit(false);
                          setEditMovieName('');
                        }
                      }}>
                      {edit && edit === movie.id ? `Save` : 'Edit'}
                    </Button>
                    <Button
                      className='deleteButton'
                      onClick={() => dispatch(deleteMovie(movie))}>
                      X
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      )}
    </div>
  );
};

export default MovieList;
