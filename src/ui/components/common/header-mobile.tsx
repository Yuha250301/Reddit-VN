/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import Avatar from "./avatar";
import OrangeButton from "./orange-button";
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

const HeaderMobile: React.FC = () => {
  return (
    <header className={Root}>
      <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={brand}
              width="150"
              height="auto"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
            //   style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">My Profile</Nav.Link>
              <Nav.Link href="#action1">Forum</Nav.Link>
              <Nav.Link href="#action2">Mission</Nav.Link>
              <Nav.Link href="#" disabled>
                Season
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderMobile;
