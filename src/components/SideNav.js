import React from "react";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { IconButton } from "@material-ui/core";


export function SideNavbar() {
  return (
    <div className="sidenav">
      <div className="top-bar">
        <IconButton className="sidenav-icon-btn">
          <NotificationsNoneIcon className="sidenav-icon" />
        </IconButton>
        <IconButton className="sidenav-icon-btn">
          <SaveAltIcon className="sidenav-icon" />
        </IconButton>
      </div>
      <div>
        <IconButton className="sidenav-icon-btn">
          <EventAvailableIcon className="sidenav-icon" />
        </IconButton>
        <IconButton className="sidenav-icon-btn">
          <PersonAddIcon className="sidenav-icon" />
        </IconButton>
        <IconButton className="sidenav-icon-btn">
          <SearchIcon className="sidenav-icon" />
        </IconButton>
        <IconButton className="sidenav-icon-btn">
          <HelpOutlineIcon className="sidenav-icon" />
        </IconButton>
        <IconButton className="sidenav-icon-btn">
          <AccountCircleIcon className="sidenav-icon" id="account-icon" />
        </IconButton>
      </div>
    </div>
  );
}
