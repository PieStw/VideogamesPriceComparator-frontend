import { createContext, useContext, useState, useEffect } from "react";

const GamesContext = createContext();

export const useGamesContext = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  const [tranding, setTranding] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [game, setGame] = useState([]);
  const [price, setPrice] = useState([]);
  const [stores, setStores] = useState([]);
  const [games, setGames] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    platform: "",
    genre: "",
  });

  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 0,
    current_page: 1,
    last_page: 1,
  });

  function getTranding() {
    fetch("http://127.0.0.1:8000/api/videogames/bestseller")
      .then((response) => response.json())
      .then((data) => {
        setTranding(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getGame(id) {
    fetch(`http://127.0.0.1:8000/api/videogames/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data.data);
        getGamePriceByName(data.data.title);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getGenres() {
    fetch("http://127.0.0.1:8000/api/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getPlatforms() {
    fetch("http://127.0.0.1:8000/api/platforms")
      .then((response) => response.json())
      .then((data) => {
        setPlatforms(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getGamePriceByName(name) {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${name}`)
      .then((response) => response.json())
      .then((data) => {
        fetch(`https://www.cheapshark.com/api/1.0/games?id=${data[0].gameID}`)
          .then((response) => response.json())
          .then((data2) => {
            setPrice(data2);
          })
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getStore() {
    fetch("https://www.cheapshark.com/api/1.0/stores")
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getGames(page, filters) {
    fetch(
      `http://127.0.0.1:8000/api/videogames?name=${
        filters.search
      }&page=${page}&platform=${filters?.platform || ""}&genre=${
        filters?.genre || ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setGames(data.data);
        setPagination(data.pagination); // Imposta i dati di paginazione
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getTranding();
    getGenres();
    getStore();
    getPlatforms();
  }, []);

  return (
    <GamesContext.Provider
      value={{
        tranding,
        genres,
        game,
        getGame,
        price,
        stores,
        getGames,
        games,
        platforms,
        pagination,
        setFilters,
        filters,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
