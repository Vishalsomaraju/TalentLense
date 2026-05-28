import React from "react";

export default function Home() {
  return (
    <main className="hero-shell">
      <div className="hero-grid-mask" aria-hidden="true" />
      <section className="hero max-w-[1240px] mx-auto min-h-[calc(100vh-152px)] pt-[104px] px-6 grid md:grid-cols-[1.55fr_1fr] gap-10 items-center">
        {/* Home content will go here */}
        <h1 className="text-5xl font-light">Predict who will succeed.</h1>
      </section>
    </main>
  );
}
