import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import NameDisplay from "./NameDisplay";
import rouletteProfile from "../../assets/images/profile-roulette.jpg";
import {
  peoples,
  useListPeopleMutation,
  useRaffleListPeopleMutation,
  useSetWinnerMutation,
} from "../../store/people.slice";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-confetti";
import { categoryDataInt, peopleDataInt } from "../../interface";
import { useListCategoryMutation } from "../../store/category.slice";

const tickSound = require("../../assets/sounds/clock.mp3") as string;
const congratsSound = require("../../assets/sounds/congrats.mp3") as string;
const drumroll = require("../../assets/sounds/drum-roll.mp3") as string;
const yehey = require("../../assets/sounds/yehey.mp3") as string;
const hbd = require("../../assets/sounds/hbd.mp3") as string;

const Roulette = () => {
  const tickAudio = new Audio(drumroll);
  let congratsAudio = new Audio(yehey);
  const disptach = useDispatch();

  const { peopleBtnPage } = useSelector((state: any) => state.people);
  const { categorylist } = useSelector((state: any) => state.category);

  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [pickedNames, setPickedNames] = useState<peopleDataInt | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [profileSrc, setProfileSrc] = React.useState<string | null>(null);
  const [reqList, resList] = useRaffleListPeopleMutation();
  const [reqCategoryList, resCategoryList] = useListCategoryMutation();
  const [reqWinner, resWinner] = useSetWinnerMutation();
  const [hasWinner, setHasWinner] = useState(false);
  const [participant, setParticipan] = useState<peopleDataInt[] | []>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [playDuration, setPlayDuration] = useState(4000);
  const [confettiDuration, setConfettiDuration] = useState(9000);
  const [peopleParam, setPeopleParam] = useState(peopleBtnPage);

  const load = async (param: any) => {
    await reqList(param).then((res: any) => {
      // console.log("data", res?.data.data);
      const data = res?.data?.data;
      setParticipan(data);
    });
  };

  const handleCategoryChange = async (id: number) => {
    const param = {
      ...peopleBtnPage,
      category_id: id,
      take: 100,
    };

    await disptach(peoples({ peopleBtnPage: param }));
    // setPeopleParam(param);
    await load(param);
  };

  const handleGenderChange = async (gender: string) => {
    const param = {
      ...peopleBtnPage,
      gender: gender != "All" ? gender : "",
      take: 100,
    };

    await disptach(peoples({ peopleBtnPage: param }));
    // setPeopleParam(param);
    await load(param);
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

  // useEffect(() => {
  //   load();
  // }, [peopleParam]);

  useEffect(() => {
    reqCategoryList({});
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
    congratsAudio = new Audio(yehey);
    setPlayDuration(4000);
    setConfettiDuration(9000);

    // tickAudio.loop = true; // Set the audio to loop
    tickAudio.play(); // Start playing the tick sound

    congratsAudio.pause();

    const latestParticipants = participant; // Capture the latest participant value

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * latestParticipants.length);
      setPickedNames(latestParticipants[randomIndex]);
    }, 50); // Adjust the interval for displaying picked names

    setTimeout(async () => {
      clearInterval(interval);
      setHasWinner(true);

      tickAudio.pause();

      const finalIndex = Math.floor(Math.random() * latestParticipants.length);
      if (latestParticipants[finalIndex].isHbd) {
        congratsAudio = new Audio(hbd);
        setPlayDuration(30000);
        setConfettiDuration(30000);
      }
      congratsAudio.play();
      setSelectedName(
        `${latestParticipants[finalIndex]?.first_name} ${latestParticipants[finalIndex]?.last_name}`
      );
      setProfileSrc(latestParticipants[finalIndex]?.avatar);
      setPickedNames(latestParticipants[finalIndex]);
      setIsPicking(false);
      await setWinner(latestParticipants[finalIndex]?.id);
    }, playDuration); // Total time for picking

    setTimeout(() => {
      setHasWinner(false);
    }, confettiDuration);
  };

  const setWinner = async (id: number) => {
    await reqWinner({ id }).then(async (res) => {
      await load(peopleBtnPage);
    });
  };

  return (
    <Container style={{ width: "70%", margin: "auto" }}>
      <Grid container spacing={2} mt="32px">
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="category-select">Category Group</InputLabel>
            <Select
              labelId="category-select"
              id="category_id"
              name="category_id"
              onChange={(e: SelectChangeEvent) => {
                handleCategoryChange(Number(e.target.value));
              }}
            >
              <MenuItem value="0">All</MenuItem>
              {categorylist?.map((item: categoryDataInt, key: number) => {
                return (
                  <MenuItem value={item.id} key={`category-${item.id}`}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="category-select">Gender</InputLabel>
            <Select
              labelId="gender-select"
              id="gender"
              name="gender"
              onChange={(e: SelectChangeEvent) => {
                handleGenderChange(e.target.value);
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3} textAlign="right">
          <Typography>Available participants : {participant.length}</Typography>
        </Grid>
      </Grid>

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
        className="container-game"
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
            disabled={isPicking || resList.isLoading || participant.length == 0}
            onClick={() => pickRandomName()}
            variant="contained"
            color="primary"
          >
            {isPicking ? "Picking..." : "Pick a Name!"}
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default Roulette;
