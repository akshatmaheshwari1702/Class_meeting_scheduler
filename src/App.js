import { useState, useEffect, useMemo } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Calendar from "./components/Calendar/Calendar";
import MeetingOverview from "./components/MeetingOverview/MeetingOverview";
import Filters from "./components/Filters/Filters";
import { studentsData } from "./data/dummyData";
import { scheduleMeetings, getClassWiseSummary } from "./utils/schedulingLogic";
import { exportToExcel } from "./utils/excelExport";

function App() {
  const [students] = useState(studentsData);
  const [selectedDates, setSelectedDates] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [summary, setSummary] = useState({});
  const [filters, setFilters] = useState({
    className: "",
    studentName: "",
  });

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (filters.className && student.class_name !== filters.className)
        return false;
      if (filters.studentName && student.student_name !== filters.studentName)
        return false;
      return true;
    });
  }, [students, filters.className, filters.studentName]);

  const handleDateSelect = (date) => {
    setSelectedDates((prev) => {
      const isSelected = prev.some((d) => d.getTime() === date.getTime());
      if (isSelected) {
        return prev.filter((d) => d.getTime() !== date.getTime());
      } else {
        return [...prev, date].sort((a, b) => a - b);
      }
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    if (selectedDates.length > 0) {
      const newSchedule = scheduleMeetings(filteredStudents, selectedDates);
      setSchedule(newSchedule);

      const newSummary = getClassWiseSummary(newSchedule);
      setSummary(newSummary);
    } else {
      setSchedule({});
      setSummary({});
    }
  }, [selectedDates, filteredStudents]);

  const handleExportToExcel = () => {
    if (Object.keys(schedule).length > 0) {
      exportToExcel(schedule, summary);
    } else {
      alert("Please schedule meetings before exporting.");
    }
  };

  return (
    <div className="App">
      <Header />

      <div className="main-container">
        <div className="controls-section">
          <Filters
            students={students}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <button
            className="export-button"
            onClick={handleExportToExcel}
            disabled={Object.keys(schedule).length === 0}
          >
            📥 Export to Excel
          </button>
        </div>

        <div className="content-grid">
          <div className="calendar-section">
            <Calendar
              selectedDates={selectedDates}
              onDateSelect={handleDateSelect}
              scheduledMeetings={schedule}
            />
          </div>

          <div className="overview-section">
            <MeetingOverview schedule={schedule} summary={summary} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;