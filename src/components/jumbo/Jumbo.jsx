import styles from "../../assets/css/jumbo.module.css";
import { NavLink } from "react-router-dom";

export default function Jumbo({ game, info }) {
  return (
    <NavLink to={`/game/${game.id}`} className={styles.link}>
      <div
        className={styles.jumboContainer}
        style={{
          backgroundImage: `url(${game.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            {info && <h1 className={styles.jumboTitle}>{game.title}</h1>}
            {info && (
              <h2 className={styles.jumboRating}>Rating: {game.rating}</h2>
            )}
          </div>
        </div>
        <div className={styles.cut}></div>
      </div>
    </NavLink>
  );
}
