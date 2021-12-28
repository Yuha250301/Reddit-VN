/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { OverlayTrigger, Tooltip,Button } from "react-bootstrap";

interface NavItemProps {
    content: string;
}

const NavItem: React.FC<NavItemProps> = ({content, children}) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {content}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      // delay={{ show: 250, hide: 250 }}
      overlay={renderTooltip}
    >
      <div>{children}</div>
    </OverlayTrigger>
  );
};

export default NavItem;
