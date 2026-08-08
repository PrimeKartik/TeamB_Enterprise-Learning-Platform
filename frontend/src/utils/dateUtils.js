export const formatDate = (date) =>
  new Date(date).toLocaleDateString();

export const formatDateTime = (
  date
) =>
  new Date(date).toLocaleString();

export const today = () =>
  new Date().toISOString().split("T")[0];

export const getYear = () =>
  new Date().getFullYear();