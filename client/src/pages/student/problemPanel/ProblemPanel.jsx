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

  const [leftWidth, setLeftWidth] = useState(40);
  const containerRef = useRef(null);


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

  const startResizing = (e) => {
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

 
  if (loading) return <div className="loading">Loading question...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!question) return null;

  return (
    <>
      <IDEheader />

      <div className="problem-ide-main" ref={containerRef}>
        <div
          className="left-panel"
          style={{ width: `${leftWidth}%` }}
        >
          <QuestionContent question={question} />
        </div>

        <div
          className="resizer"
          onMouseDown={startResizing}
        ></div>

        <div
          className="right-panel"
          style={{ width: `${100 - leftWidth}%` }}
        >
         

          <CodeEditor
            language={"javascript"}
            code="// write your code here..."
          />
        </div>
      </div>
    </>
  );
};

export default ProblemPanel;