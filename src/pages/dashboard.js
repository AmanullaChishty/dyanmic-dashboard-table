import React from "react";
import { InfoBar } from "../components/InfoBar";
import { Board } from "../components/Board";


const Dashboard = () => {
  return (
    <>
    <article className="dashboard">
      <InfoBar/>
      <Board/>
    </article>
    </>
  );
};

export default Dashboard;
