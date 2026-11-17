import React from 'react';
import ScrollReveal from '../ScrollReveal';
import { getChapter, getNextChapter } from './story';

/**
 * One chapter of the story.
 * Left: the narrative (number, title, lead) stays in view while the figures scroll past on the right
 * (on screens tall enough to hold it). Key stats lead the right-hand column. A closing line hands the
 * reader over to the next chapter.
 */
export default function Chapter({ id, kicker, lead, aside, children, takeaway, tone = 'page' }) {
    const meta = getChapter(id);
    const next = getNextChapter(id) || { id: 'epilogue', title: 'What it adds up to' };

    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className={`scroll-mt-16 border-t border-line py-16 md:py-24 ${tone === 'band' ? 'bg-band' : 'bg-page'}`}
        >
            <div className="container-story grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                    <ScrollReveal className="chapter-sticky">
                        <p className="eyebrow flex items-center gap-3">
                            <span className="font-mono text-[1.05rem] font-medium normal-case leading-none tracking-normal text-accent">
                                {meta.number}
                            </span>
                            <span className="h-px w-8 bg-line" aria-hidden="true" />
                            {kicker}
                        </p>
                        <h2
                            id={`${id}-title`}
                            className="mt-4 font-display text-[2.4rem] font-normal leading-[1.08] tracking-[-0.03em] text-ink md:text-[3rem]"
                        >
                            {meta.title}
                        </h2>
                        <div className="prose-story mt-6">{lead}</div>
                    </ScrollReveal>
                </div>

                <div className="min-w-0 space-y-6 lg:col-span-7">
                    {aside && <ScrollReveal delay={120}>{aside}</ScrollReveal>}
                    {children}
                </div>
            </div>

            {takeaway && (
                <ScrollReveal className="container-story mt-14 md:mt-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="font-display text-[1.5rem] font-normal leading-snug text-ink md:text-[1.9rem]">{takeaway}</p>
                        <a
                            href={`#${next.id}`}
                            className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                        >
                            Next: {next.title}
                            <span aria-hidden="true" className="bob inline-block">↓</span>
                        </a>
                    </div>
                </ScrollReveal>
            )}
        </section>
    );
}
