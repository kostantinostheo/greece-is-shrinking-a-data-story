import React, { useEffect, useMemo, useState } from "react";
import ThemedChart from "../ThemedChart";
import Slider from "../Slider";
import { PlayIcon, PauseIcon } from "../Icons";
import dataMap from '../../resources/datasets/age-groups-greece.json';

const FIRST_YEAR = 1990;
const LAST_YEAR = 2023;
const GROUPS = ["0–19", "20–39", "40–59", "60–79", "80+"];

const generateData = (year) => [
    ["Age group", "Share of population", { role: "annotation" }],
    ...GROUPS.map((g, i) => [g, dataMap[year][i], `${dataMap[year][i].toFixed(1)}%`]),
];

const options = (t) => ({
    colors: [t.violet],
    bar: { groupWidth: "72%" },
    legend: { position: 'none' },
    chartArea: { left: 64, right: 40, top: 12, bottom: 40 },
    annotations: { alwaysOutside: true, textStyle: { color: t.ink2, fontSize: 12 } },
    hAxis: { title: "% of population", minValue: 0, maxValue: 35, gridlines: { color: t.line } },
    vAxis: { textStyle: { color: t.ink2, fontSize: 13 } },
});

const AgeGroupsComponent = () => {
    const [year, setYear] = useState(LAST_YEAR);
    const [playing, setPlaying] = useState(false);
    const data = useMemo(() => generateData(year), [year]);

    useEffect(() => {
        if (!playing) return;
        const timer = setInterval(() => {
            setYear(y => (y >= LAST_YEAR ? FIRST_YEAR : y + 1));
        }, 500);
        return () => clearInterval(timer);
    }, [playing]);

    return (
        <div>
            <ThemedChart chartType="BarChart" height="320px" data={data} options={options} />
            <div className="mt-5 flex items-center gap-3 pt-6">
                <button
                    type="button"
                    onClick={() => setPlaying(p => !p)}
                    aria-label={playing ? 'Pause' : 'Play through the years'}
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-accent transition-all hover:border-accent active:scale-95"
                >
                    {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                </button>
                <Slider
                    value={year}
                    onChange={(v) => { setPlaying(false); setYear(v); }}
                    min={FIRST_YEAR}
                    max={LAST_YEAR}
                    bubble="always"
                    label="Year"
                />
            </div>
        </div>
    );
};

export default AgeGroupsComponent;
