import { Paper, Typography } from "@mui/material";

interface GameInt {
  imgSource: any;
  name: string;
  height: string;
  width: string;
}

const GameProfile = ({ name, imgSource, width, height }: GameInt) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        textAlign: "center",
        height: height,
        width: width,
      }}
    >
      <img
        src={imgSource}
        alt={name}
        style={{
          width: "100%",
          height: "80%",
          objectFit: "contain",
        }}
      />
      <Typography variant="h6" style={{ marginBottom: "8px" }}>
        {name}
      </Typography>
    </Paper>
  );
};
export default GameProfile;
