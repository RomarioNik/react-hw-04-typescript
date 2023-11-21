import { useRef, useEffect, useState, Suspense } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { getMovie } from "../../services/movieApi";
import {
  Wrapper,
  LinkWrapper,
  LinkGoBack,
  IconArrow,
  AboutWrapper,
  Description,
  DescriptionItem,
  GenreList,
  Thumb,
  Image,
  AddInfo,
  ExtraInfoWrapper,
  ExtraInfoList,
  ContentWrapper,
  ExtraInfoListItem,
  LinkStyled,
} from "./Movie.styled";
import defaultImage from "../../assets/default-poster.jpg";
// types
import { IMovieProps, IMovie } from "./Movie.types";

const ObjMovie: IMovie = {
  poster_path: "",
  title: "",
  overview: "",
  genres: [],
  popularity: 0,
};

export const Movie: React.FC<IMovieProps> = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IMovie>(ObjMovie);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const location = useLocation();
  const backLocationRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fatchMovie = async (id: string) => {
      try {
        const movie = await getMovie(id);
        setIsLoading(true);
        setMovie(movie.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (typeof movieId === "string") {
      fatchMovie(movieId);
    }
  }, [movieId]);

  const setActiveIdx = (index: number) => {
    if (activeTab === index) {
      return;
    }
    setActiveTab(index);
  };

  if (!isLoading) {
    return <Loader />;
  }

  if (isLoading) {
    const { poster_path, title, overview, genres, popularity } = movie;

    return (
      <Wrapper>
        <LinkWrapper>
          <LinkGoBack to={backLocationRef.current}>
            <IconArrow /> Go back
          </LinkGoBack>
        </LinkWrapper>
        <AboutWrapper>
          <Thumb>
            {!poster_path ? (
              <Image src={defaultImage} width="400" />
            ) : (
              <Image
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                width="400"
              />
            )}
          </Thumb>
          <Description>
            <DescriptionItem>
              <h1>{title}</h1>
              <p>User score: {popularity.toFixed()}</p>
            </DescriptionItem>
            <DescriptionItem>
              <h2>Overiew</h2>
              <p>{overview}</p>
            </DescriptionItem>
            <DescriptionItem>
              <h2>Genres</h2>
              <GenreList>
                {genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </GenreList>
            </DescriptionItem>
          </Description>
        </AboutWrapper>

        <AddInfo>Additional information</AddInfo>
        <ExtraInfoWrapper>
          <ExtraInfoList>
            <ExtraInfoListItem $show={activeTab === 1 ? "#F8F9F9" : "#F9FAFF"}>
              <LinkStyled
                to={`/movies/${movieId}/cast`}
                onClick={() => setActiveIdx(1)}
                $show={activeTab === 1 ? "orange" : "blue"}
                preventScrollReset
              >
                Cast
              </LinkStyled>
            </ExtraInfoListItem>
            <ExtraInfoListItem $show={activeTab === 2 ? "#F8F9F9" : "#F9FAFF"}>
              <LinkStyled
                to={`/movies/${movieId}/reviews`}
                onClick={() => setActiveIdx(2)}
                $show={activeTab === 2 ? "orange" : "blue"}
                preventScrollReset
              >
                Rewiews
              </LinkStyled>
            </ExtraInfoListItem>
          </ExtraInfoList>

          <ContentWrapper>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </ContentWrapper>
        </ExtraInfoWrapper>
      </Wrapper>
    );
  }
};
