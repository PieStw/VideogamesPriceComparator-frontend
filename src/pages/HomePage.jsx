import React from "react";
import styles from "../assets/css/homePage.module.css";
import { useGamesContext } from "../context/GamesContext";
import Card from "../components/cards/GameCard";
import GenreCard from "../components/cards/GenreCard";
import { useNavigate } from "react-router-dom";

import bg from "../assets/img/bg.jpg";
import bgIcon from "../assets/img/bg-icon.jpg";
import Jumbo from "../components/jumbo/jumbo";

export default function HomePage() {
  const { tranding, genres, setFilters, getGames } = useGamesContext();

  if (tranding.length === 0) {
    return <div>Caricamento in corso...</div>;
  }

  const navigate = useNavigate();

  function goToSearchPage() {
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  }

  const desiredGenres = [
    { id: 4, name: "Action" },
    { id: 3, name: "Adventure" },
    { id: 11, name: "Arcade" },
    { id: 2, name: "Shooter" },
    { id: 6, name: "Fighting" },
    { id: 5, name: "RPG" },
    { id: 51, name: "Indie" },
    { id: 10, name: "Strategy" },
    { id: 15, name: "Sports" },
  ];

  const filteredGenres = genres.filter((genre) =>
    desiredGenres.map((g) => g.name).includes(genre.name)
  );

  const handleGenreClick = (genre) => {
    const matched = desiredGenres.find((g) => g.name === genre.name);
    if (!matched) return;

    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: matched.id,
    }));

    goToSearchPage();
    getGames(1, { genre: matched.id });
  };

  return (
    <>
      <main className={styles.main}>
        <Jumbo game={tranding[4]} info={true} />

        <div className={styles.container}>
          <h2 className={styles.title}>Trending</h2>
          <div className={styles.cardContainer}>
            <div className="row">
              {tranding
                .filter((_, index) => index !== 4 && index < 10)
                .map((game) => (
                  <div key={game.id} className="col-12 col-md-4">
                    <Card game={game} />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Jumbo game={tranding[13]} info={true} />

        <div className={styles.container}>
          <h2 className={styles.title}>Popular Genres</h2>
          <div className={styles.cardContainer}>
            <div className="row">
              {filteredGenres.map((genre) => (
                <div
                  key={genre.id}
                  className="col-12 col-md-6 col-xl-4 mb-4"
                  onClick={() => handleGenreClick(genre)}
                >
                  <GenreCard genre={genre} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={styles.bannerContainer}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container py-5">
            <div className="row justify-content-center align-items-center text-center">
              <div className="col-12 col-md-3 d-flex justify-content-center">
                <img
                  src={bgIcon}
                  alt="Background Icon"
                  className={styles.bgIcon}
                />
              </div>
              <div className="col-12 col-md-6">
                <h1>Discover Your Next Adventure</h1>
              </div>
              <div className="col-12 mt-4">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {tranding
                    .filter(
                      (_, index) => index > 9 && index < 15 && index !== 13
                    )
                    .map((game) => (
                      <div key={game.id} className="col">
                        <Card game={game} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
