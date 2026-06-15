import React, { useState } from "react";
import axios from "axios";
import { FaSpellCheck, FaSyncAlt, FaCheck, FaPencilAlt } from "react-icons/fa";
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

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              AI Writing Assistant
            </h2>
            <p className="mb-4 text-gray-600">
              Enhance your writing with our advanced AI tools.
            </p>
            <textarea
              value={text}
              onChange={handleTextChange}
              onMouseUp={handleSentenceSelection}
              placeholder="Type your text here..."
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {error && (
              <div className="mt-3 text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">
                {error}
              </div>
            )}
            <div className="flex justify-end mt-4 space-x-4">
              <Button
                onClick={checkSpelling}
                icon={<FaSpellCheck />}
                disabled={loading.spell}
              >
                {loading.spell ? "Checking..." : "Check Spelling"}
              </Button>
              <Button
                onClick={checkGrammar}
                icon={<SiGrammarly />}
                disabled={loading.grammar}
              >
                {loading.grammar ? "Checking..." : "Check Grammar"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResultSection
              title="Spell Checked Text"
              text={spellCheckedText}
              onAccept={() => addCorrectedSentence(spellCheckedText)}
              icon={<FaSpellCheck className="text-green-500" />}
            />
            <ResultSection
              title="Grammar Checked Text"
              text={grammarCheckedText}
              onAccept={() => addCorrectedSentence(grammarCheckedText)}
              icon={<SiGrammarly className="text-blue-500" />}
            />
          </div>

          {selectedSentence && (
            <div className="bg-white shadow-lg rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaPencilAlt className="mr-2 text-purple-500" />
                Selected Sentence:
              </h3>
              <p className="mb-4">{selectedSentence}</p>
              <Button
                onClick={rephraseSentence}
                icon={<FaSyncAlt />}
                disabled={loading.rephrase}
              >
                {loading.rephrase ? "Rephrasing..." : "Rephrase"}
              </Button>
            </div>
          )}

          {rephrasedSentences.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaSyncAlt className="mr-2 text-indigo-500" />
                Rephrased Sentences:
              </h3>
              {rephrasedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <p className="mb-2">{sentence}</p>
                  <Button
                    onClick={() => addCorrectedSentence(sentence)}
                    icon={<FaCheck />}
                  >
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaCheck className="mr-2 text-green-500" />
              Corrected Sentences
            </h3>
            <p className="mb-4 text-gray-600">
              Your approved corrections will appear here.
            </p>
            {correctedSentences.length > 0 ? (
              correctedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="mb-2 pb-2 border-b border-gray-200 last:border-b-0"
                >
                  <p>{sentence}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No corrected sentences yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({ onClick, children, icon, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);

const ResultSection = ({ title, text, onAccept, icon }) =>
  text ? (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <p className="mb-4 whitespace-pre-wrap">{text}</p>
      <Button onClick={onAccept} icon={<FaCheck />}>
        Accept
      </Button>
    </div>
  ) : null;

export default Editor;
