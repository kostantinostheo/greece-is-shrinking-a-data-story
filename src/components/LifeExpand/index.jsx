import React from "react";
import ThemedChart from "../ThemedChart";
import { Chapter, Figure, Stat, Em, PullQuote } from "../Story";
import lifeData from '../../resources/datasets/life-expectancy-greece.json';
import { family } from "../../story/facts";

const rows = lifeData.slice(1);
const decade = (d) => d.replace(' - ', '–');
const toColumns = (header, col, digits) => [
    ['Decade', header, { role: 'annotation' }],
    ...rows.map(r => [decade(r[0]), r[col], r[col].toFixed(digits)]),
];

const lifeSeries = toColumns('Life expectancy (years)', 1, 1);
const householdSeries = toColumns('Average household size (people)', 2, 1);

const columnOptions = (color, max) => (t) => ({
    colors: [t[color]],
    legend: { position: 'none' },
    bar: { groupWidth: '65%' },
    chartArea: { left: 40, right: 8, top: 24, bottom: 56 },
    annotations: { alwaysOutside: true, textStyle: { color: t.ink2, fontSize: 12 } },
    hAxis: { slantedText: true, slantedTextAngle: 40, textStyle: { fontSize: 11 } },
    vAxis: { minValue: 0, maxValue: max, viewWindow: { min: 0, max } },
});
const lifeOptions = columnOptions('green', 95);
const householdOptions = columnOptions('orange', 5);

export default function LifeExpand() {
    const f = family;
    return (
        <Chapter
            id="smaller-families"
            tone="band"
            kicker="Life expectancy and household size"
            lead={
                <>
                    <p>
                        Here is the good news hiding inside the decline: Greeks live longer. Life expectancy rose from{' '}
                        <Em tone="text-ok">{f.lifeFirst.toFixed(1)} years</Em> in the {decade(f.firstPeriod).slice(0, 4)}s to{' '}
                        {f.lifePeak.toFixed(1)} in the {decade(f.lifePeakPeriod).slice(0, 4)}s.
                    </p>
                    <p>
                        Over the same decades, the average household shrank from{' '}
                        <Em tone="text-alert">{f.householdFirst.toFixed(1)}</Em> to <Em tone="text-alert">{f.householdLast.toFixed(1)} people</Em>.
                        When most children survive to adulthood, families no longer need many children to be sure the family continues.
                    </p>
                </>
            }
            aside={
                <PullQuote>
                    My grandmother, born in the 1930s, often told me stories about her six siblings. With lower life expectancy,
                    having more children was a way to ensure that some would survive to adulthood. Today, people live longer,
                    and families tend to have fewer children.
                </PullQuote>
            }
            takeaway="Longer lives and smaller families are, in themselves, signs of progress. The question is what happens to the generation that chooses to start a family, and when."
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Figure title="Life expectancy at birth" subtitle="Years, by decade" caption={`Peaked at ${f.lifePeak.toFixed(1)} years in the ${decade(f.lifePeakPeriod).slice(0, 4)}s.`}>
                    <ThemedChart chartType="ColumnChart" height="330px" data={lifeSeries} options={lifeOptions} />
                </Figure>
                <Figure title="Average household size" subtitle="People per household, by decade" delay={80} caption="Down by more than a third in sixty years.">
                    <ThemedChart chartType="ColumnChart" height="330px" data={householdSeries} options={householdOptions} />
                </Figure>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Stat value={`${f.lifeLast.toFixed(1)} yrs`} tone="text-ok" label="Life expectancy, 2020–2022" sub={`${f.lifePeak.toFixed(1)} at its ${decade(f.lifePeakPeriod).slice(0, 4)}s peak`} />
                <Stat value={`${f.householdLast.toFixed(1)}`} tone="text-alert" label="People per household, 2020–2022" sub={`was ${f.householdFirst.toFixed(1)} in the ${decade(f.firstPeriod).slice(0, 4)}s`} />
            </div>
        </Chapter>
    );
}
