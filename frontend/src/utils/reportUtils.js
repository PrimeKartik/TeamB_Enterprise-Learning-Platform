export const totalStudents = (
  reports
) =>
  reports.reduce(
    (sum, item) =>
      sum + item.students,
    0
  );

export const totalEnrollments = (
  reports
) =>
  reports.reduce(
    (sum, item) =>
      sum + item.enrollments,
    0
  );