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

interface NavItemProps {
  content: string;
}

const NavItem: React.FC<NavItemProps> = ({content, children}) => {
  return (
    <HtmlTooltip
      placement="right"
      title={
        <>
          {content}
        </>
      }
    >
      <div>{children}</div>
    </HtmlTooltip>
  );
};

export default NavItem;
