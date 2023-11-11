import React, { useEffect, useState } from "react";
import "../assets/css/TextAnimation.css";
import { Container, Typography } from "@mui/material";

const Home = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [backspace, setBackspace] = useState(false);
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

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Typography id="demo" variant="h2">
        {text}
        {showCursor ? cursor : ""}
      </Typography>
    </Container>
  );
};

export default Home;
