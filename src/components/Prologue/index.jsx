import React from 'react';
import { PullQuote, Em } from '../Story';
import ScrollReveal from '../ScrollReveal';

export default function Prologue() {
    return (
        <section id="prologue" aria-labelledby="prologue-title" className="scroll-mt-16 border-t border-line bg-band py-20 md:py-28">
            <div className="container-story">
                <ScrollReveal className="mx-auto max-w-3xl">
                    <p className="eyebrow">Prologue</p>
                    <h2 id="prologue-title" className="mt-4 font-display text-[2.4rem] font-normal leading-[1.08] tracking-[-0.03em] text-ink md:text-[3rem]">
                        Two posts. One big claim.
                    </h2>
                    <div className="prose-story mt-6">
                        <p>
                            In mid-April 2024, two posts on X put Greece in front of millions of readers. Both said the
                            same thing in different words: Greece was heading for a <Em>“population collapse”</Em>.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-2">
                    <ScrollReveal>
                        <div className="card h-full p-6 md:p-8">
                            <PullQuote cite="Luther Cyrus (@Censored4sure), 14 April 2024" href="https://x.com/Censored4sure/status/1779568987963081031">
                                Greece is predicted to become the first nation to suffer “population collapse” as sudden and unexpected deaths
                                continue soaring across the nation while fertility rates have plunged to levels lower than experts previously thought possible…
                            </PullQuote>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={120}>
                        <div className="card h-full p-6 md:p-8">
                            <PullQuote cite="Elon Musk (@elonmusk), 15 April 2024" href="https://x.com/elonmusk/status/1779844281781322004">
                                Greece is one of dozens of countries experiencing population collapse due to low birth rates.
                            </PullQuote>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal className="mx-auto mt-10 max-w-3xl">
                    <div className="prose-story">
                        <p>
                            Strong words deserve a strong check. So we went to official statistics, from ELSTAT, Eurostat, the World Bank and the OECD among others (the full list is under About). The data we use can’t speak to causes of death, but it can show how many people are born, where,
                            to whom, and under what conditions.
                        </p>
                        <p>
                            Over eight short chapters we follow the numbers from the headline to the kitchen table:
                            <Em> births</Em>, <Em>regions</Em>, <Em>age</Em>, <Em>family size</Em>, <Em>motherhood</Em>,
                            <Em> choice</Em>, <Em>housing</Em> and <Em>the economy</Em>.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
