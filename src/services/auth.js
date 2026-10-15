
const TOKEN_KEY = "travelgo_token";
const TOKEN_EXPIRY_KEY = "travelgo_token_expiry";
const SESSION_DURATION = 30 * 60 * 1000;

// Demo token for coursework only.
// This is NOT a secure authentication mechanism.
export const createDemoToken = (username) => {
  if (!username || typeof username !== "string" || !username.trim()) {
    throw new Error("A valid username is required.");
  }

  const token = `demo_${btoa(
    `${username.trim()}:${Date.now()}`
  )}`;

  const expiresAt = Date.now() + SESSION_DURATION;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiresAt));

  return token;
};

// Clear session and authentication-related data
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedUser");
};

// Read token and check client-side expiry
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiryValue = localStorage.getItem(TOKEN_EXPIRY_KEY);
  const expiry = Number(expiryValue);

  if (
    !token ||
    !expiryValue ||
    !Number.isFinite(expiry) ||
    expiry <= Date.now() ||
    !token.startsWith("demo_")
  ) {
    removeToken();
    return null;
  }

  return token;
};

// Check client-side session state
export const hasValidToken = () => Boolean(getToken());
