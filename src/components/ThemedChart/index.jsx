import React, { useMemo } from 'react';
import { Chart } from 'react-google-charts';
import { useTheme } from '../../theme/ThemeContext';

const isPlainObject = (v) => v && typeof v === 'object' && !Array.isArray(v);

const merge = (base, extra) => {
    const out = { ...base };
    Object.keys(extra || {}).forEach((key) => {
        out[key] = isPlainObject(base?.[key]) && isPlainObject(extra[key]) ? merge(base[key], extra[key]) : extra[key];
    });
    return out;
};

// Theme-aware defaults shared by every chart: ink, grid and axis colours follow the active theme.
const baseOptions = (t) => ({
    fontName: 'Figtree',
    fontSize: 12,
    backgroundColor: { fill: 'transparent' },
    titleTextStyle: { color: t.ink, fontSize: 13, bold: true },
    legend: { textStyle: { color: t.ink2 } },
    hAxis: {
        textStyle: { color: t.ink3 },
        titleTextStyle: { color: t.ink3, italic: false },
        gridlines: { color: 'transparent' },
        baselineColor: t.line,
    },
    vAxis: {
        textStyle: { color: t.ink3 },
        titleTextStyle: { color: t.ink3, italic: false },
        gridlines: { color: t.line },
        minorGridlines: { color: 'transparent' },
        baselineColor: t.line,
    },
    tooltip: { textStyle: { color: '#14181F' } },
    // Deliberately no `animation` option: animation.startup breaks line/bar/column charts
    // ("Cannot read properties of undefined (reading 'Do')") in current Google Charts builds.
});

/**
 * Drop-in replacement for react-google-charts' <Chart>.
 * `options` is either an object or a function receiving the theme tokens, e.g. (t) => ({ colors: [t.blue] }).
 */
export default function ThemedChart({ options, ...props }) {
    const { tokens } = useTheme();
    const merged = useMemo(
        () => merge(baseOptions(tokens), typeof options === 'function' ? options(tokens) : options),
        [tokens, options]
    );

    return (
        <Chart
            width="100%"
            loader={<div className="flex h-24 items-center justify-center text-sm text-ink-3">Loading chart…</div>}
            {...props}
            options={merged}
        />
    );
}
