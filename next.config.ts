import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin access from network IP for development
  allowedDevOrigins: ['192.168.8.120'],
  
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://mcu-ai-chatbot-backend-production.up.railway.app'; // Fallback to Railway if environment variable is not set
    return [
      {
        //source: '/api/:path*', // Match all API routes
        //destination: 'http://localhost:8080/api/:path*', // Proxy to Express eg: http://192.168.8.120:8080/api/:path*
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
