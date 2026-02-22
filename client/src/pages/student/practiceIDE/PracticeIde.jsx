import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import IDEheader from "../../../Components/IDEheader/IDEheader";
import CodeEditor from "../../../Components/Codeeditor/CodeEditor";
import AIChatbox from "../../../Components/chatbox/AIChatbox";

const PracticeIdle = () => {
  const { id } = useParams();

  const [code, setCode] = useState(
    localStorage.getItem("savedCode") || "// Write your code here..."
  );


  const [chatResponse, setChatResponse] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const [leftWidth, setLeftWidth] = useState(70);
  const containerRef = useRef(null);

  const startResizing = () => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

    const onMouseMove = (moveEvent) => {
      const newLeftWidth =
        ((moveEvent.clientX - container.getBoundingClientRect().left) /
          containerWidth) *
        100;

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

  const explainCode = async () => {
    if (!userQuestion.trim() && !code) return;

    setIsLoading(true);
    setChatResponse("");
    setUserQuestion("");

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Instructions:
You are a friendly programming mentor.
Do not provide full solutions.
Give hints and explain logic clearly.

User Question: ${
                    userQuestion ? userQuestion : "Explain this code"
                  }

Code:
${code}
                  `,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setChatResponse(
          "Quota exceeded. Please wait before trying again."
        );
        return;
      }

      if (data.candidates && data.candidates.length > 0) {
        const aiText =
          data.candidates[0].content.parts[0].text;
        setChatResponse(aiText);
      } else {
        setChatResponse("AI could not generate a response.");
      }
    } catch (error) {
      console.error(error);
      setChatResponse("Error connecting to AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IDEheader />

      <div className="problem-ide-main" ref={containerRef}>
        
        <div
          className="left-panel"
          style={{ width: `${leftWidth}%` }}
        >
          <CodeEditor
            code={code}
            setCode={setCode}
          />
        </div>

        <div
          className="resizer"
          onMouseDown={startResizing}
        ></div>

        <div
          className="right-panel"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <AIChatbox
            response={chatResponse}
            question={userQuestion}
            setQuestion={setUserQuestion}
            loading={isLoading}
            explainCode={explainCode}
          />
        </div>
      </div>
    </>
  );
};

export default PracticeIdle;