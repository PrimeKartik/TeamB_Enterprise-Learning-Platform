const KEY = "skillsphere:notif-toasts-enabled";

export function getNotificationToastsEnabled() {
  const stored = localStorage.getItem(KEY);
  return stored === null ? true : stored === "true";
}

export function setNotificationToastsEnabled(enabled) {
  localStorage.setItem(KEY, String(enabled));
}
