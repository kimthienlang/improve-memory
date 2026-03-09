export const getSocialLoginUrl = (provider: "github" | "google") => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${API_URL}/api/auth/${provider}`;
};
