import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../services/axiosInstance";
import { CgNotes } from "react-icons/cg";

import "./NotesContent.css";

const NotesContent = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const { role } = useSelector((state) => state.auth);

  const canManage =
    role === "admin" || role === "lecturer";


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/course/course-details/${id}`);
        setCourse(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;


  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/course/remove/${id}`);
      navigate("/dashboard/notes");
      console.log("hello")
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className="course-details-page">


      <div className="course-details-container">

        <div className="details-header">

          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>

          {canManage && (
            <div className="action-buttons">
              <button onClick={() => navigate(`/dashboard/edit-notes/${id}`)} className="edit-button">
                Edit
              </button>

              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
            </div>
          )}

        </div>


        <h1 className="course-main-title">
          <CgNotes className="course-icon" /> {course.title}
        </h1>

        <div
          className="course-rich-content"
          dangerouslySetInnerHTML={{ __html: course.content }}
        />

      </div>
    </div>
  );
}

export default NotesContent