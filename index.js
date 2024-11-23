// Import required modules
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve static files from 'public' directory
app.use(express.static("public"));

// API endpoint
app.get("/api/whoami", (req, res) => {
  // Get IP address from various possible headers and sources
  const ipaddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    req.ip ||
    "127.0.0.1"; // Fallback to localhost if no IP found

  // Clean the IP address (remove IPv6 prefix if present)
  const cleanIp = ipaddress.replace(/^::ffff:/, "");

  // Get preferred language from Accept-Language header
  const language = req.headers["accept-language"];

  // Get software (user agent) information
  const software = req.headers["user-agent"];

  // Return JSON response
  res.json({
    ipaddress: cleanIp,
    language: language,
    software: software,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
