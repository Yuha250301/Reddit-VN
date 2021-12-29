/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import Avatar from "./avatar";
import clsx from "clsx";

const brand = require("assets/img/logo_brand.svg").default;
const listIcon = require("assets/img/list_icon.svg").default;

const Root = "rvn-header";
const ClassNames = {
  Root,
  Brand: `${Root}__brand`,
  Right: `${Root}__right`,
  Search: `${Root}__right__search`,
  TranslateButton: `${Root}__right__translate-button`,
  Connect: `${Root}__connect`,
};

// interface HeaderProps {
// }

const Header: React.FC = () => {
  const [isSearching, setIsSearching] = useState(true);

  const setSearchingOn = () => {
    setIsSearching(true);
  };
  const setSearchingOff = () => {
    setIsSearching(false);
  };

  return (
    <header className={Root}>
      <Navbar className="m-2">
        <Container fluid>
          <Navbar.Brand href="#home" className={ClassNames.Brand}>
            <img
              src={brand}
              width="150"
              height="auto"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>

          <Nav>
            <Nav.Link href="#home">Forum</Nav.Link>
            <Nav.Link className="ms-4" href="#features">
              Mission
            </Nav.Link>
            <Nav.Link className="ms-4" href="#pricing">
              Season
            </Nav.Link>
          </Nav>

          <Nav
            className={clsx(
              "d-flex",
              "align-items-center",
              "justify-content-end",
              ClassNames.Right,
            )}
          >
            {!isSearching ? (
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
              <Form
                className={clsx("d-flex", "align-items-center", "me-4")}
                onClick={setSearchingOn}
              >
                <FormControl
                  type="search"
                  placeholder="🔎︎ Search"
                  className={clsx("rounded-pill", ClassNames.Search)}
                  aria-label="Search"
                />
              </Form>
            )}
            <div className={clsx("d-flex", "align-items-center", "me-4")}>
              <div
                className={clsx(
                  !isSearching ? "rounded-pill" : "rounded-circle",
                  ClassNames.TranslateButton,
                )}
                onClick={setSearchingOff}
              >
                <img src={listIcon} />
                {!isSearching && "Translate now"}
              </div>
            </div>
            <div className={clsx("d-flex", "align-items-center", "me-4")}>
              <AiOutlineBell size={30} />
            </div>

            <Avatar square={50} />
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
