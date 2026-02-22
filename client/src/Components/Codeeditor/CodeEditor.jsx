import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import './CodeEditor.css'

const CodeEditor = ({ code, setCode }) => {
  const [languages, setLanguages] = useState([]);
  const [selectedLangData, setSelectedLangData] = useState(null);
  const [language, setLanguage] = useState("javascript");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [loadingLangs, setLoadingLangs] = useState(false);

  const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
  });

  useEffect(() => {
    const fetchLanguages = async () => {
      setLoadingLangs(true);
      try {
        const res = await API.get("/runtimes");

        const uniqueLangs = res.data.filter((value, index, self) =>
          index === self.findIndex((t) => t.language === value.language)
        );

        setLanguages(uniqueLangs);

        if (uniqueLangs.length > 0) {
          setSelectedLangData(uniqueLangs[0]);
          setLanguage(uniqueLangs[0].language);
        }

      } catch (err) {
        console.error("Failed to fetch languages", err);
      } finally {
        setLoadingLangs(false);
      }
    };

    fetchLanguages();
  }, []);


  const handleRun = async () => {
    if (!selectedLangData) return;

    setRunning(true);
    setOutput("");

    try {
      const res = await API.post("/execute", {
        language: selectedLangData.language,
        version: selectedLangData.version,
        files: [{ content: code }],
        stdin: input,
      });

      setOutput(
        res.data.run.output ||
          res.data.run.stderr ||
          "Code executed successfully."
      );
    } catch (err) {
      setOutput("Error executing code.");
      console.error(err);
    } finally {
      setRunning(false);
    }
  };


  const handleLanguageChange = (e) => {
    const langObj = JSON.parse(e.target.value);
    setSelectedLangData(langObj);
    setLanguage(langObj.language);
  };

  return (
    <>

      <div className="editor-header">
        <div className="left-section">
          <div className="select-list">
            <label>Language:</label>
            <select
              onChange={handleLanguageChange}
              value={
                selectedLangData
                  ? JSON.stringify(selectedLangData)
                  : ""
              }
            >
              {loadingLangs && <option>Loading...</option>}

              {languages.map((lang, index) => (
                <option
                  key={index}
                  value={JSON.stringify(lang)}
                >
                  {lang.language} ({lang.version})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="right-section">
          <button
            className="editor-button run-btn"
            onClick={handleRun}
            disabled={running || !selectedLangData}
          >
            {running ? "Running..." : "Run"}
          </button>

          <button
            className="editor-button submit-btn"
            disabled
          >
            Submit
          </button>
        </div>
      </div>

      <Editor
        height="60vh"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />

      <div className="execution-area">
        <div className="input-area">
          <h3>Input</h3>
          <textarea
            placeholder="Enter your input here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="output-area">
          <h3>Output</h3>
          {output ? (
            <pre>{output}</pre>
          ) : (
            <p>Run your code to see the output</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CodeEditor;