import React, { useEffect, useState } from "react";
import "../assets/css/TextAnimation.css";
import { Box, Button, Container, Typography } from "@mui/material";
import Snowfall from "react-snowfall";
import background from "../assets/images/wall-papper-2.jpg";
import "../assets/css/nomax.css";

const Home = () => {
  const jingle = require("../assets/sounds/jingle-bells-2.mp3") as string;

  const jingleAudio = new Audio(jingle);
  jingleAudio.loop = true;

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [backspace, setBackspace] = useState(false);
  const [playJingle, setPlay] = useState(false);
  const [showCursor, setShowCursor] = useState(true); // State to control cursor blinking
  const speed = 75;
  const originalText = "WELCOME TO ZAPE CHRISTMAS PARTY!!!";
  const cursor = "|";
  const pauseBeforeBackspace = 3000; // 2 seconds (adjust as needed)
  const cursorBlinkInterval = 400; // Cursor blink interval (adjust as needed)
  const textCollection = [
    "TODAY IS THE DAY",
    "OUR MOST ANTICIPATED EVENT EVERY YEAR",
    `WELCOME TO OUR ANNUAL CHRISTMAS PARTY!!!`,
    `HOSTED BY ZAPE FAMILY`,
  ];
  const loopDelay = 2000; // Delay before restarting with the next text (adjust as needed)
  const [collectionIndex, setCollectionIndex] = useState(0);

  useEffect(() => {
    const textLength = originalText.length;
    const collectionText = textCollection[collectionIndex];
    const showCursor = !backspace && index === collectionText.length;

    const typingTimeout = setTimeout(
      () => {
        if (backspace) {
          if (text.length > 0) {
            setText((prevText) => prevText.slice(0, -1));
            setIndex((prevIndex) => prevIndex - 1);
          } else {
            setShowCursor(true); // Show cursor before the next typing
            setTimeout(() => {
              setShowCursor(false); // Hide cursor before the next backspace
              setBackspace(false);

              // Switch to the next text in the collection
              setCollectionIndex(
                (prevIndex) => (prevIndex + 1) % textCollection.length
              );
            }, pauseBeforeBackspace);
          }
        } else if (index < collectionText.length) {
          setText((prevText) => collectionText.substring(0, index + 1));
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          setShowCursor(true); // Show cursor before the next pause
          setTimeout(() => {
            setShowCursor(false); // Hide cursor before the next typing
            setBackspace(true);
          }, pauseBeforeBackspace);
        }
      },
      backspace ? speed / 2 : speed
    );

    // Set an interval to toggle the cursor's visibility during the pause
    const cursorBlinkTimeout = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, cursorBlinkInterval);

    // Clear the cursor blink interval and typing timeout when the component unmounts
    return () => {
      clearTimeout(typingTimeout);
      clearInterval(cursorBlinkTimeout);
    };
  }, [text, index, backspace, collectionIndex]);

  useEffect(() => {
    // jingleAudio.play();
  }, []);

  const playSound = () => {
    jingleAudio.play();
    setPlay(true);
  };

  return (
    <Container
      style={{
        textAlign: "left",
        // height: "92.8vh",
        backgroundImage: `url(${background})`,
        width: "100%",
        backgroundPosition: "center",
        padding: "5em",
        position: "absolute",
        top: "4.25em",
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <Snowfall />

      <Container style={{ position: "fixed", top: "30%", left: "5%" }}>
        <Typography variant="h1" color="#ffe7e7">
          Merry Christmas!!!
        </Typography>
        <Typography variant="h3" color="#ffe7e7">
          From Zape family
        </Typography>
        {!playJingle && (
          <Button variant="contained" onClick={playSound}>
            Play
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default Home;
