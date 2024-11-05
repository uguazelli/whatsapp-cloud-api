// In-memory storage for sessions
const sessions = {};

// Function to get a session with a 12-hour expiration
export function getSession(userId) {
  const session = sessions[userId];
  
  // Check if the session exists and if it has expired
  if (session) {
    const now = Date.now();
    const sessionAge = now - session.timestamp; // Calculate session age
    const expirationTime = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

    // If the session is still valid, return it
    if (sessionAge < expirationTime) {
      return session;
    } else {
      // If the session has expired, clear it
      clearSession(userId);
    }
  }
  
  // Return null if the session does not exist or has expired
  return null;
}

// Function to update a session
export function updateSession(userId, sessionData) {
  // Store session data with the current timestamp
  sessions[userId] = { ...sessionData, timestamp: Date.now() };
}

// Function to clear a specific session
export function clearSession(userId) {
  delete sessions[userId];
}
