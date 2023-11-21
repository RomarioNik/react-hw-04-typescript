import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/movieApi";
import { Loader } from "../../components/Loader";
import { Wrapper, Form, Input, Button, ListWrapper } from "./Search.styled";
import { UsernameFormElement } from "./Search.types";

enum Status {
  IDLE,
  PENDING,
  RESOLVED,
  REJECTED,
}

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(
    () => searchParams.get("query") ?? ""
  );
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async (text: string) => {
      try {
        setStatus(Status.PENDING);
        const movies = await searchMovies(text);
        if (movies.data.results.length === 0) {
          setStatus(Status.REJECTED);
          return;
        }
        setMovies(movies.data.results);
        setStatus(Status.RESOLVED);
      } catch (error) {
        console.log(error);
        setStatus(Status.REJECTED);
      }
    };

    if (searchText) {
      fetchMovies(searchText);
    }
  }, [searchText]);

  const handleSubmit = (e: React.FormEvent<UsernameFormElement>) => {
    e.preventDefault();
    setSearchText(e.currentTarget.elements.search.value);
  };

  const updateQueryString = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value.trim() !== "") {
      setSearchParams({ query: value.trim() });
    } else {
      setSearchParams({});
      setStatus(Status.IDLE);
      setSearchText("");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="search"
          value={searchParams.get("query") ?? ""}
          onChange={updateQueryString}
        />
        <Button type="submit">Search</Button>
      </Form>
      <ListWrapper>
        {status === Status.IDLE && <div></div>}

        {status === Status.PENDING && <Loader />}

        {status === Status.REJECTED && <div>We don't found any movie.</div>}

        {status === Status.RESOLVED && (
          <ul>
            {movies.map(({ id, title }) => (
              <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ListWrapper>
    </Wrapper>
  );
};
