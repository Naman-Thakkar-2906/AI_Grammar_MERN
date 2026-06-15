import React from "react";
import { FaPencilAlt, FaMagic, FaRobot, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0b0a09] text-stone-200 py-20 md:py-28 px-6 selection:bg-amber-600/10">
      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* Story Header */}
        <div className="space-y-4">
          <Link to="/" className="text-xs text-amber-600/80 hover:text-amber-500 font-medium transition duration-150">
            ← Companion Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-editorial-heading font-medium text-stone-100 tracking-tight">
            Our Story & Philosophy
          </h1>
          <p className="text-stone-400 text-base leading-relaxed font-light">
            Why we are reimagining the relationship between writer and editor.
          </p>
        </div>

        {/* Narrative Flow Block */}
        <div className="border-t border-b border-stone-900/40 py-10 space-y-6 text-stone-300 font-serif-editor text-base md:text-lg leading-[1.8] font-light">
          <p>
            Writing is not a production line. It is a process of refinement, clarity, and articulation. Yet, modern editing tools treat text like syntax errors in code, filling the page with red squiggly lines and distracting diagnostics.
          </p>
          <p>
            Companion was built with a different belief: that writing tools should support your focus, not interrupt it. We designed a calm, digital writing sheet that keeps distraction to a minimum while offering sophisticated editing feedback right when you need it.
          </p>
          <p>
            Our core models are context-aware, aiming to improve the natural flow, tone, and structural balance of your manuscript. From simple structural edits to full paragraph rephrases, Companion collaborates with you to make your voice shine.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <h2 className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
            Designed for the craft
          </h2>

          <div className="space-y-8">
            <PrincipleRow
              icon={<FaPencilAlt className="text-amber-600/70" />}
              title="Grammar Harmony"
              description="Instead of mechanical adjustments, our models analyze readable prose patterns to propose stylistic modifications that enhance structural balance."
            />
            <PrincipleRow
              icon={<FaMagic className="text-amber-600/70" />}
              title="Sensory Spell Check"
              description="Companion scans structural contexts to capture typing slips, homonym mistakes, and structural errors that traditional dictionary lookups overlook."
            />
            <PrincipleRow
              icon={<FaRobot className="text-amber-600/70" />}
              title="Collaboration Over Control"
              description="Rephrasing models offer stylistic directions based on your tone goals, allowing you to select and commit changes naturally."
            />
            <PrincipleRow
              icon={<FaChartLine className="text-amber-600/70" />}
              title="Analytical Clarity"
              description="Analyze tone weight and clarity scores without interrupting composition. Get metrics on flow density whenever you request workspace reviews."
            />
          </div>
        </div>

        {/* Final CTA panel */}
        <div className="border border-stone-900 bg-[#12100f] p-8 md:p-10 rounded-lg text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-editorial-heading font-medium text-stone-200">
            Write on a clean canvas
          </h3>
          <p className="text-stone-400 text-xs max-w-md mx-auto leading-relaxed font-light">
            Access the clean, dark composition suite, highlight sentences, and begin refining your articles or essays.
          </p>
          <div className="pt-2">
            <Link
              to="/write"
              className="inline-block bg-stone-100 hover:bg-white text-stone-950 px-5 py-2.5 rounded font-medium text-xs transition duration-150 cursor-pointer"
            >
              Start Writing Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

const PrincipleRow = ({ icon, title, description }) => (
  <div className="flex gap-4 items-start border-l border-stone-850 pl-4">
    <div className="mt-1 flex-shrink-0 text-sm">{icon}</div>
    <div className="space-y-1">
      <h4 className="text-xs font-semibold text-stone-200">{title}</h4>
      <p className="text-stone-400 text-xs leading-relaxed font-light">{description}</p>
    </div>
  </div>
);

export default About;
