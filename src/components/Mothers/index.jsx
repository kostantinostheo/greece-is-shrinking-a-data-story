import React from "react"
import ThemedChart from "../ThemedChart";
import { Chapter, Figure, Stat, Em } from "../Story";
import motherAgeData from '../../resources/datasets/mother-age-greece.json';
import fertilityRateData from '../../resources/datasets/fertility-rate-greece.json';
import mothersOver40Data from '../../resources/datasets/mothers-over-40-greece.json';
import { mothers, fmt } from "../../story/facts";

const fertilityWithReplacement = [
    ['Year', 'Fertility rate', 'Replacement level'],
    ...fertilityRateData.slice(1).map(([y, v]) => [y, v, mothers.replacement]),
];

const line = (colorKey, extra = {}) => (t) => ({
    colors: [t[colorKey]],
    curveType: 'function',
    lineWidth: 3,
    legend: { position: 'none' },
    chartArea: { left: 44, right: 12, top: 16, bottom: 32 },
    hAxis: { format: '####' },
    ...extra,
});

const optionsAge = line('violet', { vAxis: { viewWindow: { min: 28, max: 33 } } });
const optionsOver40 = line('orange', { vAxis: { viewWindow: { min: 0 }, format: 'short' } });
const optionsFertility = (t) => ({
    colors: [t.blue, t.ink3],
    series: { 1: { lineDashStyle: [4, 4], lineWidth: 2 } },
    curveType: 'function',
    lineWidth: 3,
    legend: { position: 'top', alignment: 'start' },
    chartArea: { left: 40, right: 12, top: 40, bottom: 32 },
    hAxis: { format: '####' },
    vAxis: { viewWindow: { min: 0, max: 2.5 } },
});

export default function Mothers() {
    const m = mothers;
    return (
        <Chapter
            id="later-motherhood"
            kicker="Age and fertility"
            lead={
                <>
                    <p>
                        From {m.ageFirstYear} to {m.ageLastYear}, the average age at which Greek women have their first child rose from{' '}
                        <Em tone="text-violet">{m.ageFirst}</Em> to <Em tone="text-violet">{m.ageLast.toFixed(1)} years</Em>. Women are choosing to start
                        families later, shaped by education, careers and economic pressure.
                    </p>
                    <p>
                        The fertility rate sits at <Em tone="text-alert">{m.fertLast.toFixed(2)} children per woman</Em>. A population needs about{' '}
                        {m.replacement} to replace itself without migration. It is down from a {m.fertPeakYear} peak of {m.fertPeak.toFixed(2)}.
                    </p>
                    <p>
                        Later motherhood also shows up at the other end: births to mothers over 40 have climbed from {fmt(m.over40First)} to {fmt(m.over40Last)} a year,
                        likely reflecting both a cultural shift and advances in reproductive medicine.
                    </p>
                </>
            }
            aside={
                <div className="grid grid-cols-3 gap-3">
                    <Stat value={m.ageLast.toFixed(1)} tone="text-violet" label="age at first birth" sub={m.ageLastYear} />
                    <Stat value={m.fertLast.toFixed(2)} tone="text-alert" label="fertility rate" sub={m.ageLastYear} />
                    <Stat value={fmt(m.over40Peak)} tone="text-ink" label="births to mothers 40+" sub={`${m.over40PeakYear} peak`} />
                </div>
            }
            takeaway="Later, and fewer. So what is pushing the decision back? Part of the answer is a very personal one."
        >
            <Figure title="Average age of mothers at first birth" subtitle={`${m.ageFirstYear}–${m.ageLastYear}, years`}>
                <ThemedChart chartType="LineChart" height="290px" data={motherAgeData} options={optionsAge} />
            </Figure>
            <div className="grid gap-6 md:grid-cols-2">
                <Figure
                    title="Fertility rate"
                    subtitle="Children per woman, 2000–2021"
                    caption={`Well below the ${m.replacement} needed to keep the population stable.`}
                    delay={60}
                >
                    <ThemedChart chartType="LineChart" height="290px" data={fertilityWithReplacement} options={optionsFertility} />
                </Figure>
                <Figure
                    title="Live births to mothers over 40"
                    subtitle="Births per year, 1990–2022"
                    caption={`Up almost ${Math.round(m.over40Multiple)}-fold between ${m.over40FirstYear} and ${m.over40LastYear}.`}
                    delay={120}
                >
                    <ThemedChart chartType="LineChart" height="290px" data={mothersOver40Data} options={optionsOver40} />
                </Figure>
            </div>
        </Chapter>
    );
}
