/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import NodeOfForum from "./node-forum";

const rightArrowIcon = require("assets/img/right-arrow.svg").default;
const bottomArrowIcon = require("assets/img/bottom-arrow.svg").default;

const Root = "rvn-forum__table-forum";
const ClassNames = {
  Root,
  Body: `${Root}__body`,
};

interface TableForumProps {
  title: string;
  listForum: any[];
  length?: number;
}

const TableForum: React.FC<TableForumProps> = ({
  title,
  listForum,
  length,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (length)
        setShow(!show);
  };

  let numrows = length ? length : listForum.length;
  if (show === true) 
    numrows = listForum.length;
  const tableForum = [];

  for (let index = 0; index < numrows; index++) {
    tableForum.push(
      <NodeOfForum
        key={index}
        title={listForum[index].name}
        description={listForum[index].description}
        info={listForum[index].info}
      />,
    );
  }

  return (
    <div className={Root}>
      <header>
        <h5>{title}</h5>
        <img
          src={!show ? rightArrowIcon : bottomArrowIcon}
          onClick={handleShow}
          width={!show ? 9 : 14}
          height={!show ? 14 : 9}
        />
      </header>
      <footer>
        {tableForum}
      </footer>
    </div>
  );
};

export default TableForum;
