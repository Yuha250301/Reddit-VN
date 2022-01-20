/* eslint-disable prettier/prettier */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow disableInteractive classes={{ popper: className }} />
))(({ theme }) => ({
  // [`& .${tooltipClasses.tooltipPlacementRight}`]: {
  //   // top: "120px !important",
  //   // left: "10px !important",
  // },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff",
    left: "2px !important"
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#000",
    maxWidth: 360,
    fontSize: 11,
    lineHeight: "11.55px",
    fontWeight: "400",
    // border: "1px solid #dadde9",
    padding: "6px",
    borderRadius: "5px",
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
