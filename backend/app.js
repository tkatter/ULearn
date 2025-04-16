const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const options = require('./utils/customSwaggerCss');
const YAML = require('yaml');
const fs = require('fs');

const setRouter = require('./routes/setRoutes');
const noteRouter = require('./routes/noteRoutes');

// SWAGGER API Documentation
const swaggerFile = fs.readFileSync('backend/api/swagger.yaml', 'utf-8');
const swaggerDocument = YAML.parse(swaggerFile);

const app = express();

// Global Middlewares
app.use(cors());

// Middleware to parse body data from req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));
// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
// const options = {
//   customCss: `.swagger-ui .topbar {
//     display: none;
//   }
//   .swagger-ui {
//     background-color: #333;
//   }`,
// };

// const options = {
//   customCssUrl: '/customSwagger.css',
// };

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.use('/api/v1/sets', setRouter);
app.use('/api/v1/notes', noteRouter);

module.exports = app;
