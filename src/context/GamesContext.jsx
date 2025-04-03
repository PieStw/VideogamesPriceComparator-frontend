import { createContext, useContext, useState, useEffect } from "react";

const GamesContext = createContext();

export const useGamesContext = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  const [tranding, setTranding] = useState([]);
  const [genres, setGenres] = useState([]);

  function getTranding() {
    fetch("http://127.0.0.1:8000/api/videogames/bestseller")
      .then((response) => response.json())
      .then((data) => {
        setTranding(data.data);
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

  useEffect(() => {
    getTranding();
    getGenres();
  }, []);

  return (
    <GamesContext.Provider value={{ tranding, genres }}>
      {children}
    </GamesContext.Provider>
  );
};
