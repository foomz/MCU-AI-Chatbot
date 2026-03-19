// frontend/lib/api/routes.ts // Declare base URL + route paths for the frontend to interact with the backend API server
export const API_BASE_URL = /// Base URL for the backend API, used for making requests from the frontend to the backend server.
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000"; // Fallback to localhost if the environment variable is not set

export const API_ROUTES = { // Define API routes for the frontend to interact with the backend server
  hello: "/api/hello", // Route for a basic test endpoint to verify that the backend server is working
  chatPrompt: "/api/chat/prompt", // Route for sending a chat prompt to the backend and receiving a response from the MCU AI chatbot
  chatStream: "/api/chat/stream", // Route for sending a chat prompt to the backend and receiving a streaming response from the MCU AI chatbot, allowing for real-time interaction
  mcuInfo: "/api/chat/mcu-info", // Route for fetching information about Manila Central University (MCU) from the backend, which retrieves data from the MCU website and provides it to the frontend for display
};