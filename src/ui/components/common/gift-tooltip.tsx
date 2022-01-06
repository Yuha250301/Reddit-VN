/* eslint-disable prettier/prettier */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import clsx from "clsx";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow disableInteractive classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltipPlacementRight}`]: {
    top: "120px !important",
    left: "10px !important",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#101010",
    top: "-100px !important",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#101010",
    color: "#fff",
    maxWidth: 360,
    fontSize: 20,
    // border: "1px solid #dadde9",
    boxShadow: "1px 1px 15px 4px rgba(255, 255, 255, 0.2)",
    padding: "20px",
    borderRadius: "8px",
  },
}));

interface GiftTooltipProps {
  imgAward: any;
  content: string;
}

const GiftTooltip: React.FC<GiftTooltipProps> = ({
  imgAward,
  content,
  children,
}) => {
  return (
    <HtmlTooltip
      placement="right"
      title={
        <>
          <div
            className={clsx("d-flex", "align-items-center")}
            style={{
              backgroundColor: "#000",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <div style={{ width: "auto", marginRight: "10px" }}>{imgAward}</div>
            <h5 style={{ width: "auto", fontWeight: "700" }}>{content}</h5>
          </div>
          <ul
            style={{
              paddingLeft: "30px",
              fontWeight: "400",
              fontSize: "20px",
              lineHeight: "25.6px",
            }}
          >
            <li>Gift Name 1</li>
            <li>Gift Name 2</li>
            <li>Gift Name 3</li>
            <li>Gift Name 4</li>
            <li>Gift Name 5</li>
          </ul>
        </>
      }
    >
      <div>{children}</div>
    </HtmlTooltip>
  );
};

export default GiftTooltip;
