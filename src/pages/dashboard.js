import React from "react";
import Title from "../components/Title";
import DynamicColumnChart from "../components/dynamicCharts/DynamicColumnChart";
import DynamicLineChart from "../components/dynamicCharts/DynamicLineChart";
import DynamicMultiSeriesChart from "../components/dynamicCharts/DynamicMultiSeriesChart";
const Dashboard = () => {
  return (
    <>
    <article className="dashboard">
      <Title title="Real time Charts" />
      <section className="charts">
        <DynamicColumnChart/>
        <DynamicLineChart/>
        <DynamicMultiSeriesChart/>
      </section>
    </article>
    </>
  );
};

export default Dashboard;
