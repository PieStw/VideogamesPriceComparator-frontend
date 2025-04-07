import { useParams } from "react-router-dom";
import styles from "../assets/css/gamePage.module.css";
import { useGamesContext } from "../context/GamesContext";
import { useEffect } from "react";
import Jumbo from "../components/jumbo/jumbo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function GamePage() {
  const { id } = useParams();
  const { game, getGame, price, stores } = useGamesContext();

  useEffect(() => {
    getGame(id);
  }, [id]);

  if (!game || Object.keys(game).length === 0) {
    return <div className={styles.loading}>Caricamento in corso...</div>;
  }

  const getStoreById = (id) => stores.find((s) => s.storeID === id);

  const barData = price?.deals?.map((deal) => {
    const store = getStoreById(deal.storeID);
    return {
      store: store?.storeName || "Sconosciuto",
      price: parseFloat(deal.price),
    };
  });

  return (
    <div className={styles.style}>
      <Jumbo game={game} info={false} />
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <img
            src={game.image_url}
            className={styles.img}
            alt={`Copertina di ${game.title}`}
          />
          <div className={styles.info}>
            <h3>{game.title}</h3>
            <p>Data di uscita: {game.release_date}</p>
            <p>{game.description}</p>
            <p>Valutazione: {game.rating}</p>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-6 mb-4">
              <h5 className="text-white">🎭 Generi</h5>
              <div className={styles.badgeGroup}>
                {game.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className={`${styles.badge} ${styles.genre}`}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <h5 className="text-white">🕹️ Piattaforme</h5>
              <div className={styles.badgeGroup}>
                {game.platforms.map((platform) => (
                  <span
                    key={platform.id}
                    className={`${styles.badge} ${styles.platform}`}
                  >
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {barData && barData.length > 0 && (
          <div className={styles.chartContainer}>
            <h4>Prezzi disponibili:</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="store"
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={50}
                />
                <YAxis domain={[0, "dataMax + 5.01"]} />
                <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
                <Bar dataKey="price" fill="#8884d8" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
