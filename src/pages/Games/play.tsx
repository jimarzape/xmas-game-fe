import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useViewGameMutation } from "../../store/game.slice";
import { useSelector } from "react-redux";
import PeopleCategory from "../Component/people";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import frameBg from "../../assets/images/frame-bg.png";
import vsImg from "../../assets/images/vs.png";
import { PlayCircleFilled, Settings, Shuffle } from "@mui/icons-material";

const GamePlay = () => {
  const params = useParams();
  const { gameData } = useSelector((state: any) => state.games);
  const { peopleList } = useSelector((state: any) => state.people);

  const [reqView, resView] = useViewGameMutation();

  useEffect(() => {
    reqView({ id: params.gameId });
  }, [params]);

  console.log("peopleList", peopleList);
  console.log("gameData", gameData);

  return (
    <Container
      style={{
        width: "98%",
        backgroundImage: `url(${frameBg})`,
        backgroundSize: "100% 100%",
        height: "90vh",
        backgroundRepeat: "no-repeat",
        marginTop: "1vh",
      }}
      className="gamebg"
    >
      <Container
        style={{
          // background: "blue",
          position: "absolute",
          left: "50%",
          right: "50%",
          top: "15%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h4" component="h4">
          {gameData?.title}
        </Typography>
      </Container>
      <Container
        style={{
          // background: "blue",
          width: "90%",
          height: "80vh",
          marginTop: "5vh",
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={5}>
            <Container style={{ height: "80vh", width: "100%" }}></Container>
          </Grid>
          <Grid item xs={2}>
            <Container
              style={{
                height: "80vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={vsImg} style={{ width: "100px" }} />
            </Container>
          </Grid>
          <Grid item xs={5}>
            <Container style={{ height: "80vh", width: "100%" }}></Container>
          </Grid>
        </Grid>
      </Container>
      {/* <Grid container spacing={2}>
        <Grid item xs={6}>
          <PeopleCategory />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid> */}
      <Container
        style={{
          // background: "blue",
          width: "31em",
          height: "4em",
          position: "absolute",
          bottom: "0",
          left: "50%",
          right: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          color="white"
        >
          <IconButton
            aria-label="Shuffle"
            style={{ color: "white" }}
            size="large"
          >
            <Shuffle />
          </IconButton>
          <IconButton
            aria-label="Preview"
            style={{ color: "white" }}
            size="large"
          >
            <PlayCircleFilled />
          </IconButton>
          <IconButton
            aria-label="Preview"
            style={{ color: "white" }}
            size="large"
          >
            <Settings />
          </IconButton>
        </Stack>
      </Container>
    </Container>
  );
};

export default GamePlay;
