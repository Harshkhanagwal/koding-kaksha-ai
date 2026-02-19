import React, { useState, useMemo } from "react";
import "./Questions.css";

const mockQuestions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "HashMap"],
    topic: "Arrays",
  },
  {
    id: 2,
    title: "Binary Search",
    difficulty: "Medium",
    tags: ["Binary Search"],
    topic: "Searching",
  },
  {
    id: 3,
    title: "Merge Intervals",
    difficulty: "Hard",
    tags: ["Sorting", "Intervals"],
    topic: "Sorting",
  },
];

const Questions = () => {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");

  const topics = ["All", "Arrays", "Searching", "Sorting"];

  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter((q) => {
      const matchesTopic =
        selectedTopic === "All" || q.topic === selectedTopic;

      const matchesSearch = q.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesTopic && matchesSearch;
    });
  }, [search, selectedTopic]);

  return (
    <div className="questions-page">
      <div className="page-header">
        <h1>Questions</h1>
      </div>

      <div className="topic-ribbon">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`topic-pill ${
              selectedTopic === topic ? "active" : ""
            }`}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="filter-ribbon">
    
        <div className="select-box">
            
            <>Difficulty : </>
            <select>
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>

        <div className="searchbar-area">
            <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuestions.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">
                  No questions found
                </td>
              </tr>
            ) : (
              filteredQuestions.map((q) => (
                <tr key={q.id}>
                  <td>{q.title}</td>
                  <td >
                    <p className={`difficulty ${q.difficulty.toLowerCase()}`}>
                        {q.difficulty}
                    </p> 
                  </td>
                  <td>
                    {q.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Questions;
