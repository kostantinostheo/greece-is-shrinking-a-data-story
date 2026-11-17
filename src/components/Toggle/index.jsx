import React from 'react';

// Accessible on/off switch built from a <button role="switch">.
export default function Toggle({
    checked,
    onChange,
    onColor = 'rgb(var(--accent))',
    offColor = 'rgb(var(--ink-3))',
    checkedIcon,
    uncheckedIcon,
    label,
}) {
    const height = 22;
    const width = 44;
    const knob = height - 4;

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className="relative shrink-0 cursor-pointer rounded-full text-white transition-colors duration-200"
            style={{ width, height, background: checked ? onColor : offColor }}
        >
            <span
                className="absolute inset-y-0 left-0 flex items-center justify-center"
                style={{ width: width / 2, opacity: checked ? 1 : 0 }}
            >
                {checkedIcon}
            </span>
            <span
                className="absolute inset-y-0 right-0 flex items-center justify-center"
                style={{ width: width / 2, opacity: checked ? 0 : 1 }}
            >
                {uncheckedIcon}
            </span>
            <span
                className="absolute rounded-full bg-white shadow transition-[left] duration-200"
                style={{ top: 2, width: knob, height: knob, left: checked ? width - knob - 2 : 2 }}
            />
        </button>
    );
}
