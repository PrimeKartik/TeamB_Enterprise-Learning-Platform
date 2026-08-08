export const filterCourses = (
  courses,
  search
) =>
  courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

export const totalHours = (
  courses
) =>
  courses.reduce(
    (sum, course) =>
      sum + course.totalHours,
    0
  );