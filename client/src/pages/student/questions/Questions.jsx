import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import "./Questions.css";
import Loader from "../../../Components/Loader/Loader";

const Questions = () => {
  const navigate = useNavigate();
  // 🔹 Get role from Redux
  const { role } = useSelector((state) => state.auth);

  const canManage =
    role === "admin" || role === "lecturer" || role === "superAdmin";

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const topics = [
    "All",
    "Array",
    "Searching",
    "Sorting",
    "Stack",
    "Dynamic Programming",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axiosInstance.get("/questions/all");
        setQuestions(data.data);
      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true)
      await axiosInstance.delete(`/questions/delete/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      alert("Failed to delete question");
    }finally{
      setLoading(false)
    }
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesTopic =
        selectedTopic === "All" || q.topic === selectedTopic;

      const matchesDifficulty =
        selectedDifficulty === "All" ||
        q.difficulty === selectedDifficulty;

      const matchesSearch = q.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesTopic && matchesDifficulty && matchesSearch;
    });
  }, [questions, search, selectedTopic, selectedDifficulty]);

  if(loading) return <Loader/>
  return (
    <div className="questions-page">
      <div className="page-header">
        <h1>Questions</h1>
      </div>

      <div className="topic-ribbon">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`topic-pill ${selectedTopic === topic ? "active" : ""
              }`}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="filter-ribbon">
        <div className="select-box">
          <span>Difficulty : </span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
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
        {loading ? (
          <p className="no-data">Loading questions...</p>
        ) : error ? (
          <p className="no-data">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Tags</th>
                {canManage && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td
                    colSpan={canManage ? "4" : "3"}
                    className="no-data"
                  >
                    No questions found
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => (
                  <tr key={q._id}>
                    <td>
                      <Link to={`/question/${q._id}`} className="question-link">
                        {q.title}
                      </Link>
                    </td>

                    <td>
                      <p
                        className={`difficulty ${q.difficulty.toLowerCase()}`}
                      >
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

                    {canManage && (
                      <td className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/dashboard/edit-question/${q._id}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(q._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Questions;
