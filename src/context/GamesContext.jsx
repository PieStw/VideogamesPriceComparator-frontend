import { createContext, useContext } from "react";

const GamesContext = createContext();

export const useGamesContext = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  return <GamesContext.Provider value={{}}>{children}</GamesContext.Provider>;
};
