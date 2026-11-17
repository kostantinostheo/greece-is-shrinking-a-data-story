import React from 'react';
import './index.css';

const THUMB = 44;

// Native <input type="range"> slider. Pass a number for a single thumb or [low, high] for a range.
// onChange receives the new value (number or [low, high]), not the event.
// bubble: 'always' | 'hover' | undefined, controls the floating value label.
export default function Slider({
    value,
    onChange,
    min,
    max,
    step = 1,
    marks,
    bubble,
    color = 'rgb(var(--accent))',
    bubbleColor = 'rgb(var(--accent))',
    label,
    className = '',
    style,
}) {
    const isRange = Array.isArray(value);
    const [lo, hi] = isRange ? value : [min, value];
    const pct = (v) => ((v - min) / (max - min)) * 100;
    // Centre of the thumb, compensating for the thumb width the browser reserves (--thumb in index.css).
    const pos = (v) => `calc(${pct(v)}% + ${(0.5 - pct(v) / 100) * THUMB}px)`;

    const classes = ['slider', isRange && 'slider--range', bubble && `slider--bubble-${bubble}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} style={{ '--slider-color': color, '--slider-bubble': bubbleColor, ...style }}>
            <div className="slider__control">
                <div className="slider__track" />
                <div className="slider__fill" style={{ left: pos(lo), width: `calc(${pos(hi)} - ${pos(lo)})` }} />

                {isRange ? (
                    <>
                        <input
                            type="range"
                            className="slider__input"
                            style={{ zIndex: lo >= max - step ? 2 : 1 }}
                            min={min}
                            max={max}
                            step={step}
                            value={lo}
                            aria-label={label ? `${label} (from)` : 'Range start'}
                            onChange={(e) => onChange([Math.min(Number(e.target.value), hi), hi])}
                        />
                        <input
                            type="range"
                            className="slider__input"
                            min={min}
                            max={max}
                            step={step}
                            value={hi}
                            aria-label={label ? `${label} (to)` : 'Range end'}
                            onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo)])}
                        />
                    </>
                ) : (
                    <input
                        type="range"
                        className="slider__input"
                        min={min}
                        max={max}
                        step={step}
                        value={hi}
                        aria-label={label || 'Value'}
                        onChange={(e) => onChange(Number(e.target.value))}
                    />
                )}

                {bubble && (
                    <>
                        {isRange && <span className="slider__bubble" style={{ left: pos(lo) }}>{lo}</span>}
                        <span className="slider__bubble" style={{ left: pos(hi) }}>{hi}</span>
                    </>
                )}
            </div>

            {marks && (
                <div className="slider__marks">
                    {marks.map((m) => (
                        <span key={m.value} className="slider__mark" style={{ left: pos(m.value) }}>
                            {m.label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
