import React from "react";
import styles from "../assets/css/homePage.module.css";
import { useGamesContext } from "../context/GamesContext";
import Card from "../components/cards/GameCard";
import GenreCard from "../components/cards/GenreCard";
import bg from "../assets/img/bg.jpg";
import bgIcon from "../assets/img/bg-icon.jpg";
import Jumbo from "../components/jumbo/jumbo";

export default function HomePage() {
  const { tranding, genres } = useGamesContext();

  if (tranding.length === 0) {
    return <div>Caricamento in corso...</div>;
  }

  const desiredGenres = [
    "Action",
    "Adventure",
    "Arcade",
    "Shooter",
    "Fighting",
    "RPG",
    "Indie",
    "Strategy",
    "Sports",
  ];

  const filteredGenres = genres.filter((genre) =>
    desiredGenres.includes(genre.name)
  );

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
                <div key={genre.id} className="col-12 col-md-6 col-xl-4 mb-4">
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
