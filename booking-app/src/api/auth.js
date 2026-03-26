const API_BASE = import.meta.env.VITE_API_BASE;

export const handleLogin = async (formData) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    credentials: "include", // Required for cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
};
