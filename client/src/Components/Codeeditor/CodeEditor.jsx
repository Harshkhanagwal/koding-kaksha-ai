import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./CodeEditor.css";

const CodeEditor = ({
    code,
    setCode,
    language,
    setLanguage,
    onSubmit,
    running,             
    isSubmitted,
    setIsSubmitted,
    setVerdict
}) => {

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false); // run loading

    const languages = [
        { label: "JavaScript", value: "javascript" },
        { label: "Python", value: "python" },
        { label: "Java", value: "java" },
        { label: "C++", value: "cpp" }
    ];

    const handleRun = async () => {
        if (!code.trim()) return;

        setIsRunning(true);
        setOutput("");

        try {
            const response = await axios.post(
                "https://code-runner.p.rapidapi.com/run_code",
                {
                    code,
                    language,
                    input
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
                        "x-rapidapi-host": "code-runner.p.rapidapi.com"
                    }
                }
            );

            if (response.data.output) {
                setOutput(response.data.output);
            } else if (response.data.stderr) {
                setOutput("❌ Error:\n" + response.data.stderr);
            } else {
                setOutput("No Output");
            }

        } catch (error) {
            console.error(error);
            setOutput("❌ API Error or Rate Limit Exceeded");
        } finally {
            setIsRunning(false);
        }
    };


    useEffect(() => {
        if (isSubmitted) {
            setIsSubmitted(false);
        }
    }, [code]);

    return (
        <>

            <div className="editor-header">
                <div className="left-section">
                    <div className="select-list">
                        <label>Language:</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            {languages.map((lang, index) => (
                                <option key={index} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="right-section">
                    <button
                        className="editor-button run-btn"
                        onClick={() => {
                            handleRun()
                             setIsSubmitted(false);
                                setVerdict(null);
                        }}
                        disabled={isRunning}
                    >
                        {isRunning ? "Running..." : "Run"}
                    </button>

                    <button
                        className="editor-button submit-btn"
                        onClick={onSubmit}
                        disabled={running}
                    >
                        {running ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>

            {/* MONACO EDITOR */}
            <Editor
                height="60vh"
                language={language === "cpp" ? "cpp" : language}
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
            />

            {/* INPUT / OUTPUT SECTION */}
            {isSubmitted ? (
                <div className="submission-closed">
                    <div className="submission-header">
                        <span>Submission Mode</span>
                        <button
                            className="close-btn"
                            onClick={() => {
                                setIsSubmitted(false);
                                setVerdict(null);
                            }}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            ) : (
                <div className="execution-area">
                    <div className="input-area">
                        <h3>Custom Input</h3>
                        <textarea
                            placeholder="Enter your input here"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="output-area">
                        <h3>Output</h3>
                        {output ? <pre>{output}</pre> : <p>Run your code</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default CodeEditor;