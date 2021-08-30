import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface moviesState {
  movies: Array;
  filterData: Array;
}

const initialState: moviesState = {
  movies: [],
  filterData: [],
};

export const Movies = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<number>) => {
      state.movies.push(action.payload);
    },
    editWatched: (state, action: PayloadAction<Object>) => {
      state.movies = state.movies.map((movie) =>
        movie.id === action.payload.id ? action.payload : { ...movie }
      );
    },
    deleteMovie: (state, action: PayloadAction<Object>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    movieFilter: (state, action: PayloadAction<Object>) => {
      const { search, filter } = action.payload;
      state.filterData = [];
      if (search !== '') {
        state.movies.filter((movie) => {
          if (movie.name.toString().toLowerCase().match(search)) {
            state.filterData.push(movie);
          }
          return [];
        });
      }
      if (filter !== '') {
        if (search !== '') {
          state.filterData = state.filterData.filter((movie) =>
            movie.genres
              .map((genre) => genre.toString().toLowerCase())
              .includes(filter.toString().toLowerCase())
          );
        } else {
          state.filterData = state.movies.filter((movie) =>
            movie.genres
              .map((genre) => genre.toString().toLowerCase())
              .includes(filter.toString().toLowerCase())
          );
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMovie, editWatched, deleteMovie, movieFilter } =
  Movies.actions;

export default Movies.reducer;
