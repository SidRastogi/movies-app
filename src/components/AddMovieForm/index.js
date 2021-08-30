import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import InputLabel from '../InputLabel';
import Input from '../Input';
import InputButton from '../InputButton';
import List from '../List';
import Tag from '../Tag';
import { addMovie } from '../../redux/Movies';

const AddMovieForm = (props) => {
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [movieName, setMovieName] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [nPleaceHolder, setNPleaceHolder] = useState('');
  const [gPleaceHolder, setGPleaceHolder] = useState('');

  const reset = () => {
    setMovieName('');
    setGenre('');
    setGenres([]);
  };

  const Submit = () => {
    if (movieName.toString() === '') {
      setNPleaceHolder('Enter Movie Name');
      return;
    }
    if (genres.length === 0) {
      setGPleaceHolder('Add Genres');
      return;
    }
    dispatch(
      addMovie({
        id: movies.length + 1,
        name: movieName,
        genres: genres,
        watched: false,
      })
    );
    reset();
    return;
  };

  const onChangeGenre = (e) => {
    if (e.target?.value && e.key === 'Enter') {
      if (
        genres.length > 0 &&
        genres.filter((x) => x === e.target.value).length > 0
      ) {
        setGenre('');
      } else {
        setGenres([...genres, e.target.value]);
        setGPleaceHolder('');
        setGenre('');
      }
    }
  };

  return (
    <div className='formBody'>
      <div className='container'>
        <div className='row'>
          <div className='label'>
            <InputLabel>Enter Name :</InputLabel>
          </div>
          <div className='input'>
            <Input
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              placeholder={nPleaceHolder}
            />
          </div>
        </div>
        <div className='row'>
          <div className='listComponet'>
            <List
              data={genres}
              itemRender={(item, index) => {
                return <Tag title={item} key={index} />;
              }}
            />
          </div>
        </div>
        <div className='row'>
          <div className='label'>
            <InputLabel>Movie Genres :</InputLabel>
          </div>
          <div className='input'>
            <Input
              value={genre}
              placeholder={gPleaceHolder}
              onChange={(e) => setGenre(e.target.value)}
              onKeyDown={onChangeGenre}
            />
          </div>
        </div>
        <div className='row'>
          <InputButton onClick={Submit}>Submit</InputButton>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
