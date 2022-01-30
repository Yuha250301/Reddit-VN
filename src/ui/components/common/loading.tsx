import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
    style?: any
}

const Loading: React.FC<LoadingProps> = ({style}) => {
  const loadingStyles = {
    position: "absolute" as "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%,-50%)",
    ...style
  };
  return (
    <div style={loadingStyles}>
      <CircularProgress sx={{ color: "#E85B25" }} />
    </div>
  );
};

export default Loading;
