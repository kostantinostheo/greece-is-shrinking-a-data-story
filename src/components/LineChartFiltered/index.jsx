import React, { useMemo, useState } from 'react';
import ThemedChart from '../ThemedChart';
import { Chapter, Figure, Stat, Em } from '../Story';
import metricsData from '../../resources/datasets/births-metrics-greece.json';
import { economy, fmt } from '../../story/facts';

// metricsData columns: Year, Births, tooltip, then (metric, tooltip) pairs.
const METRICS = [
    { key: 'GDP Per Capita', label: 'GDP per capita', col: 3, unit: '', color: 'orange',
      why: 'When incomes grow, families may feel more confident about having children; when they shrink, many postpone.' },
    { key: 'Unemployment Rate %', label: 'Unemployment', col: 5, unit: '%', color: 'red',
      why: 'High unemployment brings income insecurity, which can discourage families from having children.' },
    { key: 'Emigration', label: 'Emigration', col: 7, unit: '', color: 'violet', from: 1998,
      why: 'Emigration of people of childbearing age can shrink the pool of potential parents. No data was found before 1998.' },
    { key: 'Inflation Rate %', label: 'Inflation', col: 9, unit: '%', color: 'green',
      why: 'Rising living costs make raising children harder to afford; stable prices support family confidence.' },
];

const rows = metricsData.slice(1);

const normalise = (values) => {
    const finite = values.filter(v => v !== null);
    const min = Math.min(...finite), max = Math.max(...finite);
    return values.map(v => (v === null ? null : (v - min) / (max - min)));
};

const strength = (r) => (Math.abs(r) < 0.3 ? 'a weak' : Math.abs(r) < 0.6 ? 'a moderate' : 'a fairly strong');

export function LineChartFiltered() {
    const [selected, setSelected] = useState(METRICS[0].key);
    const metric = METRICS.find(m => m.key === selected);

    const data = useMemo(() => {
        const usable = rows.filter(r => !metric.from || +r[0] >= metric.from);
        const birthsN = normalise(usable.map(r => r[1]));
        const metricN = normalise(usable.map(r => r[metric.col]));
        return [
            ['Year', 'Births', { type: 'string', role: 'tooltip' }, metric.label, { type: 'string', role: 'tooltip' }],
            ...usable.map((r, i) => [
                String(r[0]),
                birthsN[i], `${r[0]}\nBirths: ${fmt(r[1])}`,
                metricN[i], `${r[0]}\n${metric.label}: ${fmt(r[metric.col], r[metric.col] % 1 ? 1 : 0)}${metric.unit}`,
            ]),
        ];
    }, [metric]);

    const options = useMemo(() => (t) => ({
        colors: [t.blue, t[metric.color]],
        curveType: 'function',
        lineWidth: 3,
        legend: { position: 'top', alignment: 'start' },
        chartArea: { left: 44, right: 16, top: 44, bottom: 36 },
        hAxis: { ticks: [1980, 1990, 2000, 2010, 2020].map(v => ({ v: String(v), f: String(v) })) },
        vAxis: { viewWindow: { min: -0.05, max: 1.05 }, ticks: [0, 0.5, 1].map(v => ({ v, f: v === 0 ? 'low' : v === 1 ? 'high' : '' })) },
    }), [metric]);

    const r = economy.correlation[metric.key];
    const first = metric.from || economy.firstYear;

    return (
        <Chapter
            id="wider-economy"
            tone="band"
            kicker="Economy and births"
            lead={
                <>
                    <p>
                        Housing is one pressure among many. Economists point to the wider economy too: jobs, prices, incomes and
                        whether people stay or leave. Pick a factor and compare it with births.
                    </p>
                    <p>
                        A word of caution. These lines show what moved together, not what caused what. Over four decades, many things
                        trend in one direction at once.
                    </p>
                </>
            }
            aside={
                <Stat
                    value={`${r > 0 ? '+' : '−'}${Math.abs(r).toFixed(2)}`}
                    tone="text-ink"
                    label={`Correlation with births, ${first}–${economy.lastYear}`}
                    sub={`${metric.label} and births show ${strength(r)} ${r > 0 ? 'tendency to move together' : 'tendency to move in opposite directions'}.`}
                />
            }
            takeaway="No single factor explains the decline. Which brings us back to where we started."
        >
            <Figure
                title={`Births and ${metric.label.toLowerCase()}, ${first}–${economy.lastYear}`}
                subtitle="Both series are rescaled to 0–1 so they can share one axis. Hover for actual values."
            >
                <div role="group" aria-label="Choose a factor to compare with births" className="mb-4 flex flex-wrap gap-2">
                    {METRICS.map(m => (
                        <button key={m.key} type="button" className="chip" aria-pressed={selected === m.key} onClick={() => setSelected(m.key)}>
                            {m.label}
                        </button>
                    ))}
                </div>
                <ThemedChart chartType="LineChart" height="380px" data={data} options={options} />
                <div className="mt-4 rounded-xl border border-line bg-surface-2 p-4 text-[14px] leading-relaxed text-ink-2">
                    <p className="eyebrow mb-1.5">{metric.label}: a common explanation</p>
                    <p>{metric.why}</p>
                    {metric.key === 'Inflation Rate %' && (
                        <p className="mt-2">
                            <Em>In this data</Em>, inflation and births moved together mainly because both fell over four decades, a reminder that
                            long-running trends can line up without one driving the other.
                        </p>
                    )}
                </div>
            </Figure>
        </Chapter>
    );
}

export default LineChartFiltered;
