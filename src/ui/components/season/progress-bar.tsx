/* eslint-disable prettier/prettier */
import React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import clsx from 'clsx';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 44,
  width: "100%",
  borderRadius: 25,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 25,
    backgroundColor: theme.palette.mode === 'light' ? '#E85B25' : '#308fe8',
  },
}));

interface CustomizedProgressBarProps {
    value: number;
}

const CustomizedProgressBars:React.FC<CustomizedProgressBarProps> = ({value}) => {
    return (
      <div className={clsx("d-flex", "align-items-center","position-relative")}>
        <BorderLinearProgress variant="determinate" value={value} />
        <p style={{position: "absolute", right:"30px", fontWeight: "700", color: "#111"}}>total points</p>
      </div>
    );
}

export default CustomizedProgressBars;