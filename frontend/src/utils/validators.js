export const isEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPassword = (password) =>
  password.length >= 8;

export const isPhone = (phone) =>
  /^[0-9]{10}$/.test(phone);

export const required = (value) =>
  value !== undefined &&
  value !== null &&
  value !== "";