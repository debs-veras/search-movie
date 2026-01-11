const SESSION_KEY = '@search-movie/session_id';

export const storage = {
  getSession(): string | null {
    try {
      return localStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  },
  setSession(sessionId: string) {
    try {
      localStorage.setItem(SESSION_KEY, sessionId);
    } catch {
      return null;
    }
  },
  clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      return null;
    }
  },
};

export default storage;
