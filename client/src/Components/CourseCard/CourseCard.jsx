import React from "react";
import { CgNotes } from "react-icons/cg";
import "./CourseCard.css";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const subjectName = course.subject?.name;
  const subjectColor = course.subject?.color || "default";

  const navigate = useNavigate();
    const handleClick = () => {
    navigate(`/dashboard/notes/${course._id}`);
  };

  return (
    <div className="course-card" onClick={handleClick}>

      <div className="card-top">
        <CgNotes className="course-icon" />

        <span className={`subject-pill subject-pill-${subjectColor}`}>
          {subjectName}
        </span>
      </div>

      <h4 className="course-title">{course.title}</h4>

    </div>
  );
};

export default CourseCard;
