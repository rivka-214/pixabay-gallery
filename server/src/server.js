
// רק עכשיו ייבוא שאר הקבצים
import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import imagesRoutes from './routes/images.routes.js';

// בדיקת טעינה (אפשר למחוק אחר כך)
console.log('🔍 Environment variables check:');
console.log('  API Key:', process.env.PIXABAY_API_KEY ? '✅ Loaded' : '❌ NOT FOUND');
console.log('  Base URL:', process.env.PIXABAY_BASE_URL ? '✅ Loaded' : '❌ NOT FOUND');
console.log('  Port:', process.env.PORT || 5000);

// יצירת אפליקציית Express
const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middlewares
 */

// CORS - מאפשר בקשות מהפרונט-אנד
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser - לקריאת JSON בבקשות
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

// Route בסיסי לבדיקה
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Pixabay Gallery API is running! 🚀',
    endpoints: {
      images: '/api/images',
      imageById: '/api/images/:id',
      health: '/health'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Images routes
app.use('/api/images', imagesRoutes);

/**
 * Error Handling
 */

// 404 Handler - חייב להיות אחרי כל ה-routes
app.use(notFoundHandler);

// Global Error Handler - חייב להיות אחרון
app.use(errorHandler);

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('=================================');
});

