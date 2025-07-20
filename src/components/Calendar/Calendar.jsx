import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
} from "date-fns";
import "./Calendar.css";

const Calendar = ({ selectedDates, onDateSelect, scheduledMeetings }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfWeek = getDay(monthStart);
  const emptyDays = Array(firstDayOfWeek).fill(null);

  const handleDateClick = (date) => {
    onDateSelect(date);
  };

  const isDateSelected = (date) => {
    return selectedDates.some((selectedDate) => isSameDay(selectedDate, date));
  };

  const getMeetingCount = (date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    return scheduledMeetings[dateKey]?.length || 0;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)} className="nav-button">
          ‹
        </button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => navigateMonth(1)} className="nav-button">
          ›
        </button>
      </div>

      <div className="calendar-grid">
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="days-grid">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="empty-day"></div>
          ))}

          {monthDays.map((date) => {
            const isSelected = isDateSelected(date);
            const meetingCount = getMeetingCount(date);

            return (
              <div
                key={date.toISOString()}
                className={`calendar-day ${isSelected ? "selected" : ""} ${
                  meetingCount > 0 ? "has-meetings" : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                <div className="day-number">{format(date, "d")}</div>
                {meetingCount > 0 && (
                  <div className="meeting-count">{meetingCount} meetings</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="selected-dates">
        <h3>Selected Dates ({selectedDates.length})</h3>
        <div className="dates-list">
          {selectedDates.map((date) => (
            <span key={date.toISOString()} className="selected-date-chip">
              {format(date, "MMM dd, yyyy")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;