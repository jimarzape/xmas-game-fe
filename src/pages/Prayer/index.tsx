import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import "./style.css";
import { PauseCircle, PlayCircle } from "@mui/icons-material";
import { useState } from "react";
const prayer = require("../../assets/sounds/prayer-bg-music.mp3") as string;

const PrayerPage = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const prayAudio = new Audio(prayer);
  const play = () => {
    prayAudio.play();
    setMusicPlaying(true);
  };

  return (
    <Container
      style={{
        textAlign: "left",
        width: "100%",
        backgroundPosition: "center",
        padding: "5em",
        position: "fixed",
        top: "4.25em",
        bottom: 0,
        right: 0,
        left: 0,
      }}
      className="video-container"
    >
      <iframe
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          transform: "ranslate(-50%, -50%)",
        }}
        src="https://www.youtube.com/embed/CPUUue1ACOw?controls=0&autoplay=1&mute=1&playsinline=1&playlist=CPUUue1ACOw&loop=1"
        title="Holy Spirit in body form like a dove   video background loop"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgb(79 161 79 / 64%)", // Overlay if needed to make text readable
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            color: "white",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {!musicPlaying && (
            <IconButton onClick={() => play()}>
              <PlayCircle />
            </IconButton>
          )}

          <Typography variant="h4">
            Dear Lord, We thank you for Christmas Day.
          </Typography>
          <Typography variant="h4">
            Help us remember you in everything we do this holiday season Lord
            God.
          </Typography>
          <Typography variant="h4">
            Give us divine wisdom to follow you and be your hands
          </Typography>
          <Typography variant="h4">
            and feet exactly where you need us.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
export default PrayerPage;
