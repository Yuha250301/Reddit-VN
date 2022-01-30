/* eslint-disable prettier/prettier */
import React from "react";
import clsx from "clsx";

import CircularProgress from "@mui/material/CircularProgress";

interface ProgressCircleProps {
  value: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ value,children }) => {
  return (
    <div className={clsx("d-flex", "align-items-center", "position-relative")}>
      <CircularProgress
        sx={{ color: "#E85B25",position: "relative", zIndex: 3 }}
        variant="determinate"
        value={100}
        size="102px"
      />
      <CircularProgress
        sx={{ color: "#FFF",position: "absolute", zIndex: 3 }}
        variant="determinate"
        value={100-value}
        size="102px"
      />
      <div style={{position: "absolute"}}>{children}</div>
    </div>
  );
};

export default ProgressCircle;
