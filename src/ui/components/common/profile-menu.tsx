/* eslint-disable prettier/prettier */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import clsx from "clsx";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AuthController from "controller/core/auth";
import { useNavigate } from "react-router";

const logout = require("assets/img/logout_icon.svg").default;
const translating = require("assets/img/translating_icon.svg").default;
const feedback = require("assets/img/feedback_icon.svg").default;
const question = require("assets/img/question_profile_icon.svg").default;
const setting = require("assets/img/setting_icon.svg").default;

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    PopperProps={{
      disablePortal: true,
    }}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#101010",
    color: "#fff",
    maxWidth: 360,
    fontSize: 20,
    // border: "1px solid #dadde9",
    boxShadow: "1px 1px 15px 4px rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "8px",
  },
}));

interface CustomizedTooltipProps {
  imgBanner: any;
  name: string;
  onClick: () => void;
}

const ProfileTooltip: React.FC<CustomizedTooltipProps> = ({
  imgBanner,
  name,
  onClick,
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout = (e: any) => {
    if (e) e.preventDefault();
    AuthController.logout();
    navigate("/");
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <HtmlTooltip
          placement="bottom-end"
          onClose={handleTooltipClose}
          open={open}
          disableHoverListener
          className="profile-menu"
          TransitionProps={{ timeout: 0 }}
          title={
            <>
              <div
                className={clsx(
                  "d-flex",
                  "align-items-center",
                  "border-gradient",
                )}
              >
                <h5
                  onClick={onClick}
                  style={{
                    width: "auto",
                    fontWeight: "700",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  {name}
                </h5>
                {/* <img src={imgBanner} /> */}
              </div>
              <div
                className={clsx("d-flex", "flex-column")}
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "14.7px",
                  paddingTop: "15px",
                  gap: "11px",
                }}
              >
                {false && (
                  <>
                    <div
                      className={clsx("d-flex", "align-items-center")}
                      style={{ cursor: "pointer" }}
                    >
                      <img className="me-3" src={setting} />
                      Settings
                    </div>
                    <div
                      className={clsx("d-flex", "align-items-center")}
                      style={{ cursor: "pointer" }}
                    >
                      <img className="me-3" src={question} />
                      Help and Support
                    </div>
                    <div
                      className={clsx("d-flex", "align-items-center")}
                      style={{ cursor: "pointer" }}
                    >
                      <img className="me-3" src={feedback} />
                      Feedback
                    </div>
                    <div
                      className={clsx("d-flex", "align-items-center")}
                      style={{ cursor: "pointer" }}
                    >
                      <img className="me-3" src={translating} />
                      Language
                    </div>
                  </>
                )}
                <div
                  className={clsx("d-flex", "align-items-center")}
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  <img className="me-3" src={logout} />
                  Log out
                </div>
              </div>
            </>
          }
        >
          <div onClick={handleTooltipToggle} style={{ cursor: "pointer" }}>
            {children}
          </div>
        </HtmlTooltip>
      </div>
    </ClickAwayListener>
  );
};

export default ProfileTooltip;
