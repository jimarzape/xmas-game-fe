import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useViewGameMutation } from "../../store/game.slice";
import { useSelector } from "react-redux";
import PeopleCategory from "../Component/people";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import frameBg from "../../assets/images/frame-bg.png";
import vsImg from "../../assets/images/vs.png";
import {
  ArrowBack,
  PlayCircleFilled,
  Settings,
  Shuffle,
} from "@mui/icons-material";
import GameSettings from "./modals/settings";
import extractYouTubeID from "../../utils/ytIdExtractor";
import YouTubeVideoPlayer from "./admin/YouTubeVideoPlayer";
import defaultProfile from "../../assets/images/profile-roulette.jpg";
import GameTeams from "./GameTeams";
import GameSolo from "./GameSolo";
const drumroll = require("../../assets/sounds/drum-roll.mp3") as string;

type Participant = {
  first_name: string;
  avatar: string;
};

type TeamMember = {
  name: string;
  img: string;
};

const GamePlay = () => {
  const params = useParams();
  const { gameData } = useSelector((state: any) => state.games);
  const { peopleList } = useSelector((state: any) => state.people);
  const [visiblePlay, setVisiblePlay] = useState(false);
  const [isOpenSettings, setOpenSettings] = useState(false);
  const [ytId, setYtId] = useState<string | null>(null);
  const [availableParticipants, setavailableParticipants] = useState([]);
  const [isSolo, SetIsSolo] = useState(false);
  const [member, setMember] = useState(5);
  const [isPicking, setIsPicking] = useState(false);

  const [reqView, resView] = useViewGameMutation();

  useEffect(() => {
    reqView({ id: params.gameId });
  }, [params]);

  useEffect(() => {
    if (gameData) {
      if (gameData?.link) {
        setYtId(extractYouTubeID(gameData?.link));
      }
      if (gameData?.teams == 1) {
        SetIsSolo(true);
      }
      setMember(gameData.participants);
    }
  }, [gameData]);

  const fillTeamsRandomly = () => {
    setIsPicking(true);
  };

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
        {visiblePlay ? (
          <Container
            style={{
              height: "65vh",
              width: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "7vh",
            }}
          >
            <Box>{ytId && <YouTubeVideoPlayer videoId={ytId} />}</Box>
          </Container>
        ) : isSolo ? (
          <GameSolo
            participants={Number(member)}
            isClick={isPicking}
            Clicked={(e) => setIsPicking(e)}
          />
        ) : (
          <GameTeams
            participants={Number(member)}
            isClick={isPicking}
            Clicked={(e) => setIsPicking(e)}
          />
        )}
      </Container>
      <Container
        style={{
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
          {visiblePlay ? (
            <IconButton
              aria-label="Back"
              style={{ color: "white" }}
              size="large"
              onClick={() => setVisiblePlay(false)}
            >
              <ArrowBack />
            </IconButton>
          ) : (
            <>
              <IconButton
                aria-label="Shuffle"
                style={{ color: "white" }}
                size="large"
                onClick={() => fillTeamsRandomly()}
              >
                <Shuffle />
              </IconButton>
              <IconButton
                aria-label="Preview"
                style={{ color: "white" }}
                size="large"
                onClick={() => setVisiblePlay(true)}
              >
                <PlayCircleFilled />
              </IconButton>
              <IconButton
                aria-label="Preview"
                style={{ color: "white" }}
                size="large"
                onClick={() => setOpenSettings(true)}
              >
                <Settings />
              </IconButton>
            </>
          )}
        </Stack>
      </Container>
      {isOpenSettings && (
        <GameSettings
          isOpen={isOpenSettings}
          onClose={() => setOpenSettings(false)}
        />
      )}
    </Container>
  );
};

export default GamePlay;
