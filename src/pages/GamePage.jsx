import { useParams } from "react-router-dom";
import styles from "../assets/css/gamePage.module.css";
import { useGamesContext } from "../context/GamesContext";
import { useEffect } from "react";
import Jumbo from "../components/jumbo/jumbo";

export default function GamePage() {
  const { id } = useParams();

  const { game, getGame } = useGamesContext();

  useEffect(() => {
    getGame(id);
  }, []);

  if (game.length === 0) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <Jumbo game={game} info={false} />
    </>
  );
}
