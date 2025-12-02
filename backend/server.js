import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authenticate, isAdmin, isStudent } from "./middleware/authMiddleware.js";


const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Note the .js extension
import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});
// Example: Admin only route
app.get("/api/admin/dashboard", authenticate, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

// Example: Student only route
app.get("/api/student/dashboard", authenticate, isStudent, (req, res) => {
  res.json({ message: "Welcome Student", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});