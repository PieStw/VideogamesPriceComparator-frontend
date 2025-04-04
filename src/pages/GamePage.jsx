import { useParams } from "react-router-dom";
import styles from "../assets/css/gamePage.module.css";
import { useGamesContext } from "../context/GamesContext";
import { useEffect } from "react";

export default function GamePage() {
  const { id } = useParams();

  const { game, getGame } = useGamesContext();

  useEffect(() => {
    getGame(id);
  }, []);

  if (game.length === 0) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <div
        className={styles.jumboContainer}
        style={{
          backgroundImage: `url(${game.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className={styles.infoContainer}>
          <div className={styles.info}></div>
        </div>
        <div className={styles.cut}></div>
      </div>
    </>
  );
}
