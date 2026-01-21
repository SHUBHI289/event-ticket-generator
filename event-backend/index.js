import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { ensureTables } from './config/db.js';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import ticketRoutes from './routes/ticket.js';
import errorHandler from './middleware/errorhandler.js';
import registrationRoutes from "./routes/registrationRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use("/api", registrationRoutes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server after ensuring DB tables exist
ensureTables()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Failed to init database:', err);
    process.exit(1);
  });
import { initTables } from "./models/index.js";

await initTables();
