const express = require('express');
const morgan = require('morgan');
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yaml");
const cors = require('cors');

const setRouter = require('./routes/setRoutes');

// SWAGGER API Documentation
// const swaggerFile = fs.readFileSync("./api/index.yaml", "utf-8");
// const swaggerDocument = YAML.parse(swaggerFile);

const app = express();

// Global Middlewares
app.use(cors());

// Middleware to parse body data from req.body
app.use(express.json({ limit: '10kb' }));

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/sets', setRouter);

module.exports = app;
