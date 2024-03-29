/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthManager from "data/auth-manager";
import useWindowDimensions from "./useWindowDimension";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import Avatar from "./avatar";
import clsx from "clsx";
import { Section, MENU, HEADER } from "../main/const";
import ProfileTooltip from "./profile-menu";
import { useSetRecoilState } from "recoil";
import postAtom from "ui/state/post-atom";

const brand = require("assets/img/logo_brand.svg").default;
const listIcon = require("assets/img/list_icon.svg").default;
const avatar = require("assets/img/avatar.svg").default;
const noneBanner = require("assets/img/none_banner.svg").default;

const Root = "rvn-header";
const ClassNames = {
  Root,
  Brand: `${Root}__brand`,
  Nav: `${Root}__nav`,
  ActiveNav: `${Root}__nav__active`,
  Right: `${Root}__right`,
  Search: `${Root}__right__search`,
  TranslateButton: `${Root}__right__translate-button`,
  Connect: `${Root}__connect`,
};

// interface HeaderProps {
// }

const Header: React.FC = () => {
  const location = useLocation();
  const [active, setActive] = useState<Section>(Section.HOME);
  const setPost = useSetRecoilState(postAtom);
  const navigate = useNavigate();

  const handleActive = (section: Section) => {
    if (MENU.includes(section)) setActive(section);
  };

//   const { width } = useWindowDimensions();

  const selectSection = (key: Section) => {
    handleActive(key);
    if (HEADER.includes(key)) {
      navigate(`/${key}`);
    }
  };

  const translate = (e: any) => {
    e.preventDefault();
    setPost(undefined);
    navigate(`${Section.TRANSLATE}`);
    setSearchingOff();
  };

  useEffect(() => {
    const pathname = location.pathname.substr(1);
    handleActive(pathname);
    // if (pathname === Section.TRANSLATE) setSearchingOn();
    // else setSearchingOff();
  }, [location.pathname]);

  const [isSearching, setIsSearching] = useState(false);
  const setSearchingOn = () => {
    setIsSearching(true);
  };
  const setSearchingOff = () => {
    setIsSearching(false);
  };

  const checkActive = (section: Section) => {
    if (active === section) return true;
    return false;
  };

  const onClick = (e: any, section: Section) => {
    e && e.preventDefault();
    selectSection(section);
  };

  return (
    <header className={Root}>
      <nav
        className={clsx(
          "d-flex",
          "align-items-center",
          "justify-content-between",
          "me-2",
        )}
      >
        <nav className={ClassNames.Brand}>
          <img
            src={brand}
            width="80%"
            height="auto"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </nav>

        {false && (
          <nav className={ClassNames.Nav}>
            <a
              className={clsx(
                checkActive(Section.FORUM) ? ClassNames.ActiveNav : "",
              )}
              onClick={(e: any) => onClick(e, Section.FORUM)}
            >
              Forum
            </a>
            <a
              className={clsx(
                checkActive(Section.MISSION) && ClassNames.ActiveNav,
                "ms-5",
              )}
              onClick={(e: any) => onClick(e, Section.MISSION)}
            >
              Mission
            </a>
            <a
              className={clsx(
                checkActive(Section.SEASON) && ClassNames.ActiveNav,
                "ms-5",
              )}
              onClick={(e: any) => onClick(e, Section.SEASON)}
            >
              Season
            </a>
          </nav>
        )}

        <nav
          className={clsx(
            "d-flex",
            "align-items-center",
            "justify-content-end",
            ClassNames.Right,
          )}
        >
          
              {false &&
                (!isSearching ? (
                  <div
                    className={clsx(
                      "d-flex",
                      "align-items-center",
                      "me-4",
                      "rounded-circle",
                      "h-50",
                      "p-2",
                    )}
                    onClick={setSearchingOn}
                    style={{ backgroundColor: "#343434" }}
                  >
                    <AiOutlineSearch size={15} />
                  </div>
                ) : (
                  <form
                    className={clsx("d-flex", "align-items-center", "me-4")}
                    onClick={setSearchingOn}
                  >
                    <input
                      placeholder="🔎︎ Search"
                      className={clsx("rounded-pill", ClassNames.Search)}
                      aria-label="Search"
                    />
                  </form>
                ))}
              <div className={clsx("d-flex", "align-items-center", "me-4")}>
                <div
                  className={clsx(
                    !isSearching ? "rounded-pill" : "rounded-circle",
                    !isSearching && "pe-3 ps-3",
                    ClassNames.TranslateButton,
                  )}
                  onClick={translate}
                >
                  <img src={listIcon} />
                  {!isSearching && "Translate now"}
                </div>
              </div>
          
          {false && (
            <>
              {" "}
              <div
                className={clsx(
                  "d-flex",
                  "align-items-center",
                  "me-4",
                  "position-relative",
                )}
              >
                <div className="announcements">88</div>
                <AiOutlineBell size={28} />
              </div>
            </>
          )}
          <ProfileTooltip
            imgBanner={noneBanner}
            name={AuthManager.getUsername() || ""}
            onClick={() => {/*onClick(null, Section.PROFILE)*/}}
          >
            <Avatar avatar={avatar} square={50} isCircle={true} />
          </ProfileTooltip>
        </nav>
      </nav>
    </header>
  );
};

export default Header;
