import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Paper, Typography } from "@mui/material";
import GameProfile from "./Profile";
import defaultProfile from "../../assets/images/profile-roulette.jpg";
import vsImg from "../../assets/images/vs.png";
const drumroll = require("../../assets/sounds/drum-roll.mp3") as string;

type TeamMember = {
  name: string;
  img: string;
};

type Participant = {
  first_name: string;
  avatar: string;
};

interface GameInt {
  participants: number;
  isClick: boolean;
  Clicked: (e: boolean) => void;
}

const GameTeams = ({ participants, isClick, Clicked }: GameInt) => {
  const { peopleList } = useSelector((state: any) => state.people);
  const [teamA, setTeamA] = useState<TeamMember[]>(
    new Array(participants).fill({ name: "", img: defaultProfile })
  );
  const [teamB, setTeamB] = useState<TeamMember[]>(
    new Array(participants).fill({ name: "", img: defaultProfile })
  );

  const tickAudio = new Audio(drumroll);

  useEffect(() => {
    if (isClick) {
      fillTeamsRandomly();
    }
  }, [isClick]);

  const fillTeamsRandomly = () => {
    let availableParticipants: Participant[] = [...peopleList];
    const pickDuration = 200; // Duration between each pick in milliseconds
    const totalDuration = 4000; // Total duration for each team member pick in millisecond
    tickAudio.play();

    const fillTeamMember = (
      team: TeamMember[],
      setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>,
      index: number
    ) => {
      let participantData: TeamMember | null = null;

      let loopInterval = setInterval(() => {
        if (availableParticipants.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * availableParticipants.length
          );
          const participant = availableParticipants[randomIndex]; // No need to deep copy here as we are creating a new object below
          participantData = {
            name: participant.first_name,
            img: participant.avatar,
          };

          // Temporarily update the team member with the new participant info for visual effect
          setTeam((prevTeam: any) =>
            prevTeam.map((member: any, memberIndex: number) =>
              memberIndex === index ? { ...participantData } : member
            )
          );
        }
      }, pickDuration);

      setTimeout(() => {
        clearInterval(loopInterval);
        if (participantData && availableParticipants.length > 0) {
          // Remove the selected participant from the available pool
          availableParticipants = availableParticipants.filter(
            (part) =>
              part.first_name !== participantData!.name ||
              part.avatar !== participantData!.img
          );

          // Final update for the team member
          setTeam((prevTeam: any) =>
            prevTeam.map((member: any, memberIndex: number) =>
              memberIndex === index ? { ...participantData } : member
            )
          );
        }
      }, totalDuration);
    };

    // Sequentially fill each team member position for both teams
    for (let i = 0; i < participants; i++) {
      if (availableParticipants.length > 0) {
        fillTeamMember(teamA, setTeamA, i); // Fill for team A
        fillTeamMember(teamB, setTeamB, i); // Fill for team B
      }
    }

    Clicked(false);

    // tickAudio.pause();
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={5}>
          <Container
            style={{
              height: "80vh",
              width: "100%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={2} justifyContent="center" sx={{ gap: 5 }}>
              {teamA.map((item: any) => {
                return (
                  <Grid item key={item.id} xs={3}>
                    <GameProfile
                      name={item.name}
                      imgSource={item.img}
                      height="150px"
                      width="150px"
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
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
            <Grid container spacing={2} justifyContent="center" sx={{ gap: 5 }}>
              {teamB.map((item: any) => {
                return (
                  <Grid item key={item.id} xs={3} justifyContent="center">
                    <GameProfile
                      name={item.name}
                      imgSource={item.img}
                      height="150px"
                      width="150px"
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
export default GameTeams;
