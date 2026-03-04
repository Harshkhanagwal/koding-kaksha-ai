import React, { useRef, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import "./CreateQuestions.css";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const CreateQuestions = () => {
    const editor = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    //------------------ states for JSON ---------------------
    const [title, setTitle] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [topic, setTopic] = useState("")
    const [tags, setTags] = useState("")
    const [content, setContent] = useState("");
    const [testcase, setTestcase] = useState([]);



    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "Start typing...",
        }),
        []
    );

    useEffect(() => {
        if (!isEditMode) return;

        const fetchQuestionDetails = async () => {
            try {
                setLoading(true);
                const { data } = await axiosInstance.get(`/questions/edit/${id}`);
                const question = data.data;

                setTitle(question.title || "");
                setTopic(question.topic || "");
                setDifficulty(question.difficulty || "");
                setTags(Array.isArray(question.tags) ? question.tags.join(", ") : "");
                setContent(question.content || "");
                setTestcase(Array.isArray(question.testcases) ? question.testcases : []);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch question details");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionDetails();
    }, [id, isEditMode]);

    const addTestCase = () => {
        if (!input.trim() || !output.trim()) return;

        if (editIndex !== null) {
            const updatedTestcases = [...testcase];
            updatedTestcases[editIndex] = { input, output };
            setTestcase(updatedTestcases);
            setEditIndex(null);
        } else {
            setTestcase([...testcase, { input, output }]);
        }

        setInput("");
        setOutput("");
    };

    const handleEdit = (index) => {
        const selectedTestcase = testcase[index];
        setInput(selectedTestcase.input);
        setOutput(selectedTestcase.output);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedTestcases = testcase.filter((_, i) => i !== index);
        setTestcase(updatedTestcases);

        if (editIndex === index) {
            setInput("");
            setOutput("");
            setEditIndex(null);
        }
    };

    const handleSubmit = async () => {

        
        try {
            setLoading(true);
            const obj = {

                title: title,
                topic: topic,
                difficulty: difficulty,
                tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
                content: content,
                testcases: testcase
            }
            if (isEditMode) {
                await axiosInstance.put(`/questions/update/${id}`, obj);
                toast.success("Question updated successfully");
            } else {
                await axiosInstance.post('/questions/add', obj);
                toast.success("Question uploaded successfully");
            }
            navigate("/dashboard/questions");

        } catch (error) {
            toast.error(
                    error.response?.data?.message || "Something went wrong"
            );
        }finally{
            setLoading(false)
        }

    }

    return (
        <>
            {
                loading && <Loader/>
            }
            <div className="page-header">
                <h1>{isEditMode ? "Edit Question" : "Upload Question"}</h1>

                <button onClick={handleSubmit} className="button-primary">
                    {isEditMode ? "Update Question" : "Upload Question"}
                </button>
            </div>

            <div className="page-content">
                <h4 className="lable-heading">Title</h4>
                <input
                    className="notes-title-input"
                    placeholder="Enter Question title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <div className="input-row">
                    <div className="input-cell">
                        <h4 className="lable-heading">Topic</h4>
                        <input
                            type="text"
                            className="notes-title-input"
                            placeholder="Enter Topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    <div className="input-cell">
                        <h4 className="lable-heading">Difficulty</h4>
                        <select
                            className="notes-title-input"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="" disabled>Select Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className="input-cell">
                        <h4 className="lable-heading">Tags</h4>
                        <input
                            type="text"
                            className="notes-title-input"
                            placeholder="Enter Tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>

                <br /><br />

                <h4 className="lable-heading">Question</h4>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                />

                <br /><br />

                <h4 className="label-heading">Testcases</h4>

                <div className="testcase-area-input">
                    <div className="test-case-cell">
                        <input
                            type="text"
                            className="notes-title-input"
                            placeholder="Enter input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="test-case-cell">
                        <input
                            type="text"
                            className="notes-title-input"
                            placeholder="Enter output"
                            value={output}
                            onChange={(e) => setOutput(e.target.value)}
                        />
                    </div>

                    <button className="add-test-case" onClick={addTestCase}>
                        {editIndex !== null ? "Update Testcase" : "Add Testcase"}
                    </button>
                </div>

                {testcase.length > 0 && (
                    <div className="table-container testcase-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Input</th>
                                    <th>Output</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {testcase.map((tc, index) => (
                                    <tr key={index}>
                                        <td>{tc.input}</td>
                                        <td>{tc.output}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreateQuestions;
