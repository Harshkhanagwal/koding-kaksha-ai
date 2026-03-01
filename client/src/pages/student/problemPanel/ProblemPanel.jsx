import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import IDEheader from "../../../Components/IDEheader/IDEheader";
import QuestionContent from "../../../Components/questionContent/QuestionContent";
import CodeEditor from "../../../Components/Codeeditor/CodeEditor";
import "./ProblemPanel.css";

const ProblemPanel = () => {
    const { id } = useParams();


    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [code, setCode] = useState(
       id ?  "// Write your code here..." : localStorage.getItem("savedCode") || "// Write your code here..." 
    );
    const [language, setLanguage] = useState("javascript");

   
    const [verdict, setVerdict] = useState(null);
    const [running, setRunning] = useState(false);

   
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("savedCode", code);
        }, 300);
        return () => clearTimeout(timeout);
    }, [code]);


    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const { data } = await axiosInstance.get(`/questions/details/${id}`);
                setQuestion(data.data);
            } catch (err) {
                setError("Failed to load question");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

  
    const handleSubmit = async () => {
        if (!code.trim()) return;

        setRunning(true);
        setVerdict(null);
        setIsSubmitted(true);   // 👈 Important

        try {
            const res = await axiosInstance.post("/questions/demo-compile", {
                id,
                code,
                language
            });

            setVerdict(res.data);

        } catch (err) {
            setVerdict({
                success: false,
                message: "Server Error"
            });
        } finally {
            setRunning(false);
        }
    };

 
    const [leftWidth, setLeftWidth] = useState(40);
    const containerRef = useRef(null);

    const startResizing = () => {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;

        const onMouseMove = (moveEvent) => {
            const newLeftWidth =
                ((moveEvent.clientX - container.getBoundingClientRect().left) /
                    containerWidth) * 100;

            if (newLeftWidth > 20 && newLeftWidth < 80) {
                setLeftWidth(newLeftWidth);
            }
        };

        const stopResizing = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", stopResizing);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", stopResizing);
    };

    if (loading) return <div className="loading">Loading question...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!question) return null;

    return (
        <>
            <IDEheader />

            <div className="problem-ide-main" ref={containerRef}>

                <div className="left-panel" style={{ width: `${leftWidth}%` }}>
                    <QuestionContent question={question} />
                </div>

                <div className="resizer" onMouseDown={startResizing}></div>

                <div className="right-panel" style={{ width: `${100 - leftWidth}%` }}>

                    <CodeEditor
                        code={code}
                        setCode={setCode}
                        language={language}
                        setLanguage={setLanguage}
                        onSubmit={handleSubmit}
                        running={running}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                        setVerdict={setVerdict}
                    />
                    <div className="result-area">
                        {running && (
                            <div className="result-card running-card">
                                <div className="result-title">Running Testcases...</div>
                            </div>
                        )}

                        {verdict && (
                            <div
                                className={`result-card ${verdict.success && verdict.allPassed
                                        ? "accepted"
                                        : verdict.success
                                            ? "wrong"
                                            : "error"
                                    }`}
                            >
                                <div className="result-title">
                                    {verdict.success ? (
                                        verdict.allPassed ? (
                                            "Accepted"
                                        ) : (
                                            "Wrong Answer"
                                        )
                                    ) : (
                                        verdict.message
                                    )}
                                </div>

                                {verdict.success && verdict.results && (
                                    <div className="testcase-row">
                                        {verdict.results.map((r, i) => (
                                            <div
                                                key={i}
                                                className={`testcase-chip ${r.passed ? "chip-pass" : "chip-fail"
                                                    }`}
                                            >
                                                Case {r.case}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemPanel;