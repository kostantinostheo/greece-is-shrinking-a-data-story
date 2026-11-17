import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { SunIcon, MoonIcon } from '../Icons';

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';
    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Light theme' : 'Dark theme'}
            className="flex h-11 w-11 active:scale-95 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
            {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
    );
}
