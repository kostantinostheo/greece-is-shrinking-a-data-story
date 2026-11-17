import React, { useEffect, useState } from 'react';
import { CHAPTERS } from '../Story/story';

const MARKERS = ['hero', 'prologue', ...CHAPTERS.map(c => c.id), 'epilogue'];

// Fixed chapter rail (desktop) / current-chapter pill (mobile) that tracks where you are in the story.
export default function ChapterNav() {
    const [active, setActive] = useState(null);

    useEffect(() => {
        const els = MARKERS.map(id => document.getElementById(id)).filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) setActive(CHAPTERS.some(c => c.id === e.target.id) ? e.target.id : null);
            }),
            { rootMargin: '-45% 0px -50% 0px' }
        );
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);

    const current = CHAPTERS.find(c => c.id === active);

    return (
        <>
            <nav
                aria-label="Story chapters"
                className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-1 xl:flex"
            >
                {CHAPTERS.map(c => {
                    const isActive = c.id === active;
                    return (
                        <a
                            key={c.id}
                            href={`#${c.id}`}
                            aria-current={isActive ? 'true' : undefined}
                            className="group flex min-h-[44px] items-center gap-3"
                        >
                            <span
                                className={`rounded-xl border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink shadow-sm transition-opacity ${
                                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                                }`}
                            >
                                {c.number} · {c.title}
                            </span>
                            <span
                                className={`block rounded-full transition-all duration-300 ${
                                    isActive ? 'h-3 w-3 bg-accent' : 'h-2 w-2 bg-ink-3/40 group-hover:bg-ink-3'
                                }`}
                            />
                        </a>
                    );
                })}
            </nav>

            {current && (
                <div
                    aria-hidden="true"
                    className="fixed bottom-5 left-4 z-30 rounded-full border border-line bg-surface/95 px-3.5 py-1.5 text-xs font-medium text-ink-2 shadow-md backdrop-blur xl:hidden"
                >
                    <span className="font-semibold text-accent">{current.number}</span> · {current.title}
                </div>
            )}
        </>
    );
}
