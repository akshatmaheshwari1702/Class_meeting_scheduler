import * as XLSX from "xlsx";
import { format } from "date-fns";

export const exportToExcel = (schedule, summary) => {
  const workbook = XLSX.utils.book_new();
  const overviewData = createOverviewData(summary);
  const overviewSheet = XLSX.utils.json_to_sheet(overviewData);
  XLSX.utils.book_append_sheet(workbook, overviewSheet, "Overview");

  Object.entries(schedule).forEach(([date, meetings]) => {
    const sheetData = meetings.map((meeting) => ({
      "Student Name": meeting.student_name,
      "Class Name": meeting.class_name,
      Age: meeting.age,
      Instructor: meeting.instructor_name,
      "Meeting Link": meeting.meetingLink,
      "Attendance Status": meeting.attendanceStatus,
    }));

    const sheet = XLSX.utils.json_to_sheet(sheetData);
    const sheetName = format(new Date(date), "dd-MMM-yyyy");
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  });

  XLSX.writeFile(
    workbook,
    `Meeting_Schedule_${format(new Date(), "yyyy-MM-dd")}.xlsx`
  );
};

const createOverviewData = (summary) => {
  const overviewData = [];

  const allClasses = new Set();
  Object.values(summary).forEach((daySummary) => {
    Object.keys(daySummary.classCounts).forEach((className) => {
      allClasses.add(className);
    });
  });

  Object.entries(summary).forEach(([date, daySummary]) => {
    const row = {
      Date: format(new Date(date), "dd-MMM-yyyy"),
    };

    allClasses.forEach((className) => {
      row[className] = daySummary.classCounts[className] || 0;
    });

    row["Total"] = daySummary.totalMeetings;
    row["Present"] = daySummary.attendanceCounts.Present;
    row["Absent"] = daySummary.attendanceCounts.Absent;
    row["Late"] = daySummary.attendanceCounts.Late;

    overviewData.push(row);
  });

  return overviewData;
};