const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const options = require('./utils/customSwaggerCss');
const YAML = require('yaml');
const fs = require('fs');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');
const { protect } = require('./controllers/authController');

const oauthRouter = require('./routes/oauthRoutes');
const authRouter = require('./routes/authRoutes');
const setRouter = require('./routes/setRoutes');
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');

// SWAGGER API Documentation
const swaggerFile = fs.readFileSync('backend/api/swagger.yaml', 'utf-8');
const swaggerDocument = YAML.parse(swaggerFile);

const app = express();

// Global Middlewares
app.use(cors());

// Middleware to parse body data from req.body
app.use(cookieParser());

// Middleware to parse body data from req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));
// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

// Routes
app.use(
  '/api/docs',
  swaggerUi.serve,
  // swaggerUi.setup(swaggerDocument)
  swaggerUi.setup(swaggerDocument, options)
);

app.use('/api/v1/oauth', oauthRouter);
app.use('/api/v1/auth', authRouter);

// Protect the routes to logged in users below this middleware
app.use('/api/v1/sets', setRouter);
app.use('/api/v1/users', userRouter);
app.use(protect);
app.use('/api/v1/notes', noteRouter);

app.all('/{*splat}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
