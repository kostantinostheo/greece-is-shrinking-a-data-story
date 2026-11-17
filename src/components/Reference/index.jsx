import React from 'react';
import { ReactIcon, GoogleIcon, TailwindIcon } from '../Icons';

const references = [
    {
        title: "Hellenic Statistical Authority (ELSTAT)",
        url: "https://www.statistics.gr/en/home/",
        description: "The Hellenic Statistical Authority (ELSTAT) is the national statistical service of Greece, responsible for collecting, analyzing, and publishing statistical data on the economy, population, and society of Greece. Their data is essential for informed decision-making in both public and private sectors."
    },
    {
        title: "Eurostat",
        url: "https://ec.europa.eu/eurostat/web/main/home",
        description: "Eurostat is the statistical office of the European Union situated in Luxembourg. Its mission is to provide high-quality statistical information to the institutions of the European Union, enabling comparisons between countries and regions. Eurostat's data is crucial for analyzing and monitoring the economic and social policies within the EU."
    },
    {
        title: "World Bank",
        url: "https://www.worldbank.org/en/home",
        description: "The World Bank is an international financial institution that provides loans and grants to the governments of low and middle-income countries for the purpose of pursuing capital projects. The World Bank's data and reports are vital resources for understanding global economic trends, development challenges, and progress in poverty reduction."
    },
    {
        title: "Johnston's Archive",
        url: "https://www.johnstonsarchive.net/policy/abortion/ab-greece.html",
        description: "Johnston's Archive is an extensive online repository of data and statistics on various topics, including public policy, demographics, and historical records. The page on abortion in Greece provides detailed statistical information and analysis, offering valuable insights into trends and policies related to abortion in Greece."
    },
    {
        title: "OECD Data",
        url: "https://data.oecd.org/greece.htm",
        description: "OECD Data provides a comprehensive collection of statistical information and analysis from the Organisation for Economic Co-operation and Development (OECD). The Greece section includes key indicators on economy, society, education, health, and the environment, offering valuable insights for policy-making and research."
    }
];

const tools = [
    { name: 'React', Icon: ReactIcon },
    { name: 'Tailwind CSS', Icon: TailwindIcon },
    { name: 'Google Charts', Icon: GoogleIcon },
];

const ReferencesPage = () => (
    <section className="container-story py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
            <p className="eyebrow">Under the hood</p>
            <h1 className="mt-3 font-display text-[2.6rem] font-normal leading-tight tracking-[-0.03em] text-ink md:text-[3.2rem]">Sources &amp; tools</h1>

            <h2 className="mt-14 font-display text-[1.8rem] font-normal text-ink">Tools</h2>
            <ul className="mt-5 flex flex-wrap gap-4">
                {tools.map(({ name, Icon }) => (
                    <li key={name} className="card flex items-center gap-3 px-4 py-3">
                        <Icon size={26} className="text-accent" />
                        <span className="text-sm font-medium text-ink">{name}</span>
                    </li>
                ))}
            </ul>

            <h2 className="mt-14 font-display text-[1.8rem] font-normal text-ink">References</h2>
            <ul className="mt-5 space-y-4">
                {references.map((ref) => (
                    <li key={ref.url} className="card p-5 transition-colors duration-200 hover:border-accent md:p-6">
                        <a
                            href={ref.url}
                            className="font-display text-xl font-normal text-accent underline-offset-4 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {ref.title}
                        </a>
                        <p className="prose-story mt-2 text-[15px]">{ref.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default ReferencesPage;
