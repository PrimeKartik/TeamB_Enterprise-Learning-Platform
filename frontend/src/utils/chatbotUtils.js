export const userMessage = (
  text
) => ({
  id: Date.now(),
  sender: "user",
  text,
});

export const botMessage = (
  text
) => ({
  id: Date.now() + 1,
  sender: "bot",
  text,
});