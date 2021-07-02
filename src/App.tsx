import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import {useEffect, useState} from "react";
import {api} from "./services/api";
import {MovieProps} from "./props/MovieProps";
import {GenreResponseProps} from "./props/GenreResponseProps";

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [selectedGenreId, setSelectedGenreId] = useState<Number>(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        setGenres={setGenres}
        setSelectedGenreId={setSelectedGenreId} />
      <Content
        movies={movies}
        setMovies={setMovies}
        selectedGenreId={selectedGenreId}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  )
}
