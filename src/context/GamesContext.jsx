import { createContext, useContext, useState, useEffect } from "react";

const GamesContext = createContext();

export const useGamesContext = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  const [tranding, setTranding] = useState([]);
  const [genres, setGenres] = useState([]);
  const [game, setGame] = useState([]);
  const [price, setPrice] = useState([]);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);

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

  function getGames() {
    fetch(`http://127.0.0.1:8000/api/videogames?name=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setGames(data.data);
        console.log(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getTranding();
    getGenres();
    getStore();
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
        search,
        setSearch,
        getGames,
        games,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
