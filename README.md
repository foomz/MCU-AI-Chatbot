To use Express as the backend for a Next.js frontend in 2026, the cleanest and most scalable way is the Decoupled Architecture. You run them as two separate folders within one "Monorepo."
Avoid a "Custom Server" (putting Express inside Next.js) as it breaks Next.js optimizations and makes deployment a headache.
Step 1: Create the Project Folder
Open your Ubuntu terminal and create a main directory:
bash
mkdir my-fullstack-app && cd my-fullstack-app
Use code with caution.

Step 2: Set up the Next.js Frontend
bash
npx create-next-app@latest frontend
Use code with caution.

Select Yes for TypeScript, ESLint, Tailwind, and App Router.
Step 3: Set up the Express Backend
Go back to the root and create the backend:
bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv
npm install -D nodemon
Use code with caution.

Create a basic server file (server.js):
javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allows frontend to talk to backend
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
Use code with caution.

Step 4: Connect them (The Proxy)
To avoid CORS errors during development, tell Next.js to forward API calls to Express.
In frontend/next.config.ts (or .js), add a rewrite:
javascript
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Express
      },
    ];
  },
};
export default nextConfig;
Use code with caution.

Step 5: How to run both
You will need two terminal tabs:
Tab 1 (Backend): cd backend && npx nodemon server.js
Tab 2 (Frontend): cd frontend && npm run dev
Why this is the "Pro" way in 2026:
Speed: Next.js handles the UI and SEO; Express handles heavy logic or WebSockets.
Flexibility: You can swap the frontend or backend later without breaking the other.
Deployment: You can host the frontend on Vercel and the backend on a VPS or Railway.


Enhance packages.json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },

  Then run npm run dev



if want to use static with backend to sync server.js with frontend itself
npm install --save-dev concurrently

update package.json.
"scripts": {
  "dev": "concurrently \"next dev\" \"node server.js\"",
  "dev:next": "next dev",
  "dev:server": "node server.js",
  "dev:watch": "concurrently \"next dev\" \"nodemon server.js\"",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}