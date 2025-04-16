const express = require("express");
const morgan = require("morgan");
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yaml");
const cors = require("cors");

// SWAGGER API Documentation
// const swaggerFile = fs.readFileSync("./api/index.yaml", "utf-8");
// const swaggerDocument = YAML.parse(swaggerFile);

const app = express();

// Global Middlewares
app.use(cors());

// Middleware to parse body data from req.body
app.use(express.json({ limit: "10kb" }));

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/api/v1/test", helloWorld);

function helloWorld(req, res, next) {
  res.status(200).json({
    status: "success",
    message: "Hello from the server",
  });
}

module.exports = app;
