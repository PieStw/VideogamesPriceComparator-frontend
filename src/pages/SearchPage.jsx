import { useGamesContext } from "../context/GamesContext";
import { useEffect, useState } from "react";
import styles from "../assets/css/searchPage.module.css";
import GameCard from "../components/cards/GameCard";

export default function SearchPage() {
  const {
    games,
    getGames,
    pagination,
    genres,
    platforms,
    setFilters,
    filters,
  } = useGamesContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [platformFilter, setPlatformFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    getGames(currentPage, filters);
  }, [currentPage, platformFilter, genreFilter]);

  useEffect(() => {
    setCurrentPage(1);
    getGames(1, filters);
  }, [filters]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleNextPage = () => {
    if (currentPage < pagination.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlatformChange = (event) => {
    setPlatformFilter(event.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      platform: event.target.value,
    }));
  };

  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: event.target.value,
    }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Games</h2>

        {/* Selettori per i filtri */}
        <div className={styles.filters}>
          {/* Filtro per piattaforma */}
          <select value={platformFilter} onChange={handlePlatformChange}>
            <option value="">Seleziona piattaforma</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>

          {/* Filtro per genere */}
          <select value={genreFilter} onChange={handleGenreChange}>
            <option value="">Seleziona genere</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {games.length === 0 ? (
          <div className={styles.noResults}>
            <h3>Nessun risultato trovato</h3>
          </div>
        ) : (
          <div>
            {" "}
            <div className={styles.cardContainer}>
              <div className="row">
                {games.map((game) => (
                  <div key={game.id} className="col-12 col-md-4">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.pagination}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Precedente
              </button>
              <span>
                {currentPage} di {pagination.last_page}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === pagination.last_page}
              >
                Successivo
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
