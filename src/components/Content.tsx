import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {MovieProps} from "../props/MovieProps";
import {GenreResponseProps} from "../props/GenreResponseProps";
import {api} from "../services/api";
import '../styles/content.scss';
import {MovieCard} from "./MovieCard";

interface ContentProps {
  movies: MovieProps[],
  setMovies: Dispatch<SetStateAction<MovieProps[]>>,
  selectedGenreId: Number,
  selectedGenre: GenreResponseProps,
  setSelectedGenre: Dispatch<SetStateAction<GenreResponseProps>>,
}

export function Content({
  movies,
  setMovies,
  selectedGenreId,
  selectedGenre,
  setSelectedGenre
}: ContentProps) {
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}
