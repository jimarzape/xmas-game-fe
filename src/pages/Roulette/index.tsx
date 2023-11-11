import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import NameDisplay from "./NameDisplay";
import rouletteProfile from "../../assets/images/profile-roulette.jpg";
import { useListPeopleMutation } from "../../store/people.slice";
import { useSelector } from "react-redux";
import ConfettiExplosion from "react-confetti-explosion";
import Confetti from "react-confetti";
import { peopleDataInt } from "../../interface";

const tickSound = require("../../assets/sounds/clock.mp3") as string;
const congratsSound = require("../../assets/sounds/congrats.mp3") as string;
const drumroll = require("../../assets/sounds/drum-roll.mp3") as string;
const yehey = require("../../assets/sounds/yehey.mp3") as string;

const Roulette = () => {
  const tickAudio = new Audio(drumroll);
  const congratsAudio = new Audio(yehey);
  const names = ["Name 1", "Name 2", "Name 3", "Name 4"]; //
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [pickedNames, setPickedNames] = useState<peopleDataInt | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [profileSrc, setProfileSrc] = React.useState<string | null>(null);
  const [reqList, resList] = useListPeopleMutation();
  const [hasWinner, setHasWinner] = useState(false);
  const [participant, setParticipan] = useState<peopleDataInt[] | []>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const load = async () => {
    await reqList({}).then((res: any) => {
      const data = res?.data?.data;
      setParticipan(data);
    });
  };

  const setDefProfile = () => {
    if (rouletteProfile) {
      fetch(rouletteProfile)
        .then((res) => res.blob())
        .then((blob) => {
          convertToBase64(blob as File, (base64String) => {
            setProfileSrc(base64String);
          });
        })
        .catch((error) => {
          console.error("Error converting default image to base64:", error);
        });
    }
  };

  useEffect(() => {
    load();
  }, []);

  React.useEffect(() => {
    setDefProfile();
  }, [rouletteProfile]);

  const convertToBase64 = (
    file: File,
    callback: (result: string | null) => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const pickRandomName = () => {
    setIsPicking(true);
    setPickedNames(null);
    setHasWinner(false);
    setDefProfile();

    tickAudio.loop = true; // Set the audio to loop
    tickAudio.play(); // Start playing the tick sound

    congratsAudio.pause();

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participant?.length);
      setPickedNames(participant[randomIndex]);
    }, 50); // Adjust the interval for displaying picked names

    setTimeout(() => {
      clearInterval(interval);
      setHasWinner(true);
      tickAudio.pause();
      congratsAudio.play();
      const finalIndex = Math.floor(Math.random() * participant?.length);
      setSelectedName(
        `${participant[finalIndex]?.first_name} ${participant[finalIndex]?.last_name}`
      );
      setProfileSrc(participant[finalIndex]?.avatar);
      setPickedNames(participant[finalIndex]);
      setIsPicking(false);
    }, 4000); // Total time for picking

    setTimeout(() => {
      setHasWinner(false);
    }, 9000);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box sx={{ textAlign: "center", p: 4 }}>
        {hasWinner && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}

        {profileSrc && typeof profileSrc === "string" && (
          <img
            src={profileSrc}
            style={{
              width: "20em",
              height: "20em",
              objectFit: "contain",
              marginBottom: "50px",
            }}
          />
        )}
        <NameDisplay
          selectedName={selectedName}
          pickedNames={pickedNames}
          hasWinner={hasWinner}
        />
        <Button
          disabled={isPicking}
          onClick={pickRandomName}
          variant="contained"
          color="primary"
        >
          {isPicking ? "Picking..." : "Pick a Name!"}
        </Button>
      </Box>
    </Container>
  );
};

export default Roulette;
