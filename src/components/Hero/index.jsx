import React from 'react';
import { Stat } from '../Story';
import { births, fmt } from '../../story/facts';

const { rows, first, last, dropPct: birthsDropPct, naturalDecrease, sustainedFrom } = births;

// ── hero chart geometry ──
const W = 640, H = 400;
const M = { top: 28, right: 112, bottom: 40, left: 12 };
const Y_MAX = 160000;
const x = (year) => M.left + ((year - first.year) / (last.year - first.year)) * (W - M.left - M.right);
const y = (v) => M.top + (1 - v / Y_MAX) * (H - M.top - M.bottom);
const line = (key) => rows.map((r, i) => `${i ? 'L' : 'M'}${x(r.year).toFixed(1)},${y(r[key]).toFixed(1)}`).join('');

function BirthsDeathsSketch() {
    const description =
        `Line chart, ${first.year} to ${last.year}. Annual births fall from ${fmt(first.births)} to ${fmt(last.births)}; ` +
        `annual deaths rise from ${fmt(first.deaths)} to ${fmt(last.deaths)}. Deaths have exceeded births every year since ${sustainedFrom}.`;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={description} className="h-auto w-full">
            {[0, 50000, 100000, 150000].map(v => (
                <g key={v}>
                    <line x1={M.left} x2={W - M.right} y1={y(v)} y2={y(v)} className="stroke-line" strokeWidth="1" />
                    <text x={M.left} y={y(v) - 6} className="fill-ink-3" fontSize="11">{v === 0 ? '0' : `${v / 1000}k`}</text>
                </g>
            ))}
            {[first.year, 1990, 2000, 2010, last.year].map(yr => (
                <text key={yr} x={x(yr)} y={H - 12} textAnchor="middle" className="fill-ink-3" fontSize="11">{yr}</text>
            ))}

            <line x1={x(sustainedFrom)} x2={x(sustainedFrom)} y1={M.top} y2={H - M.bottom} className="fade-in stroke-ink-3" strokeDasharray="3 4" />
            <text x={x(sustainedFrom) - 8} y={M.top + 4} textAnchor="end" className="fade-in fill-ink-2" fontSize="11" fontWeight="600">
                {sustainedFrom}: deaths outnumber
            </text>
            <text x={x(sustainedFrom) - 8} y={M.top + 18} textAnchor="end" className="fade-in fill-ink-2" fontSize="11" fontWeight="600">
                births, every year since
            </text>

            <path d={line('deaths')} pathLength="1" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                className="draw-line draw-line--late" style={{ stroke: 'rgb(var(--s-orange))' }} />
            <path d={line('births')} pathLength="1" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                className="draw-line" style={{ stroke: 'rgb(var(--s-blue))' }} />

            <g className="fade-in">
                <circle cx={x(first.year)} cy={y(first.births)} r="4.5" style={{ fill: 'rgb(var(--s-blue))' }} />
                <text x={x(first.year) + 10} y={y(first.births) - 10} className="fill-ink" fontSize="12" fontWeight="600">
                    Births {fmt(first.births)}
                </text>
                <circle cx={x(last.year)} cy={y(last.births)} r="4.5" style={{ fill: 'rgb(var(--s-blue))' }} />
                <text x={x(last.year) + 10} y={y(last.births) + 4} className="fill-ink" fontSize="12" fontWeight="600">
                    Births
                </text>
                <text x={x(last.year) + 10} y={y(last.births) + 19} className="fill-ink-2" fontSize="12">{fmt(last.births)}</text>

                <circle cx={x(last.year)} cy={y(last.deaths)} r="4.5" style={{ fill: 'rgb(var(--s-orange))' }} />
                <text x={x(last.year) + 10} y={y(last.deaths) + 4} className="fill-ink" fontSize="12" fontWeight="600">
                    Deaths
                </text>
                <text x={x(last.year) + 10} y={y(last.deaths) + 19} className="fill-ink-2" fontSize="12">{fmt(last.deaths)}</text>
            </g>
        </svg>
    );
}

export default function Hero() {
    return (
        <header id="hero" className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-page py-16 md:py-20">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(60% 60% at 85% 20%, rgb(var(--accent) / 0.12), transparent 70%)' }}
            />
            <div className="container-story relative grid items-center gap-12 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <p className="eyebrow">A data story · Greece, {first.year}–{last.year}</p>
                    <h1 className="mt-5 font-display text-[3.4rem] font-normal leading-[0.98] tracking-[-0.045em] text-ink sm:text-[4.6rem] lg:text-[5.6rem]">
                        Greece is <span className="text-accent">shrinking.</span>
                    </h1>
                    <p className="mt-7 max-w-xl text-[1.25rem] leading-relaxed text-ink-2 md:text-[1.4rem]">
                        In {first.year}, <strong className="font-semibold text-ink">{fmt(first.births)}</strong> babies were born in Greece.
                        In {last.year}, just <strong className="font-semibold text-ink">{fmt(last.births)}</strong>.
                        This is the story of what happened in between, and what it means.
                    </p>

                    <div className="mt-9 grid max-w-xl grid-cols-2 gap-4">
                        <Stat
                            count={{ to: birthsDropPct, decimals: 1, suffix: '%' }}
                            tone="text-accent"
                            label={`fewer births than in ${first.year}`}
                        />
                        <Stat
                            count={{ to: naturalDecrease }}
                            tone="text-alert"
                            label={`more deaths than births in ${last.year}`}
                            sub="the population shrinks on its own"
                        />
                    </div>

                    <a href="#prologue" className="btn btn-primary mt-10">
                        Follow the story <span aria-hidden="true" className="bob inline-block">↓</span>
                    </a>
                </div>

                <div className="lg:col-span-6">
                    <div className="card p-4 md:p-6">
                        <p className="eyebrow mb-3">Annual births and deaths</p>
                        <BirthsDeathsSketch />
                    </div>
                </div>
            </div>
        </header>
    );
}
