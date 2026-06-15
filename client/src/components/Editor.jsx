import React, { useState } from "react";
import axios from "axios";
import { FaSpellCheck, FaSyncAlt, FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";
import { usePrivy } from "@privy-io/react-auth";

const API_BASE = "https://ai-grammar-mern.onrender.com";

const Editor = () => {
  const { getAccessToken } = usePrivy();
  const [text, setText] = useState("");
  const [selectedSentence, setSelectedSentence] = useState("");
  const [rephrasedSentences, setRephrasedSentences] = useState([]);
  const [correctedSentences, setCorrectedSentences] = useState([]);
  const [spellCheckedText, setSpellCheckedText] = useState("");
  const [grammarCheckedText, setGrammarCheckedText] = useState("");
  const [loading, setLoading] = useState({
    spell: false,
    grammar: false,
    rephrase: false,
  });
  const [error, setError] = useState("");

  const authHeader = async () => {
    try {
      const token = await getAccessToken?.();
      return token ? { Authorization: `Bearer ${token}` } : {};
    } catch {
      return {};
    }
  };

  const handleTextChange = (e) => setText(e.target.value);

  const handleSentenceSelection = () => {
    const selection = window.getSelection().toString();
    if (selection) setSelectedSentence(selection);
  };

  const checkSpelling = async () => {
    if (!text.trim()) return setError("Please enter some text first.");
    setError("");
    setLoading((l) => ({ ...l, spell: true }));
    try {
      const headers = await authHeader();
      const response = await axios.post(
        `${API_BASE}/api/spellcheck`,
        { text },
        { headers },
      );
      setSpellCheckedText(response.data.correctedText || "");
    } catch (err) {
      console.error("Error checking spelling:", err);
      setError(
        err?.response?.data?.error ||
          "Spell check failed. Is the server running on port 5000?",
      );
    } finally {
      setLoading((l) => ({ ...l, spell: false }));
    }
  };

  const checkGrammar = async () => {
    if (!text.trim()) return setError("Please enter some text first.");
    setError("");
    setLoading((l) => ({ ...l, grammar: true }));
    try {
      const headers = await authHeader();
      const response = await axios.post(
        `${API_BASE}/api/grammarcheck`,
        { text },
        { headers },
      );
      setGrammarCheckedText(response.data.correctedText || "");
    } catch (err) {
      console.error("Error checking grammar:", err);
      setError(
        err?.response?.data?.error ||
          "Grammar check failed. Is the server running on port 5000?",
      );
    } finally {
      setLoading((l) => ({ ...l, grammar: false }));
    }
  };

  const rephraseSentence = async () => {
    if (!selectedSentence) return;
    setError("");
    setLoading((l) => ({ ...l, rephrase: true }));
    try {
      const headers = await authHeader();
      const response = await axios.post(
        `${API_BASE}/api/analyze`,
        { sentence: selectedSentence },
        { headers },
      );
      setRephrasedSentences(response.data.rephrasedSentences || []);
    } catch (err) {
      console.error("Error rephrasing sentence:", err);
      setError(err?.response?.data?.error || "Rephrase failed.");
    } finally {
      setLoading((l) => ({ ...l, rephrase: false }));
    }
  };

  const addCorrectedSentence = (sentence) => {
    if (!sentence) return;
    setCorrectedSentences([...correctedSentences, sentence]);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)] bg-[#0b0a09] text-stone-250 selection:bg-amber-600/20">
      {/* Left Workspace Panel - Center-styled Composition Sheet */}
      <div className="lg:w-[65%] p-6 md:p-10 lg:p-12 flex flex-col justify-between border-r border-stone-900/40 h-auto lg:h-[calc(100vh-60px)] overflow-y-auto bg-[#0b0a09]">
        <div className="flex flex-col flex-grow max-w-2xl w-full mx-auto">
          <div className="flex justify-between items-center border-b border-stone-900/30 pb-4 mb-8">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 font-sans">
                Manuscript Canvas
              </span>
              <p className="text-stone-500 text-[11px] font-light mt-0.5">
                Highlight any sentence to prompt inline suggestions.
              </p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-stone-500 font-light font-sans">
              <span>{wordCount} words</span>
              <span className="w-1 h-1 rounded-full bg-stone-850"></span>
              <span>{charCount} characters</span>
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={handleTextChange}
            onMouseUp={handleSentenceSelection}
            placeholder="Start typing your manuscript here..."
            className="w-full flex-grow bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-stone-700 resize-none font-serif-editor text-base md:text-lg leading-[2.0] text-stone-100 min-h-[350px]"
          />
        </div>

        {/* Action bar aligned with writing canvas */}
        <div className="max-w-2xl w-full mx-auto flex flex-col sm:flex-row justify-between sm:items-center border-t border-stone-900/30 pt-6 mt-8 gap-4">
          <div className="flex-grow max-w-sm">
            {error && (
              <div className="text-rose-450 bg-rose-950/15 border border-rose-900/30 rounded px-3.5 py-2 text-[10px] leading-relaxed font-sans">
                {error}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={checkSpelling}
              disabled={loading.spell}
              className="bg-stone-100 hover:bg-white text-stone-950 px-4 py-2 rounded font-medium text-xs transition duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              <FaSpellCheck className="text-[11px]" />
              {loading.spell ? "Polishing..." : "Check Spelling"}
            </button>
            <button
              onClick={checkGrammar}
              disabled={loading.grammar}
              className="bg-transparent border border-stone-800 hover:bg-stone-900 hover:border-stone-700 text-stone-200 px-4 py-2 rounded font-medium text-xs transition duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              <SiGrammarly className="text-[11px] text-amber-600/70" />
              {loading.grammar ? "Reviewing..." : "Analyze Grammar"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Assistant Panel - Styled like editorial margins comments */}
      <div className="lg:w-[35%] bg-[#12100f] p-6 lg:p-8 h-auto lg:h-[calc(100vh-60px)] overflow-y-auto space-y-6">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 font-sans">
            Editorial Margin
          </h2>
          <p className="text-stone-550 text-[11px] font-light mt-0.5">
            Collaborate with the AI writing assistant here.
          </p>
        </div>

        {/* Selected Sentence / Rephrase inline annotation tool */}
        {selectedSentence && (
          <div className="suggestion-card p-5 rounded space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-semibold tracking-wider text-amber-500 uppercase flex items-center gap-1.5 font-sans">
                <FaPencilAlt className="text-[9px]" />
                Selected Passage
              </span>
              <button 
                onClick={() => setSelectedSentence("")}
                className="text-stone-600 hover:text-stone-400 p-0.5 cursor-pointer transition-colors"
              >
                <FaTimes className="text-[9px]" />
              </button>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed italic border-l border-amber-600/40 pl-3 font-serif-editor">
              "{selectedSentence}"
            </p>
            <button
              onClick={rephraseSentence}
              disabled={loading.rephrase}
              className="bg-stone-900 border border-stone-850 hover:bg-stone-800 text-stone-200 px-3 py-1.5 rounded font-medium text-[10px] transition duration-150 flex items-center gap-1.5 cursor-pointer"
            >
              <FaSyncAlt className="text-[8px] animate-spin-slow" />
              {loading.rephrase ? "Rewriting..." : "Suggest Rephrasing"}
            </button>
          </div>
        )}

        {/* Rephrased output suggestions */}
        {rephrasedSentences.length > 0 && (
          <div className="suggestion-card p-5 rounded space-y-4">
            <h3 className="text-[10px] font-semibold tracking-wider text-amber-500 uppercase flex items-center gap-1.5 font-sans">
              <FaSyncAlt className="text-[9px]" />
              Suggested Alternatives
            </h3>
            <div className="space-y-4 pt-1 font-serif-editor">
              {rephrasedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-stone-900/60 last:border-b-0 last:pb-0 space-y-2.5"
                >
                  <p className="text-stone-300 text-xs leading-relaxed">
                    {sentence}
                  </p>
                  <button
                    onClick={() => addCorrectedSentence(sentence)}
                    className="bg-stone-900 border border-stone-850 hover:bg-stone-800 text-stone-250 px-2.5 py-1 rounded font-medium text-[9px] transition duration-150 flex items-center gap-1 cursor-pointer font-sans"
                  >
                    <FaCheck className="text-[8px] text-amber-500" />
                    Apply suggest
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spell Check & Grammar Check stream modules */}
        <ResultSection
          title="Spelling Suggestion"
          text={spellCheckedText}
          onAccept={() => addCorrectedSentence(spellCheckedText)}
          icon={<FaSpellCheck />}
          isSpelling={true}
        />
        <ResultSection
          title="Grammar Review"
          text={grammarCheckedText}
          onAccept={() => addCorrectedSentence(grammarCheckedText)}
          icon={<SiGrammarly />}
          isSpelling={false}
        />

        {/* Workspace approved revisions log */}
        <div className="border border-stone-900 bg-[#0e0d0c]/60 p-5 rounded space-y-3">
          <h3 className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase flex items-center gap-1.5 font-sans">
            <FaCheck className="text-stone-600 text-[9px]" />
            Accepted Changes log
          </h3>
          {correctedSentences.length > 0 ? (
            <div className="space-y-3 pt-1 font-serif-editor">
              {correctedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="pb-3 border-b border-stone-900/40 last:border-b-0 text-stone-350 text-xs leading-relaxed"
                >
                  {sentence}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-600 italic text-[11px] font-light font-sans">
              No changes accepted yet in this session.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ResultSection = ({ title, text, onAccept, icon, isSpelling }) =>
  text ? (
    <div className={`${isSpelling ? "suggestion-card-spelling" : "suggestion-card"} p-5 rounded space-y-4`}>
      <h3 className={`text-[10px] font-semibold tracking-wider ${isSpelling ? "text-rose-500" : "text-amber-500"} uppercase flex items-center gap-1.5 font-sans`}>
        <span className="text-[11px]">{icon}</span>
        {title}
      </h3>
      <p className="text-stone-300 text-xs leading-relaxed bg-stone-950/40 border border-stone-900/50 p-4 rounded whitespace-pre-wrap font-serif-editor">
        {text}
      </p>
      <button
        onClick={onAccept}
        className="bg-stone-900 border border-stone-850 hover:bg-stone-800 text-stone-250 px-3 py-1.5 rounded font-medium text-[10px] transition duration-150 flex items-center gap-1.5 cursor-pointer font-sans"
      >
        <FaCheck className={`text-[8px] ${isSpelling ? "text-rose-500" : "text-amber-500"}`} />
        Accept suggestion
      </button>
    </div>
  ) : null;

export default Editor;
