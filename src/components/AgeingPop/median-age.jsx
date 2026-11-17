import React from "react";
import ThemedChart from "../ThemedChart";
import medianAgeData from '../../resources/datasets/median-age-greece.json';

const options = (t) => ({
    curveType: "function",
    colors: [t.violet],
    lineWidth: 3,
    legend: { position: 'none' },
    chartArea: { left: 44, right: 12, top: 12, bottom: 32 },
    vAxis: { viewWindow: { min: 34, max: 50 } },
});

const LineChartComponent = () => (
    <ThemedChart chartType="LineChart" height="240px" data={medianAgeData} options={options} />
);

export default LineChartComponent;
