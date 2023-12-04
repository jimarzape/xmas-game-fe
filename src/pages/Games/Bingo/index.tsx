import React from "react";
import {
  Grid,
  Paper,
  IconButton,
  Box,
  Container,
  Typography,
  Link,
} from "@mui/material";
import DiagonalLeft from "../../../assets/images/bingo/diagonal-left.png";
import DiagonalRight from "../../../assets/images/bingo/diagonal-right.png";
import FullCard from "../../../assets/images/bingo/full-card.png";
import HorizontalCard from "../../../assets/images/bingo/horizontal.png";
import BingoSource from "./source";
import { useNavigate } from "react-router-dom";

const BingoCard = () => {
  const navigate = useNavigate();
  function handlePlayClick(id: any) {
    navigate(`/games/bingo/${id}`);
  }
  const items = BingoSource();

  return (
    <Container
      style={{ width: "70%", margin: "auto" }}
      className="container-game"
    >
      <Box sx={{ textAlign: "center", p: 4 }} width="100%">
        <Typography variant="h3" component="h3">
          Choose mode
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", p: 4 }} width="100%">
        <Grid container spacing={2} justifyContent="center" sx={{ gap: 5 }}>
          {items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  textAlign: "center",
                  height: "300px",
                  width: "250px",
                }}
              >
                <Link
                  onClick={() => handlePlayClick(item.id)}
                  component="button"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                  />
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "8px", margin: "auto" }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BingoCard;
