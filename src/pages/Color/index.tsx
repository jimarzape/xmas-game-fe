import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import BorderBg from "../../assets/images/border.png";
import { useListFamilyMutation } from "../../store/family.slice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const drumroll = require("../../assets/sounds/drum-roll.mp3") as string;

const FamilyColor = () => {
  const tickAudio = new Audio(drumroll);
  const [reqList, resList] = useListFamilyMutation();
  const [isColoring, setIsColoring] = useState(false);
  const [family, setFamily] = useState<any[]>([]);
  useEffect(() => {
    reqList({})
      .then((res: any) => {
        const options = [] as any;
        res?.data?.data?.map((item: any) => {
          options.push({
            id: item.id,
            name: item.name,
            color: "#808080",
            label: "No Color Yet",
            text: "#000000",
          });

          setFamily(options);
        });
      })
      .catch((e) => {});
  }, []);

  const colors = [
    {
      label: "Red",
      color: "#FF0000",
      text: "#FFFFFF",
    },
    // {
    //   label: "Gold",
    //   color: "#FFD700",
    //   text: "#000000",
    // },
    {
      label: "Blue",
      color: "#0000FF",
      text: "#FFFFFF",
    },
    {
      label: "Purple",
      color: "#800080",
      text: "#FFFFFF",
    },
    {
      label: "Ivory",
      color: "#FFFFF0",
      text: "#000000",
    },
    {
      label: "Pink",
      color: "#FFC0CB",
      text: "#000000",
    },
    {
      label: "Turquoise",
      color: "#40E0D0",
      text: "#000000",
    },
    {
      label: "Khaki",
      color: "#F0E68C",
      text: "#000000",
    },
    {
      label: "Orange",
      color: "#FFA500",
      text: "#000000",
    },
  ];

  const ColorClick = () => {
    if (isColoring) return; // Prevents re-triggering animation while already running
    setIsColoring(true);
    tickAudio.play();

    let availableColors = [...colors]; // Clone the colors array to manage available colors

    const updateFamilyColors = () => {
      let updatedFamily = family.map((member) => {
        if (availableColors.length === 0) availableColors = [...colors]; // Reset colors if all have been used
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const color = availableColors[randomIndex];
        availableColors.splice(randomIndex, 1); // Remove used color
        return {
          ...member,
          color: color.color,
          text: color.text,
          label: color.label,
        };
      });
      setFamily(updatedFamily);
    };

    const intervalDuration = 200; // The duration for each color change
    const totalDuration = 4000; // Total duration of the animation
    let elapsed = 0;

    const interval = setInterval(() => {
      updateFamilyColors(); // Update colors in each interval
      elapsed += intervalDuration;

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setIsColoring(false); // Re-enable the button
      }
    }, intervalDuration);
  };

  return (
    <Container
      style={{
        height: "93vh",
        // background: "red",
        position: "fixed",
      }}
      className="container-game"
    >
      <Box
        sx={{
          position: "absolute",
          width: "15em",
          height: "15em",
          //   background: "blue",
          backgroundImage: `url(${BorderBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2em" }}
        width="100%"
      >
        <Typography variant="h5" component="h5">
          Family Color Assignment for year 2024
        </Typography>
      </Box>
      <Container
        style={{
          width: "80%",
          height: "72vh",
          marginTop: "2em",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center" sx={{ gap: 2 }}>
          {family.map((item: any) => {
            return (
              <Grid item key={item.id} xs={2}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    height: "200px",
                    width: "200px",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      height: "120px",
                      backgroundColor: `${item.color}`,
                      margin: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color={item.text}> {item.label}</Typography>
                  </Box>
                  <Typography variant="h6" style={{ marginBottom: "8px" }}>
                    {item.name}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Box>
        <Button variant="contained" onClick={() => ColorClick()}>
          Select Color
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "15em",
          height: "15em",
          transform: "scale(-1, -1)",
          //   background: "blue",
          backgroundImage: `url(${BorderBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
    </Container>
  );
};
export default FamilyColor;
