import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";

const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({
    ...module,
    default: module.HomePage,
  }))
);

const MoviesPage = lazy(() =>
  import("../pages/MoviesPage").then((module) => ({
    ...module,
    default: module.MoviesPage,
  }))
);

const MovieDetailesPage = lazy(() =>
  import("../pages/MovieDetailesPage").then((module) => ({
    ...module,
    default: module.MovieDetailesPage,
  }))
);

const Cast = lazy(() =>
  import("./Cast").then((module) => ({
    ...module,
    default: module.Cast,
  }))
);

const Reviews = lazy(() =>
  import("./Reviews").then((module) => ({
    ...module,
    default: module.Reviews,
  }))
);

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MovieDetailesPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
};
