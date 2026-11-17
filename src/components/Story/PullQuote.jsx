import React from 'react';

export default function PullQuote({ children, cite, href, className = '' }) {
    return (
        <blockquote className={`m-0 border-l-[3px] border-accent pl-5 ${className}`}>
            <p className="font-display text-[1.3rem] leading-snug tracking-[-0.01em] text-ink">{children}</p>
            {cite && (
                <footer className="mt-3 text-[13px] text-ink-3">
                    {href ? (
                        <a href={href} target="_blank" rel="noreferrer" className="font-medium text-accent underline-offset-4 hover:underline">
                            {cite}
                        </a>
                    ) : cite}
                </footer>
            )}
        </blockquote>
    );
}
