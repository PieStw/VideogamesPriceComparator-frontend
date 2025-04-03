import styles from "../../assets/css/genreCard.module.css";

export default function GenreCard({ genre }) {
  return (
    <div
      className={styles.card}
      style={{ border: `3px solid ${genre.color}`, borderRadius: "10px" }}
    >
      <img
        src={`/${genre.name.toLowerCase()}-bg.jpg`}
        alt={genre.name}
        className={styles.cardImg}
      />
      <p className={styles.cardText}>{genre.name}</p>
      <img
        src={`/${genre.name.toLowerCase()}-icon.png`}
        alt={genre.name}
        className={styles.cardIcon}
      />
    </div>
  );
}
