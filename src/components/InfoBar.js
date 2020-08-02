import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, InputAdornment } from "@material-ui/core";
import { BoardSelector } from "./BoardSelector";

export function InfoBar() {
  return (
    <div className="info-bar">
      <div className="workspace">
        <h1>Workspaces</h1>
        <br />
        <InputBase
          className="workspace-filter"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#a1a1a1", fontSize: "1.3em" }} />
            </InputAdornment>
          }
          placeholder="Filter boards..."
          inputProps={{ "aria-label": "naked" }}
        />
      </div>
      <BoardSelector />
      <div className="info-footer">
        <h1 className="info-footer-title">Dashboards</h1>
      </div>
    </div>
  );
}
