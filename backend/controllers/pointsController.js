// In pointController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Test connection
const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};