const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
require("./models");
require("dotenv").config();
const routes = require('./app/routes');


const app = express();

// Apply CORS Middleware
app.use(cors({ origin: true, credentials: true }));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Static image folder
app.use("/images", express.static("images"));

// Main route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API routes
app.use("/api/v1", routes);

// Catch-all route for handling API not found
app.use((req, res) => {
  res.status(404).json({ error: "API not found" });
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ message: 'Something broke!' });
// });

// Server setup
const port = process.env.PORT || 5000; // Use environment variable if available
const server = http.createServer(app);

// Start listening
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
