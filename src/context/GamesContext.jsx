import { createContext, useContext, useState, useEffect } from "react";

const GamesContext = createContext();

export const useGamesContext = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  const [tranding, setTranding] = useState([]);

  function getTranding() {
    fetch("http://127.0.0.1:8000/api/videogames/bestseller")
      .then((response) => response.json())
      .then((data) => {
        setTranding(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getTranding();
  }, []);

  return (
    <GamesContext.Provider value={{ tranding }}>
      {children}
    </GamesContext.Provider>
  );
};
