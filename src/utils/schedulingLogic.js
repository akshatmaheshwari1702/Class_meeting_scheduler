import { format } from "date-fns";

export const scheduleMeetings = (students, selectedDates) => {
  if (!selectedDates || selectedDates.length === 0) return {};

  const sortedStudents = [...students].sort((a, b) => b.age - a.age);

  const meetingsToSchedule = [];
  sortedStudents.forEach((student) => {
    for (let i = 0; i < student.meetings; i++) {
      meetingsToSchedule.push({
        ...student,
        meetingId: `${student.student_name}-${i + 1}`,
        meetingLink: `https://meet.example.com/${student.student_name.replace(
          " ",
          "-"
        )}-${i + 1}`,
        attendanceStatus: getRandomAttendanceStatus(),
      });
    }
  });

  const schedule = {};
  selectedDates.forEach((date) => {
    schedule[format(date, "yyyy-MM-dd")] = [];
  });

  const dateKeys = Object.keys(schedule);
  let dateIndex = 0;

  const meetingsByClass = {};
  meetingsToSchedule.forEach((meeting) => {
    if (!meetingsByClass[meeting.class_name]) {
      meetingsByClass[meeting.class_name] = [];
    }
    meetingsByClass[meeting.class_name].push(meeting);
  });

  Object.values(meetingsByClass).forEach((classMeetings) => {
    classMeetings.forEach((meeting) => {
      schedule[dateKeys[dateIndex]].push(meeting);
      dateIndex = (dateIndex + 1) % dateKeys.length;
    });
  });

  return schedule;
};

const getRandomAttendanceStatus = () => {
  const statuses = ["Present", "Absent", "Late"];
  const weights = [0.7, 0.2, 0.1];

  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return statuses[i];
    }
  }

  return statuses[0];
};

export const getClassWiseSummary = (schedule) => {
  const summary = {};

  Object.entries(schedule).forEach(([date, meetings]) => {
    const classCounts = {};
    const attendanceCounts = {
      Present: 0,
      Absent: 0,
      Late: 0,
    };

    meetings.forEach((meeting) => {
      if (!classCounts[meeting.class_name]) {
        classCounts[meeting.class_name] = 0;
      }
      classCounts[meeting.class_name]++;

      attendanceCounts[meeting.attendanceStatus]++;
    });

    summary[date] = {
      classCounts,
      attendanceCounts,
      totalMeetings: meetings.length,
    };
  });

  return summary;
};