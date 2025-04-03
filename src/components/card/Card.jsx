import styles from "../../assets/css/card.module.css";

export default function Card({ game }) {
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
