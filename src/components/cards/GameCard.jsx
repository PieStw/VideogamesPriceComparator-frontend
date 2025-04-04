import styles from "../../assets/css/gameCard.module.css";
import { NavLink } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <>
      <NavLink to={`/game/${game.id}`} className={styles.link}>
        <div className={styles.card}>
          <img
            src={game.image_url}
            alt={game.image_url}
            className={styles.cardImg}
          />
          <p>{game.title}</p>
        </div>
      </NavLink>
    </>
  );
}
