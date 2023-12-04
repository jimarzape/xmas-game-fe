import { useParams } from "react-router-dom";
import BingoSource from "./source";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface BingoNumbers {
  B: number[];
  I: number[];
  N: number[];
  G: number[];
  O: number[];
}

const drumroll = require("../../../assets/sounds/drum-roll.mp3") as string;
const yehey = require("../../../assets/sounds/yehey.mp3") as string;

const BingoPlay = () => {
  const tickAudio = new Audio(drumroll);
  let congratsAudio = new Audio(yehey);
  const bingoNumbers: BingoNumbers = {
    B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    I: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    N: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    G: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    O: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
  };
  const bingoGrid = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => false)
  );

  const [sourceData, SetSourceData] = useState<any>();
  const { id } = useParams();
  const source = BingoSource();
  const [playDuration, setPlayDuration] = useState(4000);
  const [confettiDuration, setConfettiDuration] = useState(9000);

  useEffect(() => {
    const data = source.find((obj: any) => obj.id == id);
    // console.log("data", data);
    SetSourceData(data);
  }, [id]);

  const [selectedNumbers, setSelectedNumbers] = useState<BingoNumbers>({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });
  const [displayNumber, setDisplayNumber] = useState<any | null>(null);

  useEffect(() => {
    console.log("selectedNumbers", selectedNumbers);
  }, [selectedNumbers]);

  const selectRandomNumber = () => {
    tickAudio.play();

    const allNumbers: { key: string; num: number }[] = Object.keys(
      bingoNumbers
    ).reduce((acc: any, key) => {
      const numsWithKeys = bingoNumbers[key as keyof BingoNumbers].map(
        (num) => ({ key, num })
      );
      return [...acc, ...numsWithKeys];
    }, []); // Combine the numbers with their associated index letter

    const remainingNumbers = allNumbers.filter(
      ({ key, num }) =>
        !selectedNumbers[key as keyof BingoNumbers].includes(num)
    );

    if (remainingNumbers.length === 0) {
      console.log("All numbers have been called.");
      return;
    }

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
      const { key, num } = remainingNumbers[randomIndex];
      setDisplayNumber(`${key}-${num}`); // Display the selected number with its index letter
    }, 50); // Adjust the interval for displaying picked numbers

    setTimeout(() => {
      clearInterval(interval);

      tickAudio.pause();

      const finalIndex = Math.floor(Math.random() * remainingNumbers.length);
      congratsAudio.play();

      const { key, num } = remainingNumbers[finalIndex];
      setSelectedNumbers({
        ...selectedNumbers,
        [key]: [...selectedNumbers[key as keyof BingoNumbers], num],
      }); // Store the selected number under its key
      setDisplayNumber(`${key}-${num}`); // Display the final picked number with its index letter
    }, playDuration); // Total time for picking

    setTimeout(() => {
      setDisplayNumber(null); // Reset the displayed number after the confetti duration
    }, confettiDuration);
  };

  return (
    <Container
      style={{ width: "90%", margin: "auto" }}
      className="container-game"
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "92vh",
              background: "red",
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                textAlign: "center",
                height: "300px",
                width: "250px",
              }}
            >
              <img
                src={sourceData?.imageUrl}
                alt={sourceData?.title}
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
                {sourceData?.title}
              </Typography>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={6} md={6}>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "92vh",
              padding: "5em",
              background: "green",
            }}
          >
            <Box>
              <Typography variant="h3">{displayNumber}</Typography>
              <Button variant="contained" onClick={() => selectRandomNumber()}>
                Pick number
              </Button>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
export default BingoPlay;
