import React from 'react';
import { Link } from 'react-router-dom';
import { Stat } from '../Story';
import ScrollReveal from '../ScrollReveal';
import { ExternalLinkIcon } from '../Icons';
import { births, mothers, ageing, housing, fmt } from '../../story/facts';

export default function Epilogue() {
    return (
        <section id="epilogue" aria-labelledby="epilogue-title" className="scroll-mt-16 border-t border-line bg-band py-20 md:py-28">
            <div className="container-story">
                <ScrollReveal className="mx-auto max-w-3xl text-center">
                    <p className="eyebrow">Epilogue</p>
                    <h2 id="epilogue-title" className="mt-4 font-display text-[2.4rem] font-normal leading-[1.08] tracking-[-0.03em] text-ink md:text-[3.2rem]">
                        What it adds up to
                    </h2>
                    <p className="mt-6 text-[1.25rem] leading-relaxed text-ink-2">
                        No single factor explains it. Later motherhood, smaller families, longer lives and the cost of a home
                        all push in the same direction, and together they compound. The decline in births is not a headline.
                        It is arithmetic.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={100} className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
                    <Stat count={{ to: births.dropPct, decimals: 1, suffix: '%' }} tone="text-accent" label={`fewer births than in ${births.first.year}`} sub={`${fmt(births.first.births)} → ${fmt(births.last.births)} a year`} />
                    <Stat count={{ to: ageing.median2023, decimals: 1 }} tone="text-violet" label={`median age in ${ageing.lastYear}`} sub={`up from ${ageing.median1990.toFixed(1)} in ${ageing.firstYear}`} />
                    <Stat count={{ to: mothers.fertLast, decimals: 2 }} tone="text-alert" label={`children per woman, ${mothers.ageLastYear}`} sub={`${mothers.replacement} is needed to keep a population stable`} />
                    <Stat count={{ to: housing.yearsLast, decimals: 1 }} tone="text-gold" label={`years of average wages for an ${housing.sizeM2} m² home`} sub={`${housing.yearsFirst.toFixed(1)} years in ${housing.firstYear}`} />
                </ScrollReveal>

                <ScrollReveal delay={100} className="card mx-auto mt-14 max-w-4xl p-8 md:p-10">
                    <h3 className="font-display text-[1.8rem] font-normal text-ink">Want to know more?</h3>
                    <p className="prose-story mt-3 max-w-2xl">
                        There is a lot more to the story of Greece’s demographic problem. For the detailed research
                        behind it, read the full article and analysis, or see where our data comes from.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a className="btn btn-primary" target="_blank" rel="noreferrer"
                            href="https://gr.boell.org/el/2023/03/27/dimoskopisi-dimografiko-problima-stin-ellada-staseis-kai-antilipseis">
                            Read the article <ExternalLinkIcon />
                        </a>
                        <a className="btn btn-ghost" target="_blank" rel="noreferrer"
                            href="https://gr.boell.org/sites/default/files/2023-09/the-demographic-problem-in-greece_en_site-version.pdf">
                            Read the analysis (PDF) <ExternalLinkIcon />
                        </a>
                        <Link className="btn btn-ghost" to="/about">Sources &amp; tools</Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
