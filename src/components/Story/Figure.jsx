import React from 'react';
import ScrollReveal from '../ScrollReveal';

// A chart "plate": title, optional subtitle/actions, the chart itself, then caption and source.
export default function Figure({ title, subtitle, actions, caption, source, children, className = '', delay = 0 }) {
    return (
        <ScrollReveal delay={delay}>
            <figure className={`card m-0 p-4 md:p-6 ${className}`}>
                {(title || actions) && (
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                            {title && <h3 className="text-[15px] font-semibold leading-snug text-ink">{title}</h3>}
                            {subtitle && <p className="mt-0.5 text-[13px] text-ink-3">{subtitle}</p>}
                        </div>
                        {actions}
                    </div>
                )}
                {children}
                {(caption || source) && (
                    <figcaption className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-ink-3">
                        {caption}
                        {caption && source && ' '}
                        {source && <span className="whitespace-nowrap">Source: {source}.</span>}
                    </figcaption>
                )}
            </figure>
        </ScrollReveal>
    );
}
