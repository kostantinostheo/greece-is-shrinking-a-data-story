import React from "react";

function Video() {
  return (
    <section className="container-story py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">Demo</p>
        <h1 className="mt-3 font-display text-[2.6rem] font-normal leading-tight tracking-[-0.03em] text-ink md:text-[3.2rem]">Watch the walkthrough</h1>
        <p className="prose-story mt-4 max-w-2xl">A short video tour of the project.</p>
        <div className="card mt-8 aspect-video overflow-hidden">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/0ZyxnmdLHcI"
            title="VizGenius demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default Video;
