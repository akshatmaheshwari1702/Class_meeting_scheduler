import React from "react";

const Filters = ({ students, filters, onFilterChange }) => {
  const uniqueClasses = [...new Set(students.map((s) => s.class_name))];
  const uniqueStudents = [...new Set(students.map((s) => s.student_name))];

  return (
    <div style={filterContainerStyles}>
      <h3>Filters</h3>
      <div style={filterGroupStyles}>
        <label>
          Class:
          <select
            value={filters.className}
            onChange={(e) => onFilterChange("className", e.target.value)}
            style={selectStyles}
          >
            <option value="">All Classes</option>
            {uniqueClasses.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={filterGroupStyles}>
        <label>
          Student:
          <select
            value={filters.studentName}
            onChange={(e) => onFilterChange("studentName", e.target.value)}
            style={selectStyles}
          >
            <option value="">All Students</option>
            {uniqueStudents.map((studentName) => (
              <option key={studentName} value={studentName}>
                {studentName}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

const filterContainerStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

const filterGroupStyles = {
  marginBottom: "15px",
};

const selectStyles = {
  marginLeft: "10px",
  padding: "5px 10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

export default Filters;