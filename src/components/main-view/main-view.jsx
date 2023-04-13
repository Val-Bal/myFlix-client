import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Button, Container, Row } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

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
  
  if (selectedMovie) {
    return (
      <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView
          style={{ border: "1px solid green" }}
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} 
        />
      </Col>
    );
  }

  if (!token) {
    return (
      <Row>
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
          </Col>
        </Row>
    );
  }

  if (!token) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <Row>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

};
