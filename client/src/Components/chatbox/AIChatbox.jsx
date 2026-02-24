import React, { useEffect, useRef } from "react";
import "./AIChatbox.css";
import { IoIosSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";

const AIChatbox = ({
  response,
  question,
  setQuestion,
  loading,
  explainCode,
}) => {
  const chatRef = useRef(null);

  // Auto scroll to bottom when response updates
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [response, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    explainCode();
  };

  return (
    <div className="ai-chatbox">
      
      {/* Chat Area */}
      <div className="chat-area" ref={chatRef}>
        {loading ? (
          <div className="chat-loader">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Input Section */}
      <form className="chat-input-section" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your doubt..."
        />
        <button type="submit" className="send-btn">
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default AIChatbox;