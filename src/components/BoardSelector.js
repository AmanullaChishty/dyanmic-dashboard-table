import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { IconButton, TextField } from "@material-ui/core";

export function BoardSelector() {
  const [boards, setBoards] = useState([
    { name: "Test Case" },
    { name: "Time manage" },
  ]);
  const [showList, setShowList] = useState(true);
  const [addBoard, setAddBoard] = useState(false);
  const [boardlabel, setBoardLabel] = useState("");
  const createBoard = () => {
    setBoards([
      ...boards,
      {
        name: boardlabel,
      },
    ]);
    setAddBoard(false);
    setBoardLabel("");
  };

  return (
    <>
      <div className="board-selector">
        <IconButton onClick={() => setShowList(!showList)}>
          {showList ? (
            <ArrowDropDownIcon className="board-selector-icon" />
          ) : (
            <ArrowLeftIcon className="board-selector-icon" />
          )}
        </IconButton>
        <div className="board-selector-main">
          <HomeIcon
            className="board-selector-icon"
            id="board-selector-home-icon"
          />
          <h2 className="board-selector-heading">Main</h2>
        </div>
        <IconButton onClick={() => setAddBoard(!addBoard)}>
          {!addBoard ? (
            <AddCircleOutlineIcon
              className="board-selector-icon"
              id="board-selector-add-icon"
            />
          ) : (
            <RemoveCircleOutlineIcon
              className="board-selector-icon"
              id="board-selector-remove-icon"
            />
          )}
        </IconButton>
      </div>
      {addBoard && (
        <div>
          <TextField
            className="add-board"
            variant="outlined"
            placeholder="Enter board name"
            value={boardlabel}
            onChange={(e) => setBoardLabel(e.target.value)}
          />
          {boardlabel && (
            <IconButton onClick={() => createBoard()}>
              <CheckCircleOutlineIcon id="board-selector-check-icon" />
            </IconButton>
          )}
        </div>
      )}
      {showList && (
        <ul className="board-types">
          <li className="board-list" id="selected-board">
            Web design
          </li>
          {boards &&
            boards.length > 0 &&
            boards.map((board, index) => {
              return (
                <li key={index} className="board-list">
                  {board.name}
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}
