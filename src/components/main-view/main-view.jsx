import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Col, Button, Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://indieflix.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);
  
  return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={() => {setUser(null); setToken(null); localStorage.clear(); }} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);}} />
                  </Col>
                )}
              </>
            }
          />
        <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies to show</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
        <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies to show</Col>
                ) : (
                  movies.map((movie) => (
                    <Col className="mb-4" key={movie._id} md={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView user={user} movies={movies} token={token} />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

  // if (!token) {
  //   return (
  //     <>
  //       <LoginView onLoggedIn={(user, token) => {
  //         setUser(user);
  //         setToken(token);
  //       }} />
  //       or
  //       <SignupView />
  //     </>
  //   );
  // }

//   if (movies.length === 0) {
//     return <div>The list is empty!</div>;
//   } else {
//     return (
//       <div>
//         <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//         <Row>
//           {movies.map((movie) => (
//             <Col className="mb-5" key={movie._id} md={3}>
//               <MovieCard
//                 key={movie._id}
//                 movie={movie}
//                 onMovieClick={(newSelectedMovie) => {
//                   setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             </Col>
//           ))}
//         </Row>
//       </div>
      
//     );
//   }
// };
