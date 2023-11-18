import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../Loader";
import {
  Wrapper,
  Container,
  Header,
  List,
  NavLinkStyled,
  Main,
  Footer,
  ContentFooterWrapper,
  Copyright,
} from "./Layout.styled";

export const Layout: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <Container>
          <nav>
            <List>
              <li>
                <NavLinkStyled to="/">Home</NavLinkStyled>
              </li>
              <li>
                <NavLinkStyled to="/movies">Movie</NavLinkStyled>
              </li>
            </List>
          </nav>
        </Container>
      </Header>

      <Main>
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </Main>

      <Footer>
        <Container>
          <ContentFooterWrapper>
            <Copyright>&copy; Movie</Copyright>
          </ContentFooterWrapper>
        </Container>
      </Footer>
    </Wrapper>
  );
};
