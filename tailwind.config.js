const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: token('page'),
        band: token('band'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        ink: token('ink'),
        'ink-2': token('ink-2'),
        'ink-3': token('ink-3'),
        line: token('line'),
        accent: token('accent'),
        'on-accent': token('on-accent'),
        alert: token('alert'),
        gold: token('gold'),
        ok: token('ok'),
        violet: token('violet'),
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
