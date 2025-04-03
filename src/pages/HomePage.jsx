import React from "react";
import styles from "../assets/css/homePage.module.css";
import { useGamesContext } from "../context/GamesContext";
import Card from "../components/card/Card";

export default function HomePage() {
  const { tranding } = useGamesContext();
  console.log(tranding);

  if (tranding.length === 0) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <main className={styles.main}>
        <div
          className={styles.jumboContainer}
          style={{
            backgroundImage: `url(${tranding[4].image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        >
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <h1 className={styles.jumboTitle}>{tranding[4].title}</h1>
              <h2 className={styles.jumboRating}>
                Rating: {tranding[4].rating}
              </h2>
            </div>
          </div>
          <div className={styles.cut}></div>
        </div>
        <div className={styles.container}>
          <h2 className={styles.title}>Trending</h2>
          <div className={styles.cardContainer}>
            <div className="row">
              {tranding
                .filter((_, index) => index !== 4)
                .map((game) => (
                  <div key={game.id} className="col-12 col-md-4">
                    <Card game={game} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
