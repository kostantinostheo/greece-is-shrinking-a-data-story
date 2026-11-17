import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'vg-theme';
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Fallback used when there is no DOM (tests, server render). Mirrors the light theme in index.css.
const LIGHT_TOKENS = {
    page: '#FBFAF7', surface: '#FFFFFF', ink: '#14181F', ink2: '#3D4552', ink3: '#5E6675', line: '#E2DDD3',
    accent: '#1E5FC2', alert: '#C2410C', gold: '#A16207',
    blue: '#2A78D6', orange: '#EB6834', green: '#008300', violet: '#6250D6', magenta: '#E87BA4', red: '#E34948',
};

const toHex = (triplet) =>
    '#' + triplet.trim().split(/\s+/).map(n => Number(n).toString(16).padStart(2, '0')).join('').toUpperCase();

// Google Charts cannot read CSS variables, so resolve them to hex once per theme change.
function readTokens() {
    const cs = getComputedStyle(document.documentElement);
    const v = (name) => toHex(cs.getPropertyValue(`--${name}`));
    return {
        page: v('page'), surface: v('surface'), ink: v('ink'), ink2: v('ink-2'), ink3: v('ink-3'), line: v('line'),
        accent: v('accent'), alert: v('alert'), gold: v('gold'),
        blue: v('s-blue'), orange: v('s-orange'), green: v('s-green'),
        violet: v('s-violet'), magenta: v('s-magenta'), red: v('s-red'),
    };
}

const ThemeContext = createContext({ theme: 'light', tokens: LIGHT_TOKENS, toggle: () => {}, setTheme: () => {} });

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() =>
        typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    );
    const [tokens, setTokens] = useState(() => (typeof document === 'undefined' ? LIGHT_TOKENS : readTokens()));

    const setTheme = useCallback((next) => {
        setThemeState(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }
    }, []);

    const toggle = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

    useIsoLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        const next = readTokens();
        setTokens(next);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next.page);
    }, [theme]);

    // Follow the OS setting until the visitor makes an explicit choice.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e) => {
            let saved = null;
            try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
            if (!saved) setThemeState(e.matches ? 'dark' : 'light');
        };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const value = useMemo(() => ({ theme, tokens, toggle, setTheme }), [theme, tokens, toggle, setTheme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
