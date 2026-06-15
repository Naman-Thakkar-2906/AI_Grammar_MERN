import React from "react";
import { FaPencilAlt, FaSpellCheck, FaSyncAlt, FaArrowRight } from "react-icons/fa";
import ai from "../images/ai.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0b0a09] text-stone-200 selection:bg-amber-600/10">
      <main className="flex-grow">
        {/* Editorial Hero Section */}
        <section className="relative py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            <div className="md:w-1/2 text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-stone-900 border border-stone-800 text-stone-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                The Modern Manuscript Workspace
              </span>
              <h1 className="text-4xl md:text-5xl font-editorial-heading font-medium text-stone-100 leading-[1.18] tracking-tight">
                Write with clarity. <br />
                Edit with precision.
              </h1>
              <p className="text-stone-400 text-base leading-relaxed max-w-md font-light">
                An intelligent editor designed to work alongside you. Companion analyzes structure, clarifies tone, and refines vocabulary without getting in the way of your ideas.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/write"
                  className="bg-stone-100 hover:bg-white text-stone-950 px-5 py-2.5 rounded font-medium text-xs shadow-sm transition-all duration-150 flex items-center gap-2 group cursor-pointer"
                >
                  Open Workspace
                  <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="bg-transparent hover:bg-stone-900/40 text-stone-300 hover:text-stone-100 border border-stone-850 hover:border-stone-750 px-5 py-2.5 rounded font-medium text-xs transition-all duration-150 cursor-pointer"
                >
                  Read our Story
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center w-full">
              <div className="relative border border-stone-900 bg-[#12100f] p-3 rounded-lg max-w-sm md:max-w-md shadow-2xl">
                <img
                  style={{ width: "100%", height: "auto" }}
                  src={ai}
                  alt="Companion Writing Environment"
                  className="rounded object-cover filter brightness-[0.85] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09]/40 via-transparent to-transparent pointer-events-none rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Value Sections (Outcomes over Features) */}
        <section className="py-20 px-6 border-t border-stone-900/30 bg-[#0e0d0c]">
          <div className="max-w-4xl mx-auto space-y-24">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-2xl font-editorial-heading font-medium text-stone-100">
                A canvas built for the craft of writing.
              </h2>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Rather than treating editing as a technical diagnostic, Companion designs suggestions as active collaboration to elevate the standard of your work.
              </p>
            </div>

            {/* Outcome 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="md:w-1/2 space-y-4">
                <div className="w-8 h-8 rounded bg-amber-950/20 border border-amber-900/30 flex items-center justify-center text-amber-500 text-xs">
                  <FaPencilAlt />
                </div>
                <h3 className="text-lg font-editorial-heading font-medium text-stone-200">
                  Unblock expression, automatically
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">
                  Highlight sentences to prompt natural tone alterations, stylistic revisions, and structural variants. Get past awkward phrasing with flow suggestions that fit your natural voice.
                </p>
              </div>
              <div className="md:w-1/2 w-full p-6 rounded bg-[#12100f]/60 border border-stone-900/40 text-left space-y-3 font-serif-editor">
                <p className="text-xs text-stone-500 italic uppercase tracking-wider font-sans">Suggested Rephrase</p>
                <p className="text-stone-450 text-sm line-through decoration-rose-700/60 leading-relaxed">
                  We are trying to find ways to build a product that is simple to understand.
                </p>
                <p className="text-stone-200 text-sm leading-relaxed border-l-2 border-amber-600 pl-3 italic">
                  We aim to craft a simple, intuitive product experience.
                </p>
              </div>
            </div>

            {/* Outcome 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
              <div className="md:w-1/2 space-y-4">
                <div className="w-8 h-8 rounded bg-rose-950/20 border border-rose-900/30 flex items-center justify-center text-rose-500 text-xs">
                  <FaSpellCheck />
                </div>
                <h3 className="text-lg font-editorial-heading font-medium text-stone-200">
                  Contextual precision checks
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">
                  Traditional checkers verify words. Companion reads sentences. It catches structure typos, incorrect grammar placement, and formatting slips that other spell checkers miss.
                </p>
              </div>
              <div className="md:w-1/2 w-full p-6 rounded bg-[#12100f]/60 border border-stone-900/40 text-left space-y-3 font-sans">
                <p className="text-xs text-stone-500 italic uppercase tracking-wider">Grammar Insight</p>
                <div className="space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    <span>Original: "Their is no alternative path."</span>
                  </div>
                  <div className="flex items-center gap-2 border-t border-stone-900 pt-2 text-stone-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Corrected: "There is no alternative path."</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Footer Block */}
        <section className="py-20 px-6 text-center max-w-xl mx-auto space-y-6">
          <h2 className="text-2xl font-editorial-heading font-medium text-stone-100">
            Start writing with a partner.
          </h2>
          <p className="text-stone-400 text-sm font-light leading-relaxed">
            Access the minimal composition environment and begin polishing your drafts with dedicated context-aware editing assistants.
          </p>
          <div className="pt-2">
            <Link
              to="/write"
              className="inline-block bg-stone-100 hover:bg-white text-stone-950 px-6 py-2.5 rounded font-medium text-xs transition duration-150 cursor-pointer"
            >
              Enter Workspace
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
