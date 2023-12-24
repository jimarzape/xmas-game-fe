import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Category from "./pages/Category";
import FamilyGroup from "./pages/Family";
import People from "./pages/People";
import Roulette from "./pages/Roulette";
import GamesPage from "./pages/Games";
import BingoCard from "./pages/Games/Bingo";
import BingoPlay from "./pages/Games/Bingo/play";
import GameAdmin from "./pages/Games/admin";
import AddGame from "./pages/Games/admin/Add";
import EditGame from "./pages/Games/admin/Edit";
import GamePlay from "./pages/Games/play";
import PrayerPage from "./pages/Prayer";
import FamilyColor from "./pages/Color";

function App() {
  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <BrowserRouter>
        <Header />
        <Container
        // style={{ maxWidth: "unset", paddingLeft: "0px", paddingRight: "0px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings">
              <Route path="category" element={<Category />} />
              <Route path="family-group" element={<FamilyGroup />} />
              <Route path="people" element={<People />} />
              <Route path="games">
                <Route path="" element={<GameAdmin />} />
                <Route path="add" element={<AddGame />} />
                <Route path="edit/:gameId" element={<EditGame />} />
              </Route>
            </Route>

            <Route path="/roulette" element={<Roulette />} />
            <Route path="/games">
              <Route path="" element={<GamesPage />} />
              <Route path="play/:gameId" element={<GamePlay />} />
              <Route path="bingo" element={<BingoCard />} />
              <Route path="bingo/:id" element={<BingoPlay />} />
            </Route>
            <Route path="/prayer" element={<PrayerPage />} />
            <Route path="/family-color" element={<FamilyColor />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
