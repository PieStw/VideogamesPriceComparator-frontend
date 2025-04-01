import "./App.css";
import { GamesProvider } from "./context/GamesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <GamesProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" element={<HomePage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GamesProvider>
    </>
  );
}

export default App;
