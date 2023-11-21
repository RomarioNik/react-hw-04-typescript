import { Outlet } from "react-router-dom";
import { Movie } from "../../components/Movie";

export const MovieDetailesPage: React.FC = () => {
  return (
    <Movie>
      <Outlet />
    </Movie>
  );
};
