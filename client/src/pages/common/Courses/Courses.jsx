import React, { useEffect, useState } from "react";
import "./Courses.css";
import axiosInstance from "../../../services/axiosInstance";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import { IoSearchSharp } from "react-icons/io5";
import Loader from "../../../Components/Loader/Loader";


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState("all");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/course/all");

      const courseData = res.data.data;

      setCourses(courseData);
      setFilteredCourses(courseData);

      const uniqueSubjectsMap = new Map();

      courseData.forEach((course) => {
        if (course.subject) {
          uniqueSubjectsMap.set(course.subject._id, course.subject);
        }
      });

      setSubjects([...uniqueSubjectsMap.values()]);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error while Fetching courses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleFilter = (subjectId) => {
    setActiveSubject(subjectId);

    if (subjectId === "all") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) => course.subject?._id === subjectId
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <>

      {
        loading && <Loader/>
      }
      <div className="page-header">
        <h1>Notes</h1>

        <form className="searchbar-area">
          <input type="text" placeholder="Search" />
          <button type="submit">
            <IoSearchSharp />
          </button>
        </form>
      </div>

      <div className="subject-capsules">
        <span
          className={`filter-capsule ${
            activeSubject === "all" ? "active subject-capsule" : "subject-capsule"
          }`}
          onClick={() => handleFilter("all")}
        >
          ALL
        </span>

        {subjects.map((subject) => (
          <span
            key={subject._id}
            className={`filter-capsule subject-capsule subject-capsule-${subject.color} ${
              activeSubject === subject._id ? "active" : ""
            }`}
            onClick={() => handleFilter(subject._id)}
          >
            {subject.name.toUpperCase()}
          </span>
        ))}

      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => (
          
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </>
  );
};

export default Courses;
