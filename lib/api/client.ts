// reusable fetch helper // Use it anywhere in frontend
// eg: import { apiFetch } from "@/lib/api/client"; & import { API_ROUTES } from "@/lib/api/routes";
import { API_BASE_URL } from "./routes"; // Import the base URL for the backend API from the routes file

// Generic function to make API requests to the backend server, used by the frontend to interact with the backend API

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}