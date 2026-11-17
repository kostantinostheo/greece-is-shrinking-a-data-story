import React from 'react';
import ThemedChart from '../ThemedChart';
import { Chapter, Figure, Stat, Em } from '../Story';
import birthsDeathsData from '../../resources/datasets/births-deaths-greece.json';
import { births, fmt } from '../../story/facts';

const options = (t) => ({
    curveType: 'function',
    colors: [t.blue, t.orange],
    lineWidth: 3,
    chartArea: { left: 56, right: 16, top: 48, bottom: 40 },
    legend: { position: 'top', alignment: 'start' },
    hAxis: { ticks: [1980, 1990, 2000, 2010, 2020].map(v => ({ v: String(v), f: String(v) })) },
    vAxis: { format: 'short', viewWindow: { min: 0 } },
});

export default function TurningPoint() {
    const { first, last, dropPct, deathsRisePct, sustainedFrom, naturalDecrease } = births;
    return (
        <Chapter
            id="turning-point"
            kicker="Births vs deaths"
            lead={
                <>
                    <p>
                        For decades Greece added more people than it lost. In {first.year} there were{' '}
                        <Em tone="text-accent">{fmt(first.births)}</Em> births against {fmt(first.deaths)} deaths.
                        Then the two lines began to close in on each other.
                    </p>
                    <p>
                        Births have fallen by <Em tone="text-accent">{dropPct.toFixed(0)}%</Em>, while deaths have risen
                        by <Em tone="text-alert">{deathsRisePct.toFixed(0)}%</Em> as the population has aged.
                        Since {sustainedFrom}, deaths have outnumbered births in every single year.
                    </p>
                </>
            }
            aside={
                <div className="grid grid-cols-2 gap-4">
                    <Stat value={`−${dropPct.toFixed(0)}%`} tone="text-accent" label={`births vs ${first.year}`} sub={`${fmt(first.births)} → ${fmt(last.births)}`} />
                    <Stat value={fmt(naturalDecrease)} tone="text-alert" label={`more deaths than births, ${last.year}`} />
                </div>
            }
            takeaway="A country where deaths outnumber births shrinks, unless people move in to make up the difference. But is the fall concentrated in one place, or is it everywhere?"
        >
            <Figure
                title={`Annual births and deaths in Greece, ${first.year}–${last.year}`}
                subtitle="Hover the lines to read exact values"
                caption={`Deaths have exceeded births in ${births.yearsDeathsAhead} of the ${births.rows.length} years shown, and in every year from ${sustainedFrom} on.`}
            >
                <ThemedChart chartType="LineChart" height="400px" data={birthsDeathsData} options={options} />
            </Figure>
        </Chapter>
    );
}
