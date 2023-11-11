import React from "react";
import { Typography } from "@mui/material";
import { NamePIckSelected, namePickData } from "../../interface";

const NameDisplay = ({
  selectedName,
  pickedNames,
  hasWinner,
}: NamePIckSelected) => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {pickedNames?.first_name} {pickedNames?.last_name}
      </Typography>
      {hasWinner && (
        <Typography variant="h5" gutterBottom>
          Congratulations!!
        </Typography>
      )}
    </div>
  );
};

export default NameDisplay;
