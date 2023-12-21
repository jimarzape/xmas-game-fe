import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BingoImg from "../../../src/assets/images/bingo.png";
import { useListGameMutation } from "../../store/game.slice";
import { useEffect, useState } from "react";
import extractYouTubeID from "../../utils/ytIdExtractor";

const GamesPage = () => {
  const [reqList, resList] = useListGameMutation();
  const [gameList, setGameList] = useState<any>([]);

  useEffect(() => {
    const items = [
      {
        id: 1,
        title: "Bingo",
        imageUrl: BingoImg,
        generateLink: () => "/games/bingo", // Example dynamic link generation function
      },
    ];
    reqList({})
      .then((res: any) => {
        console.log("res", res.data.data);
        res.data.data.map((game: any) => {
          const id = extractYouTubeID(game.link);
          const imageUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
          items.push({
            id: game.id,
            title: game.title,
            imageUrl,
            generateLink: () => `/games/play/${game.id}`,
          });
        });
        setGameList(items);
      })
      .catch((e) => {});
  }, []);

  return (
    <Container style={{ width: "70%", margin: "auto" }}>
      <Container
        style={{
          height: "80vh",
        }}
        className="container-game"
      >
        <Box sx={{ textAlign: "center", p: 4 }} width="100%">
          <Typography variant="h1" component="h2">
            Games
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", p: 4 }} width="100%">
          <Grid container spacing={2} justifyContent="center" sx={{ gap: 5 }}>
            {gameList.map((item: any) => (
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
                    to={item.generateLink()}
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
                        width: "100%",
                        height: "70%",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="h6" style={{ marginBottom: "8px" }}>
                      {item.title}
                    </Typography>
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};
export default GamesPage;
