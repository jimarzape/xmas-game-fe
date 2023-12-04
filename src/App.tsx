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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container
        // style={{ maxWidth: "unset", paddingLeft: "0px", paddingRight: "0px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/family-group" element={<FamilyGroup />} />
            <Route path="/people" element={<People />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/games">
              <Route path="" element={<GamesPage />} />
              <Route path="bingo" element={<BingoCard />} />
              <Route path="bingo/:id" element={<BingoPlay />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
