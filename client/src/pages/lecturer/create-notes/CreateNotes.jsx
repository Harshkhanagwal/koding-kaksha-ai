import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { MdOutlineUpload } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../../../services/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateNotes.css";

const CreateNotes = () => {
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectColor, setNewSubjectColor] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  
  const fetchSubjects = async () => {
    try {
      const res = await axiosInstance.get("/subject/all");
      setSubjects(res.data.data);
    } catch (err) {
      toast.error("Failed to load subjects");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);


  useEffect(() => {
    if (!isEditMode) return;

    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/course/course-details/${id}`);
        const data = res.data.data;

        setTitle(data.title);
        setSubject(data.subject?._id);
        setContent(data.content);
      } catch (error) {
        toast.error("Failed to fetch course data");
      }
    };

    fetchCourse();
  }, [id, isEditMode]);


  const handleCreateSubject = async () => {
    if (!newSubjectName || !newSubjectColor) {
      toast.error("All fields required");
      return;
    }

    try {
      await axiosInstance.post("/subject/create", {
        name: newSubjectName,
        color: newSubjectColor,
      });

      toast.success("Subject created!");

      setShowModal(false);
      setNewSubjectName("");
      setNewSubjectColor("");

      fetchSubjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create subject");
    }
  };

 
  const handleSubmit = async () => {
    if (!title || !content || !subject) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await axiosInstance.put(`/course/update/${id}`, {
          title,
          subject,
          content,
        });

        toast.success("Course updated successfully!");
      } else {
        await axiosInstance.post("/course/upload-course", {
          title,
          subject,
          content,
        });

        toast.success("Course created successfully!");
      }

      navigate("/dashboard/notes");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>{isEditMode ? "Edit Course" : "Create Notes"}</h1>

        <button
          className="button-primary"
          onClick={() => setShowModal(true)}
        >
          Add New Subject
        </button>
      </div>

      <div className="page-content">
        <h4 className="lable-heading">Title</h4>
        <input
          className="notes-title-input"
          placeholder="Enter course title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <h4 className="lable-heading">Subject</h4>
        <select
          className="notes-title-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        <br /><br />

        <h4 className="lable-heading">Content</h4>

        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      <button
        className="button-primary upload-notes"
        onClick={handleSubmit}
        disabled={loading}
      >
        <MdOutlineUpload />
        {loading
          ? "Saving..."
          : isEditMode
          ? "Update Notes"
          : "Create Notes"}
      </button>


      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create Subject</h3>

            <input
              type="text"
              placeholder="Subject Name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Color (e.g. green)"
              value={newSubjectColor}
              onChange={(e) => setNewSubjectColor(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="button-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="button-primary"
                onClick={handleCreateSubject}
              >
                Create Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNotes;
