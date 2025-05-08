import { useGamesContext } from "../context/GamesContext";
import { useEffect } from "react";
import styles from "../assets/css/searchPage.module.css";
import GameCard from "../components/cards/GameCard";

export default function SearchPage() {
  const { games, getGames, search } = useGamesContext();

  useEffect(() => {
    getGames();
  }, [search]);

  if (games.length === 0) {
    return <div className="loading">Caricamento in corso...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Games</h2>
        <div className={styles.cardContainer}>
          <div className="row">
            {games.map((game) => (
              <div key={game.id} className="col-12 col-md-4">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
