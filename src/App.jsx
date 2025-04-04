import "./App.css";
import { GamesProvider } from "./context/GamesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <GamesProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/game/:id" element={<GamePage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GamesProvider>
    </>
  );
}

export default App;
