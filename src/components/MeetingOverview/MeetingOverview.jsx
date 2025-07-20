import React from "react";
import { format } from "date-fns";
import "./MeetingOverview.css";

const MeetingOverview = ({ schedule, summary }) => {
  if (Object.keys(schedule).length === 0) {
    return (
      <div className="overview-container">
        <h2>Meeting Overview</h2>
        <p className="no-data">
          No meetings scheduled yet. Please select dates from the calendar.
        </p>
      </div>
    );
  }

  return (
    <div className="overview-container">
      <h2>Meeting Overview</h2>

      <div className="summary-cards">
        {Object.entries(summary).map(([date, data]) => (
          <div key={date} className="summary-card">
            <h3>{format(new Date(date), "EEEE, MMM dd, yyyy")}</h3>

            <div className="class-summary">
              <h4>Classes</h4>
              {Object.entries(data.classCounts).map(([className, count]) => (
                <div key={className} className="class-item">
                  <span className="class-name">{className}</span>
                  <span className="class-count">{count}</span>
                </div>
              ))}
            </div>

            <div className="attendance-summary">
              <h4>Attendance</h4>
              <div className="attendance-grid">
                <div className="attendance-item present">
                  <span>Present</span>
                  <span>{data.attendanceCounts.Present}</span>
                </div>
                <div className="attendance-item absent">
                  <span>Absent</span>
                  <span>{data.attendanceCounts.Absent}</span>
                </div>
                <div className="attendance-item late">
                  <span>Late</span>
                  <span>{data.attendanceCounts.Late}</span>
                </div>
              </div>
            </div>

            <div className="total-meetings">
              Total Meetings: {data.totalMeetings}
            </div>
          </div>
        ))}
      </div>

      <div className="detailed-schedule">
        <h3>Detailed Schedule</h3>
        {Object.entries(schedule).map(([date, meetings]) => (
          <div key={date} className="date-section">
            <h4>{format(new Date(date), "EEEE, MMM dd, yyyy")}</h4>
            <div className="meetings-table">
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Age</th>
                    <th>Instructor</th>
                    <th>Meeting Link</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((meeting, index) => (
                    <tr key={index}>
                      <td>{meeting.student_name}</td>
                      <td>{meeting.class_name}</td>
                      <td>{meeting.age}</td>
                      <td>{meeting.instructor_name}</td>
                      <td>
                        <a
                          href={meeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Meeting
                        </a>
                      </td>
                      <td
                        className={`status ${meeting.attendanceStatus.toLowerCase()}`}
                      >
                        {meeting.attendanceStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingOverview;