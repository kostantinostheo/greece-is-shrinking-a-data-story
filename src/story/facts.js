// Every number quoted in the narrative is derived here from the datasets, so the copy cannot drift from the charts.
import birthsDeathsData from '../resources/datasets/births-deaths-greece.json';
import regionalCsv from '../resources/datasets/birth_rates_greece.csv?raw';
import ageGroupsData from '../resources/datasets/age-groups-greece.json';
import medianAgeData from '../resources/datasets/median-age-greece.json';
import lifeData from '../resources/datasets/life-expectancy-greece.json';
import motherAgeData from '../resources/datasets/mother-age-greece.json';
import fertilityData from '../resources/datasets/fertility-rate-greece.json';
import over40Data from '../resources/datasets/mothers-over-40-greece.json';
import abortionData from '../resources/datasets/abortions-greece.json';
import housingData from '../resources/datasets/housing-greece.json';
import metricsData from '../resources/datasets/births-metrics-greece.json';

export const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = (from, to) => (to / from - 1) * 100;
const body = (table) => table.slice(1);
const firstOf = (a) => a[0];
const lastOf = (a) => a[a.length - 1];

// ── 1. Births and deaths ──
const bd = body(birthsDeathsData).map(([year, births, deaths]) => ({ year: +year, births, deaths }));
let sustainedFrom = lastOf(bd).year;
for (let i = bd.length - 1; i >= 0 && bd[i].deaths > bd[i].births; i--) sustainedFrom = bd[i].year;

export const births = {
    rows: bd,
    first: firstOf(bd),
    last: lastOf(bd),
    dropPct: -pct(firstOf(bd).births, lastOf(bd).births),
    deathsRisePct: pct(firstOf(bd).deaths, lastOf(bd).deaths),
    naturalDecrease: lastOf(bd).deaths - lastOf(bd).births,
    sustainedFrom,
    yearsDeathsAhead: bd.filter(r => r.deaths > r.births).length,
};

// ── 2. Regions ──
const regional = {};
body(regionalCsv.trim().split(/\r?\n/).map(l => l.split(','))).forEach(([region, rate, year]) => {
    (regional[region] ||= {})[+year] = +rate;
});
const totalIn = (year) => Object.values(regional).reduce((s, r) => s + r[year], 0);
const regionChange = Object.fromEntries(Object.entries(regional).map(([k, v]) => [k, pct(v[2008], v[2022])]));
const sortedRegions = Object.entries(regionChange).sort((a, b) => a[1] - b[1]);

export const regions = {
    count: Object.keys(regional).length,
    total2008: totalIn(2008),
    total2022: totalIn(2022),
    totalDropPct: -pct(totalIn(2008), totalIn(2022)),
    allDown: Object.values(regionChange).every(v => v < 0),
    attica2008: regional.Attica[2008],
    attica2022: regional.Attica[2022],
    atticaDropPct: -regionChange.Attica,
    steepest: { name: sortedRegions[0][0], dropPct: -sortedRegions[0][1] },
    mildest: { name: lastOf(sortedRegions)[0], dropPct: -lastOf(sortedRegions)[1] },
};

// ── 3. Ageing ──
const ageYears = Object.keys(ageGroupsData);
const share = (year, from, to) => ageGroupsData[year].slice(from, to).reduce((s, v) => s + v, 0);
const ma = body(medianAgeData);
export const ageing = {
    median1990: firstOf(ma)[1],
    median2023: lastOf(ma)[1],
    medianRise: lastOf(ma)[1] - firstOf(ma)[1],
    under40_1990: share(ageYears[0], 0, 2),
    under40_2023: share(lastOf(ageYears), 0, 2),
    over60_1990: share(ageYears[0], 3),
    over60_2023: share(lastOf(ageYears), 3),
    over80_1990: ageGroupsData[ageYears[0]][4],
    over80_2023: ageGroupsData[lastOf(ageYears)][4],
    youth1990: ageGroupsData[ageYears[0]][0],
    youth2023: ageGroupsData[lastOf(ageYears)][0],
    firstYear: +ageYears[0],
    lastYear: +lastOf(ageYears),
};

// ── 4. Family ──
const life = body(lifeData);
const peakLife = life.reduce((m, r) => (r[1] > m[1] ? r : m));
export const family = {
    lifeFirst: firstOf(life)[1],
    lifeLast: lastOf(life)[1],
    lifePeak: peakLife[1],
    lifePeakPeriod: peakLife[0],
    householdFirst: firstOf(life)[2],
    householdLast: lastOf(life)[2],
    firstPeriod: firstOf(life)[0],
    lastPeriod: lastOf(life)[0],
};

// ── 5. Motherhood ──
const ma1 = body(motherAgeData), fr = body(fertilityData), o40 = body(over40Data);
const peakFert = fr.reduce((m, r) => (r[1] > m[1] ? r : m));
const peakO40 = o40.reduce((m, r) => (r[1] > m[1] ? r : m));
export const mothers = {
    ageFirst: firstOf(ma1)[1], ageLast: lastOf(ma1)[1], ageFirstYear: firstOf(ma1)[0], ageLastYear: lastOf(ma1)[0],
    fertFirst: firstOf(fr)[1], fertLast: lastOf(fr)[1], fertPeak: peakFert[1], fertPeakYear: peakFert[0],
    replacement: 2.1,
    over40First: firstOf(o40)[1], over40FirstYear: firstOf(o40)[0],
    over40Last: lastOf(o40)[1], over40LastYear: lastOf(o40)[0],
    over40Peak: peakO40[1], over40PeakYear: peakO40[0],
    over40Multiple: lastOf(o40)[1] / firstOf(o40)[1],
};

// ── 6. Abortions ──
const ab = body(abortionData);
const peakAb = ab.reduce((m, r) => (r[1] > m[1] ? r : m));
export const abortions = {
    first: firstOf(ab), last: lastOf(ab), peakYear: peakAb[0], peak: peakAb[1],
};

// ── 7. Housing (€/m², € per year, rent €/m²/month) ──
export const housing = {
    sizeM2: 80,
    rows: housingData,
    firstYear: firstOf(housingData)[0],
    lastYear: lastOf(housingData)[0],
    priceMultiple: lastOf(housingData)[1] / firstOf(housingData)[1],
    wageRisePct: pct(firstOf(housingData)[2], lastOf(housingData)[2]),
    rentMultiple: lastOf(housingData)[3] / firstOf(housingData)[3],
    priceRisePct: pct(firstOf(housingData)[1], lastOf(housingData)[1]),
    yearsOfWages: (row) => (row[1] * 80) / row[2],
    rentShare: (row) => ((row[3] * 80 * 12) / row[2]) * 100,
};
housing.yearsFirst = housing.yearsOfWages(firstOf(housingData));
housing.yearsLast = housing.yearsOfWages(lastOf(housingData));
housing.rentShareFirst = housing.rentShare(firstOf(housingData));
housing.rentShareLast = housing.rentShare(lastOf(housingData));

// ── 8. Wider economy: Pearson correlation of each metric with annual births ──
const pearson = (pairs) => {
    const n = pairs.length;
    const mx = pairs.reduce((s, p) => s + p[0], 0) / n;
    const my = pairs.reduce((s, p) => s + p[1], 0) / n;
    const cov = pairs.reduce((s, [a, b]) => s + (a - mx) * (b - my), 0);
    const vx = pairs.reduce((s, [a]) => s + (a - mx) ** 2, 0);
    const vy = pairs.reduce((s, [, b]) => s + (b - my) ** 2, 0);
    return cov / Math.sqrt(vx * vy);
};
const metricColumns = { 'GDP Per Capita': 3, 'Unemployment Rate %': 5, 'Emigration': 7, 'Inflation Rate %': 9 };
export const economy = {
    firstYear: +metricsData[1][0],
    lastYear: +lastOf(metricsData)[0],
    // Emigration has no data before 1998 (stored as 0), so it is only compared from then on.
    correlation: Object.fromEntries(Object.entries(metricColumns).map(([name, col]) => {
        const rows = body(metricsData).filter(r => name !== 'Emigration' || +r[0] >= 1998);
        return [name, pearson(rows.map(r => [r[1], r[col]]))];
    })),
};
export const regionalByYear = regional;
