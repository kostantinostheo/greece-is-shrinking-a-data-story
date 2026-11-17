import React, { useState } from "react"

const members = [
    {
        name: "Smaragda Reppa",
        role: "Software Development",
        initials: "SR",
        img: "https://media.licdn.com/dms/image/D4D03AQEpKNPcChZmRw/profile-displayphoto-shrink_200_200/0/1665389845681?e=2147483647&v=beta&t=tb_ecuhYJ_tY_19TWhabg2vpnRD_34aQZLdK0DbeV-c",
        color: "from-violet-600 to-indigo-500",
    },
    {
        name: "Konstantinos Theofilis",
        role: "Software Development",
        initials: "KT",
        img: "https://media.licdn.com/dms/image/C4D03AQE_a6HV67g5tw/profile-displayphoto-shrink_400_400/0/1626858276297?e=1724889600&v=beta&t=ubr8yrcajhPB6osCigEWoyTpeSM4tFgVK1EmEWSMRMY",
        color: "from-blue-600 to-cyan-500",
    },
    {
        name: "George Ganias",
        role: "Software Development",
        initials: "GG",
        img: "https://media.licdn.com/dms/image/D4D03AQEQ7TZQQywJUw/profile-displayphoto-shrink_800_800/0/1713005351596?e=1724889600&v=beta&t=YSMxkaU1YSo1AYpmy5M1pQgm_SKKshlOGGLFzno5zIw",
        color: "from-emerald-600 to-teal-500",
    },
];

function MemberCard({ member }) {
    const [imgFailed, setImgFailed] = useState(false);
    return (
        <article className="card flex w-64 flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent">
            {!imgFailed ? (
                <img
                    alt={`Portrait of ${member.name}`}
                    src={member.img}
                    className="h-56 w-full object-cover object-top"
                    onError={() => setImgFailed(true)}
                />
            ) : (
                <div className={`flex h-56 w-full items-center justify-center bg-gradient-to-br ${member.color}`} role="img" aria-label={`${member.name} initials`}>
                    <span className="font-display text-5xl font-normal text-white/90">{member.initials}</span>
                </div>
            )}
            <div className="flex flex-1 flex-col justify-center p-5 text-center">
                <h2 className="font-display text-xl font-normal text-ink">{member.name}</h2>
                <p className="mt-1 text-sm text-accent">{member.role}</p>
            </div>
        </article>
    );
}

export default function Team() {
    return (
        <section className="container-story py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">The people behind it</p>
                <h1 className="mt-3 font-display text-[2.6rem] font-normal leading-tight tracking-[-0.03em] text-ink md:text-[3.2rem]">Meet the team</h1>
                <p className="prose-story mt-4">Built for the Data Visualization course (M126).</p>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8">
                {members.map((m) => <MemberCard key={m.name} member={m} />)}
            </div>
        </section>
    );
}
