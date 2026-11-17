import React, { useState, useEffect, useMemo, useRef } from 'react';
import ThemedChart from '../ThemedChart';
import { useTheme } from '../../theme/ThemeContext';
import { Chapter, Figure, Stat, Em } from '../Story';
import { HandPointerIcon, PlayIcon, PauseIcon } from '../Icons';
import Slider from '../Slider';
import greece_geojson from '../../resources/datasets/greece-regions.geojson?url'
import { regions as regionFacts, regionalByYear, fmt } from '../../story/facts';

const MAP_WIDTH = 600;
const MAP_HEIGHT = 400;
const LEGEND_WIDTH = 300;
const MAX_BIRTHS = 43000;
const FIRST_YEAR = 1999;
const LAST_YEAR = 2022;

// One-hue sequential ramp (more births = stronger colour), tuned separately per theme so it stays legible on both surfaces.
const RAMPS = {
    light: [[222, 233, 248], [11, 58, 130]],
    dark: [[34, 49, 82], [141, 184, 255]],
};
// Square-root scale: otherwise Attica dwarfs every other region and the map reads as one dark blob and 12 pale ones.
const scale = (births) => Math.sqrt(Math.min(Math.max(births, 0) / MAX_BIRTHS, 1));
const rampColor = (ramp, t) => `rgb(${ramp[0].map((c, i) => Math.round(c + (ramp[1][i] - c) * t)).join(',')})`;

// Mercator projection fitted to the map box, then GeoJSON -> SVG path strings.
const projectFeatures = (geoData) => {
    const polygonsOf = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);
    const mercator = ([lon, lat]) => [
        (lon * Math.PI) / 180,
        -Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)),
    ];

    const projected = geoData.features.map(f =>
        polygonsOf(f.geometry).map(poly => poly.map(ring => ring.map(mercator)))
    );

    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    projected.forEach(polys => polys.forEach(poly => poly.forEach(ring => ring.forEach(([x, y]) => {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
    }))));

    const k = Math.min(MAP_WIDTH / (x1 - x0), MAP_HEIGHT / (y1 - y0));
    const tx = (MAP_WIDTH - k * (x0 + x1)) / 2;
    const ty = (MAP_HEIGHT - k * (y0 + y1)) / 2;

    return geoData.features.map((f, i) => ({
        name: f.properties.name,
        d: projected[i]
            .map(poly => poly.map(ring =>
                ring.map(([x, y], n) => `${n ? 'L' : 'M'}${(x * k + tx).toFixed(2)},${(y * k + ty).toFixed(2)}`).join('') + 'Z'
            ).join(''))
            .join(''),
    }));
};

const regionOptions = (t) => ({
    colors: [t.blue],
    curveType: 'function',
    lineWidth: 3,
    pointSize: 0,
    legend: { position: 'none' },
    chartArea: { left: 52, right: 12, top: 12, bottom: 32 },
    hAxis: { ticks: [2000, 2005, 2010, 2015, 2020].map(v => ({ v: String(v), f: String(v) })), format: '####' },
    vAxis: { viewWindow: { min: 0 }, format: 'short' },
});

export function GeoChartGreece() {
    const { theme } = useTheme();
    const [geoData, setGeoData] = useState(null);
    const [year, setYear] = useState(LAST_YEAR);
    const [playing, setPlaying] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('Attica');
    const [hovered, setHovered] = useState(null);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
    const mapRef = useRef();
    const ramp = RAMPS[theme] || RAMPS.light;

    useEffect(() => {
        fetch(greece_geojson).then(r => r.json()).then(setGeoData).catch(console.error);
    }, []);

    useEffect(() => {
        if (!playing) return;
        const timer = setInterval(() => {
            setYear(y => {
                if (y >= LAST_YEAR) { setPlaying(false); return y; }
                return y + 1;
            });
        }, 450);
        return () => clearInterval(timer);
    }, [playing]);

    const togglePlay = () => {
        if (!playing && year >= LAST_YEAR) setYear(FIRST_YEAR);
        setPlaying(p => !p);
    };

    const shapes = useMemo(() => (geoData ? projectFeatures(geoData) : []), [geoData]);
    const birthsIn = (name) => regionalByYear[name]?.[year];

    const regionData = useMemo(() => [
        ['Year', 'Births'],
        ...Object.entries(regionalByYear[selectedRegion] || {}).map(([y, v]) => [y, v]),
    ], [selectedRegion]);
    const selected = regionalByYear[selectedRegion] || {};
    const selectedChange = selected[2008] ? ((selected[2022] / selected[2008]) - 1) * 100 : null;

    const onMapMove = (e) => {
        const box = mapRef.current.getBoundingClientRect();
        setTooltip({ x: e.clientX - box.left + 12, y: e.clientY - box.top + 12 });
    };

    const legendTicks = [0, 5000, 10000, 20000, 40000];
    const { total2008, total2022, totalDropPct, attica2008, attica2022, atticaDropPct } = regionFacts;

    return (
        <Chapter
            id="across-the-map"
            tone="band"
            kicker="Regional births"
            lead={
                <>
                    <p>
                        It is not one region. It is <Em>all of them</Em>. Across Greece’s {regionFacts.count} regions, annual births peaked
                        at {fmt(total2008)} in 2008 and had fallen to {fmt(total2022)} by 2022, a drop of{' '}
                        <Em tone="text-alert">{totalDropPct.toFixed(0)}%</Em> in fourteen years.
                    </p>
                    <p>
                        Attica, home to Athens and Greece’s most populous region, lost{' '}
                        <Em tone="text-alert">{atticaDropPct.toFixed(0)}%</Em> of its births. {regionFacts.steepest.name} fell furthest
                        ({regionFacts.steepest.dropPct.toFixed(0)}%); even the best-held region, {regionFacts.mildest.name}, still
                        lost {regionFacts.mildest.dropPct.toFixed(0)}%.
                    </p>
                </>
            }
            aside={
                <div className="grid grid-cols-2 gap-4">
                    <Stat value={fmt(attica2008)} tone="text-ink" label="Attica births, 2008" sub="highest in the series" />
                    <Stat value={fmt(attica2022)} tone="text-alert" label="Attica births, 2022" sub="lowest in the series" />
                </div>
            }
            takeaway="Fewer babies, everywhere. And the babies who are not being born leave a mark on the age of the people who remain."
        >
            <Figure
                title="Births by region"
                subtitle="Drag the slider or press play. Click a region to explore it."
                caption="Colour shows births per year on a square-root scale so smaller regions stay distinguishable."
                actions={
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={togglePlay}
                            aria-label={playing ? 'Pause animation' : 'Play animation through the years'}
                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-accent transition-all hover:border-accent active:scale-95"
                        >
                            {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
                        </button>
                        <span className="min-w-[4.2rem] rounded-xl bg-accent px-3 py-1.5 text-center font-mono text-base font-medium leading-none text-on-accent" aria-live="polite">
                            {year}
                        </span>
                    </div>
                }
            >
                <Slider
                    value={year}
                    onChange={(v) => { setPlaying(false); setYear(v); }}
                    min={FIRST_YEAR}
                    max={LAST_YEAR}
                    label="Year"
                    className="mb-3"
                />

                <div ref={mapRef} className="relative mx-auto" style={{ maxWidth: MAP_WIDTH }}>
                    <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT + 90}`} className="h-auto w-full" role="img" aria-label={`Map of births by region in ${year}`}>
                        {shapes.map(r => {
                            const births = birthsIn(r.name);
                            return (
                                <path
                                    key={r.name}
                                    d={r.d}
                                    fillRule="evenodd"
                                    tabIndex={0}
                                    aria-label={`${r.name}: ${births ?? 'no data'} births in ${year}`}
                                    fill={births === undefined ? 'rgb(var(--surface-2))' : rampColor(ramp, scale(births))}
                                    stroke={r.name === selectedRegion ? 'rgb(var(--ink))' : 'rgb(var(--ink) / 0.45)'}
                                    strokeWidth={r.name === selectedRegion ? 2.5 : r.name === hovered ? 2 : 0.75}
                                    style={{ cursor: 'pointer', transition: 'fill 0.35s ease' }}
                                    onMouseEnter={() => setHovered(r.name)}
                                    onMouseMove={onMapMove}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(r.name)}
                                    onBlur={() => setHovered(null)}
                                    onClick={() => setSelectedRegion(r.name)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedRegion(r.name); } }}
                                />
                            );
                        })}

                        <g transform={`translate(${(MAP_WIDTH - LEGEND_WIDTH) / 2},${MAP_HEIGHT + 24})`}>
                            <defs>
                                <linearGradient id="births-legend" x1="0" x2="1" y1="0" y2="0">
                                    {[0, 0.25, 0.5, 0.75, 1].map(t => (
                                        <stop key={t} offset={`${t * 100}%`} stopColor={rampColor(ramp, t)} />
                                    ))}
                                </linearGradient>
                            </defs>
                            <rect width={LEGEND_WIDTH} height={10} rx={2} fill="url(#births-legend)" stroke="rgb(var(--ink) / 0.25)" strokeWidth="0.5" />
                            {legendTicks.map(tick => {
                                const x = scale(tick) * LEGEND_WIDTH;
                                return (
                                    <g key={tick} transform={`translate(${x},10)`}>
                                        <line y2={5} className="stroke-ink-3" />
                                        <text y={19} textAnchor="middle" className="fill-ink-3" fontSize="11">{fmt(tick)}</text>
                                    </g>
                                );
                            })}
                            <text x={LEGEND_WIDTH / 2} y={-6} textAnchor="middle" className="fill-ink-3" fontSize="11">Births per year</text>
                        </g>
                    </svg>

                    {hovered && (
                        <div
                            className="pointer-events-none absolute z-10 whitespace-nowrap rounded-xl border border-line bg-surface px-3 py-2 text-[13px] text-ink shadow-lg"
                            style={{ left: tooltip.x, top: tooltip.y }}
                        >
                            <span className="font-semibold">{hovered}</span>
                            <span className="text-ink-2">: {birthsIn(hovered) !== undefined ? fmt(birthsIn(hovered)) : 'N/A'}</span>
                        </div>
                    )}
                </div>
            </Figure>

            <Figure
                title={`${selectedRegion}: births per year`}
                subtitle={selectedChange !== null ? `${selectedChange.toFixed(0)}% between 2008 and 2022` : undefined}
                delay={80}
            >
                <ThemedChart chartType="LineChart" height="230px" data={regionData} options={regionOptions} />
                <p className="mt-3 flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-2 text-[12px] text-ink-2">
                    <HandPointerIcon className="shrink-0 text-accent" size={14} />
                    Click any region on the map above to see its own trend.
                </p>
            </Figure>
        </Chapter>
    );
}

export default GeoChartGreece;
