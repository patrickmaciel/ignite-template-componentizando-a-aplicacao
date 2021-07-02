import {Button} from "./Button";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import '../styles/sidebar.scss';
import {GenreResponseProps} from "../props/GenreResponseProps";
import {api} from "../services/api";

interface SideBarProps {
  genres: GenreResponseProps[],
  selectedGenreId: Number,
  setSelectedGenreId: Dispatch<SetStateAction<Number>>,
  setGenres: Dispatch<SetStateAction<GenreResponseProps[]>>,
}
export function SideBar({
  genres,
  selectedGenreId,
  setGenres,
  setSelectedGenreId
}: SideBarProps) {
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  useEffect(() => {
    console.log('useEffect Content')
    api.get<GenreResponseProps[]>('genres').then(response => {
      console.log(response.data)
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}
