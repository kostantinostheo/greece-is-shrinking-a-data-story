import React, { useState } from 'react';
import ThemedChart from '../../ThemedChart';
import Toggle from "../../Toggle";
import Slider from "../../Slider";
import { Figure, Stat } from "../../Story";
import { ChartLineIcon, ChartColumnIcon, EyeIcon, EyeSlashIcon, ArrowTrendUpIcon } from "../../Icons";
import { housing } from '../../../story/facts';

const ToggleControl = ({ label, checked, onChange, checkedIcon, uncheckedIcon }) => (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-[13px] text-ink-2">
        <Toggle onChange={onChange} checked={checked} checkedIcon={checkedIcon} uncheckedIcon={uncheckedIcon} label={label} />
        <span>{label}</span>
    </label>
);

export default function ChartHouse() {
    const [size, setSize] = useState(housing.sizeM2);
    const [isLineChart, setIsLineChart] = useState(false);
    const [showPrice, setShowPrice] = useState(true);
    const [showWage, setShowWage] = useState(true);
    const [showRent, setShowRent] = useState(true);

    // Hidden series are null (not 0) so they disappear instead of drawing a flat line along the axis.
    const chartData = [
        ['Year', `House price (${size} m², €)`, 'Average wage (€ per year)', `Rent (${size} m², € per year)`],
        ...housing.rows.map(r => [
            String(r[0]),
            showPrice ? r[1] * size : null,
            showWage ? r[2] : null,
            showRent ? r[3] * size * 12 : null,
        ]),
    ];

    const options = (t) => ({
        colors: [t.blue, t.orange, t.green],
        chartArea: { left: 72, right: 16, top: 48, bottom: 44 },
        seriesType: isLineChart ? 'line' : 'bars',
        lineWidth: 3,
        pointSize: isLineChart ? 4 : 0,
        bar: { groupWidth: '78%' },
        legend: { position: 'top', alignment: 'start' },
        hAxis: { showTextEvery: 3 },
        vAxis: { minValue: 0, format: 'short' },
    });

    const cards = [
        { label: 'House price', value: `×${housing.priceMultiple.toFixed(1)}`, sub: `up ${housing.priceRisePct.toFixed(0)}% from ${housing.firstYear}`, tone: 'text-accent' },
        { label: 'Rent', value: `×${housing.rentMultiple.toFixed(1)}`, sub: `up ${((housing.rentMultiple - 1) * 100).toFixed(0)}% from ${housing.firstYear}`, tone: 'text-ok' },
        { label: 'Average wage', value: `×${(1 + housing.wageRisePct / 100).toFixed(2)}`, sub: `up ${housing.wageRisePct.toFixed(0)}% from ${housing.firstYear}`, tone: 'text-alert' },
    ];

    return (
        <>
            <Figure
                title={`House price vs wage vs rent (${size} m²)`}
                subtitle={`${housing.firstYear}–${housing.lastYear}, euros`}
                caption="Rent is shown per year (monthly rent × 12). Turn series on and off to compare two at a time."
            >
                <ThemedChart chartType="ComboChart" height="380px" data={chartData} options={options} />
            </Figure>

            <div className="grid gap-6 md:grid-cols-2">
                <Figure title="House size" delay={60}>
                    <p className="font-display text-3xl font-normal text-ink">{size} m²</p>
                    <Slider value={size} onChange={setSize} min={20} max={200} bubble="hover" className="mt-7" label="House size in square metres" />
                    <div className="mt-1 flex justify-between text-[11px] text-ink-3"><span>20 m²</span><span>200 m²</span></div>
                </Figure>

                <Figure title="Display options" delay={120}>
                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                        <ToggleControl
                            label={isLineChart ? 'Line chart' : 'Bar chart'}
                            checked={isLineChart}
                            onChange={setIsLineChart}
                            checkedIcon={<ChartLineIcon size={12} />}
                            uncheckedIcon={<ChartColumnIcon size={12} />}
                        />
                        <ToggleControl label="Price" checked={showPrice} onChange={setShowPrice} checkedIcon={<EyeIcon size={12} />} uncheckedIcon={<EyeSlashIcon size={12} />} />
                        <ToggleControl label="Rent" checked={showRent} onChange={setShowRent} checkedIcon={<EyeIcon size={12} />} uncheckedIcon={<EyeSlashIcon size={12} />} />
                        <ToggleControl label="Wage" checked={showWage} onChange={setShowWage} checkedIcon={<EyeIcon size={12} />} uncheckedIcon={<EyeSlashIcon size={12} />} />
                    </div>
                </Figure>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {cards.map(c => (
                    <Stat
                        key={c.label}
                        value={<span className="inline-flex items-center gap-1.5">{c.value}<ArrowTrendUpIcon size={16} /></span>}
                        tone={c.tone}
                        label={c.label}
                        sub={c.sub}
                    />
                ))}
            </div>
        </>
    );
}
