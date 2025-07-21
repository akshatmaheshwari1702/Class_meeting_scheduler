import React from "react";
import "./Filters.css";

const Filters = ({ students, filters, onFilterChange }) => {
  const uniqueClasses = [...new Set(students.map((s) => s.class_name))];
  const uniqueStudents = [...new Set(students.map((s) => s.student_name))];

  return (
    <div className="filter-container">
      <h3 className="filter-title">🎯 Filters</h3>

      <div className="filter-group">
        <label htmlFor="class-select" className="filter-label">
          Class:
        </label>
        <select
          id="class-select"
          value={filters.className}
          onChange={(e) => onFilterChange("className", e.target.value)}
          className="filter-select"
        >
          <option value="">All Classes</option>
          {uniqueClasses.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="student-select" className="filter-label">
          Student:
        </label>
        <select
          id="student-select"
          value={filters.studentName}
          onChange={(e) => onFilterChange("studentName", e.target.value)}
          className="filter-select"
        >
          <option value="">All Students</option>
          {uniqueStudents.map((studentName) => (
            <option key={studentName} value={studentName}>
              {studentName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
