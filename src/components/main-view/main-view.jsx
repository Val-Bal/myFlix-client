import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
      {
      id: 1,
      title: "Donnie Darko",
      description: "A troubled teenager named Donnie Darko is plagued by visions of a giant rabbit that manipulates him to commit a series of crimes. As Donnie tries to uncover the truth behind his visions, he realizes that his fate and the fate of those around him are far more complex than he ever imagined.",
      image:
      "https://upload.wikimedia.org/wikipedia/en/d/db/Donnie_Darko_poster.jpg",
      genre: "Drama, Mystery, Sci-Fi",
      director: "Richard Kelly"
      },
      {
      id: 2,
      title: "Pulp Fiction",
      description: "Pulp Fiction tells the intersecting stories of Los Angeles mobsters, small-time criminals, and a pair of hitmen. The film explores themes of violence, redemption, and the unexpected consequences of one's actions.",
      image:
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
      genre: "Crime, Drama",
      director: "Quentin Tarantino"
      },
      {
      id: 3,
      title: "Lost in Translation",
      description: "Lost in Translation is a film about a washed-up American actor who finds himself stranded in Tokyo after filming a whiskey commercial. He meets a young woman who is also lost in the city, and together they form an unlikely friendship as they try to navigate their way through their respective cultural differences and personal struggles.",
      image:
      "https://upload.wikimedia.org/wikipedia/en/4/4c/Lost_in_Translation_poster.jpg",
      genre: "Drama, Romance",
      director: "Sofia Coppola"
      },
      {
      id: 4,
      title: "City of God",
      description: "City of God is a gritty and intense Brazilian crime drama that follows the lives of various characters growing up in the violent favelas of Rio de Janeiro. The film explores themes of poverty, power, and the vicious cycle of violence that plagues the community.",
      image:
      "https://upload.wikimedia.org/wikipedia/en/1/10/CidadedeDeus.jpg",
      genre: "Crime, Drama",
      director: "Fernando Meirelles, Kátia Lund"
      },
      {
      id: 5,
      title: "Trainspotting",
      description: "Trainspotting is a gritty and darkly comic film that follows the lives of a group of heroin addicts living in Edinburgh, Scotland. The film explores themes of addiction, friendship, and the bleakness of urban life.",
      image:
      "https://upload.wikimedia.org/wikipedia/en/7/71/Trainspotting_ver2.jpg",
      genre: "Drama",
      director: "Danny Boyle"
      },
      {
      id: 6,
      title: "Isle of Dogs",
      description: "Isle of Dogs is a stop-motion animated film set in a dystopian future Japan, where all dogs have been banished to a trash island due to a canine flu epidemic. When a young boy sets out to find his lost dog, a group of exiled dogs join him on his journey and help him uncover a government conspiracy.",
      image:
      "https://upload.wikimedia.org/wikipedia/en/2/23/IsleOfDogsFirstLook.jpg",
      genre: "Adventure, Animation, Comedy",
      director: "Wes Anderson"
      }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};
