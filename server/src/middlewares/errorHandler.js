
export const errorHandler = (err, req, res, next) => {
  // Log error לקונסול 
  console.error('❌ Error:', err.message);
  console.error('Stack:', err.stack);

  // קביעת status code - אם לא הוגדר, ברירת מחדל 500
  const statusCode = err.statusCode || 500;
  
  // בניית תגובת שגיאה עקבית
  const errorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    // בפיתוח - נציג את ה-stack trace, בפרודקשן - לא
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(errorResponse);
};

/**
 
 * מטפל ב-routes שלא קיימים
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};