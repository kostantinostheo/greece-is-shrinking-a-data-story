import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function ScrollReveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
    const ref = useScrollReveal();

    return (
        <Tag
            ref={ref}
            className={`reveal-section ${className}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </Tag>
    );
}
