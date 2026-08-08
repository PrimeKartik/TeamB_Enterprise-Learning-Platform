export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() +
  text.slice(1);

export const truncate = (
  text = "",
  length = 80
) => {
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
};

export const randomColor = () => {
  const colors = [
    "#2563EB",
    "#16A34A",
    "#DC2626",
    "#CA8A04",
    "#9333EA",
  ];

  return colors[
    Math.floor(Math.random() * colors.length)
  ];
};

export const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );