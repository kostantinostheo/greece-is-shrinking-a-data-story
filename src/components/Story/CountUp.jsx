import React, { useEffect, useRef, useState } from 'react';

const format = (n, decimals) =>
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Counts from 0 to `to` the first time it scrolls into view. Screen readers get the final value immediately.
export default function CountUp({ to, decimals = 0, duration = 1400, prefix = '', suffix = '' }) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(to);
            return;
        }
        let raf;
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                setValue(to * (1 - Math.pow(1 - p, 3)));
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        });
        io.observe(el);
        return () => { io.disconnect(); cancelAnimationFrame(raf); };
    }, [to, duration]);

    return (
        <span ref={ref}>
            <span className="sr-only">{prefix}{format(to, decimals)}{suffix}</span>
            <span aria-hidden="true">{prefix}{format(value, decimals)}{suffix}</span>
        </span>
    );
}
