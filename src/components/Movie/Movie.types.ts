interface IGenres {
  id: number;
  name: string;
}

export interface IMovie {
  poster_path: string;
  title: string;
  overview: string;
  genres: IGenres[];
  popularity: number;
}

export interface IMovieProps {
  children: React.ReactElement;
}
