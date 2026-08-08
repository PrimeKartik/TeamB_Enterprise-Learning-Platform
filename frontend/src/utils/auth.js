// Lightweight JWT payload decoder — no verification (the backend already
// verifies signatures on every request); this just reads claims for UI
// decisions like "is this user an admin" or "is my token still valid".

const MARKER_KEY = 'auth-storage';

// Only one storage (localStorage for "remember me", sessionStorage
// otherwise) should ever hold the active session. A leftover token in the
// *other* storage from a previous login must never be read, or the app can
// end up operating as a stale, previously-logged-in user — e.g. one user's
// saved wishlist showing up for whoever logs in next. `setActiveStorage`
// is the single place that decides + records which storage is authoritative;
// everything else reads through `getActiveStorage`.
export function setActiveStorage(rememberMe) {
  const active = rememberMe ? localStorage : sessionStorage;
  const other = rememberMe ? sessionStorage : localStorage;

  // Clear the storage we are NOT using so no stale token can linger there.
  other.removeItem('token');
  other.removeItem('user');
  other.removeItem(MARKER_KEY);

  active.setItem(MARKER_KEY, rememberMe ? 'local' : 'session');

  return active;
}

function getActiveStorage() {
  // localStorage's marker is authoritative if present; otherwise fall back
  // to sessionStorage's. Only one should ever be set at a time in practice
  // (setActiveStorage enforces that), so this is just a safe default.
  if (localStorage.getItem(MARKER_KEY) === 'local') return localStorage;
  if (sessionStorage.getItem(MARKER_KEY) === 'session') return sessionStorage;
  return null;
}

export function getToken() {
  const storage = getActiveStorage();
  return storage ? storage.getItem('token') : null;
}

export function getStoredUser() {
  const storage = getActiveStorage();
  if (!storage) return null;

  const raw = storage.getItem('user');
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function decodeToken(token) {
  try {
    const base64Payload = token.split('.')[1]
    const payload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(payload)
  } catch {
    return null
  }
}

export function getCurrentUser() {
  const token = getToken()
  if (!token) return null
  const payload = decodeToken(token)
  if (!payload) return null

  // Backend puts expiry in `exp` (seconds since epoch)
  if (payload.exp && Date.now() >= payload.exp * 1000) return null

  return { email: payload.sub, role: payload.role }
}

export function isAdmin() {
  return getCurrentUser()?.role === 'ADMIN'
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem(MARKER_KEY)
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  sessionStorage.removeItem(MARKER_KEY)
}
