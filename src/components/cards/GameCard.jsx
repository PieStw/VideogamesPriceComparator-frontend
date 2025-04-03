import styles from "../../assets/css/gameCard.module.css";

export default function GameCard({ game }) {
  return (
    <>
      <div className={styles.card}>
        <img
          src={game.image_url}
          alt={game.image_url}
          className={styles.cardImg}
        />
        <p>{game.title}</p>
      </div>
    </>
  );
}
