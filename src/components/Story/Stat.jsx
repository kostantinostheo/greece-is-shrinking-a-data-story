import React from 'react';
import CountUp from './CountUp';

// `count` = props for <CountUp>; otherwise `value` is rendered as-is.
export default function Stat({ value, count, label, sub, tone = 'text-ink', className = '' }) {
    return (
        <div className={`card p-4 md:p-5 ${className}`}>
            <p className={`font-display text-[2rem] font-medium leading-none tracking-[-0.03em] tabular-nums md:text-[2.4rem] ${tone}`}>
                {count ? <CountUp {...count} /> : value}
            </p>
            <p className="mt-2.5 text-[13px] font-medium leading-snug text-ink">{label}</p>
            {sub && <p className="mt-0.5 text-xs leading-snug text-ink-3">{sub}</p>}
        </div>
    );
}

// Inline highlight for a key number inside running text.
export const Em = ({ tone = 'text-ink', children }) => (
    <strong className={`font-semibold ${tone}`}>{children}</strong>
);
