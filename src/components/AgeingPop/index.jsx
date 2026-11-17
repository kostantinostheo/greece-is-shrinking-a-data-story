import React from "react";
import AgeGroupsComponent from "./age-groups";
import LineChartComponent from "./median-age";
import { Chapter, Figure, Stat, Em } from "../Story";
import { ageing } from "../../story/facts";

export default function AgeingPop() {
    const a = ageing;
    return (
        <Chapter
            id="older-nation"
            kicker="Median age and age groups"
            lead={
                <>
                    <p>
                        When fewer children are born, the people who are already here get older. From {a.firstYear} to {a.lastYear}, Greece’s
                        median age rose from <Em tone="text-violet">{a.median1990.toFixed(1)}</Em> to{' '}
                        <Em tone="text-violet">{a.median2023.toFixed(1)} years</Em>, one of the highest in the EU.
                    </p>
                    <p>
                        The share of Greeks under 40 fell from {a.under40_1990.toFixed(0)}% to {a.under40_2023.toFixed(0)}%, while the
                        share aged 60 and over grew from {a.over60_1990.toFixed(0)}% to <Em tone="text-violet">{a.over60_2023.toFixed(0)}%</Em>.
                        Press play and watch the bars shift to the right.
                    </p>
                    <p>
                        An older population means a shrinking workforce and a smaller tax base to support it.
                    </p>
                </>
            }
            aside={
                <div className="grid grid-cols-2 gap-4">
                    <Stat value={a.median2023.toFixed(1)} tone="text-violet" label={`median age in ${a.lastYear}`} sub="one of the highest in the EU" />
                    <Stat value={`+${a.medianRise.toFixed(1)}`} tone="text-alert" label={`years older than in ${a.firstYear}`} sub={`${a.median1990.toFixed(1)} → ${a.median2023.toFixed(1)}`} />
                </div>
            }
            takeaway="Fewer young people, more older ones. Part of that is a good-news story: Greeks are living longer. And that changes what a family looks like."
        >
            <Figure
                title="Who lives in Greece, by age group"
                subtitle="Share of the population, by year"
            >
                <AgeGroupsComponent />
            </Figure>
            <Figure
                title={`Median age of the population, ${a.firstYear}–${a.lastYear}`}
                subtitle="Half of Greeks are older than this, half younger"
                delay={80}
            >
                <LineChartComponent />
            </Figure>
        </Chapter>
    );
}
