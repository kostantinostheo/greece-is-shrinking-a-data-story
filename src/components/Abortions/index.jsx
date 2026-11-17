import React, { useMemo, useState } from "react";
import ThemedChart from "../ThemedChart";
import { useTheme } from "../../theme/ThemeContext";
import { Chapter, Figure, Stat, Em } from "../Story";
import { TriangleExclamationIcon } from "../Icons";
import Slider from "../Slider";
import allData from '../../resources/datasets/abortions-greece.json';
import { abortions, fmt } from "../../story/facts";

const FIRST_YEAR = 1950;
const LAST_YEAR = 2015;

const sliderMarks = [1950, 1970, 1986, 2000, 2015].map(v => ({ value: v, label: String(v) }));

const options = (t) => ({
    colors: [t.gold],
    curveType: 'function',
    lineWidth: 3,
    pointSize: 0,
    legend: { position: 'none' },
    chartArea: { left: 52, right: 16, top: 24, bottom: 32 },
    annotations: { textStyle: { color: t.ink2, fontSize: 12 }, stem: { color: t.ink3 } },
    vAxis: { viewWindow: { min: 0 }, format: 'short' },
});

export default function AbortionsInGreece() {
    const { tokens } = useTheme();
    const [yearRange, setYearRange] = useState([FIRST_YEAR, LAST_YEAR]);

    const data = useMemo(() => {
        const [header, ...rows] = allData;
        return [
            header,
            ...rows
                .filter(r => +r[0] >= yearRange[0] && +r[0] <= yearRange[1])
                // The 1986 data point carries a marker; recolour it for the active theme and label it.
                .map(r => (r[2] ? [r[0], r[1], `point { size: 10; shape-type: circle; fill-color: ${tokens.accent}; }`, 'Law 1609/1986'] : r)),
        ];
    }, [yearRange, tokens.accent]);

    const peak = abortions;
    return (
        <Chapter
            id="choices"
            kicker="Abortions and the law"
            lead={
                <>
                    <p>
                        Family decisions are also shaped by law. Before <Em tone="text-gold">Law 1609/1986</Em>, abortions were recorded at lower levels,
                        rising steadily through the post-war decades.
                    </p>
                    <p>
                        After legalisation in 1986, recorded numbers climbed sharply, peaking at over{' '}
                        <Em tone="text-gold">{fmt(Math.floor(peak.peak / 1000) * 1000)}</Em> in {peak.peakYear}. That likely reflects both a real increase and
                        improved official reporting. Together with falling birth rates and rising maternal age, it is part of Greece’s demographic picture.
                    </p>
                </>
            }
            aside={
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Stat value={fmt(peak.peak)} tone="text-gold" label="peak recorded abortions" sub={peak.peakYear} />
                        <Stat value="1986" tone="text-accent" label="year of legalisation" sub="Law 1609/1986" />
                    </div>
                    <p className="flex gap-2.5 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-[13px] leading-relaxed text-ink-2">
                        <TriangleExclamationIcon size={15} className="mt-0.5 shrink-0 text-gold" />
                        <span>
                            <strong className="font-semibold text-ink">Disclaimer.</strong> We fully respect every individual’s choice regarding abortion.
                            This data is presented solely for informational and academic purposes.
                        </span>
                    </p>
                </div>
            }
            takeaway="Laws and attitudes shift what families decide. But for many couples, the decision starts with something much more practical: where they will live."
        >
            <Figure
                title="Recorded abortions per year in Greece"
                subtitle="Filter the years with the range slider below"
                source="Johnston’s Archive"
            >
                <ThemedChart chartType="LineChart" height="360px" data={data} options={options} />
                <div className="mt-2 px-3 pb-6 pt-8">
                    <p className="eyebrow mb-6">Filter year range</p>
                    <Slider
                        value={yearRange}
                        onChange={setYearRange}
                        bubble="always"
                        min={FIRST_YEAR}
                        max={LAST_YEAR}
                        marks={sliderMarks}
                        label="Year range"
                    />
                </div>
            </Figure>
        </Chapter>
    );
}
