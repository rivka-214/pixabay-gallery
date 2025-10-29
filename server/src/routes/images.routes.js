import express from 'express';
import { getImages, getImageById } from '../controllers/images.controller.js';
import { 
  validateGetImages, 
  validateImageId 
} from '../middlewares/validation.js';

// יצירת Router instance
const router = express.Router();

/**
 * Images Routes
 * מגדיר את כל הנתיבים הקשורים לתמונות
 * כל route מוגן עם validation middleware
 */

/**
 * @route   GET /api/images
 * @desc    שליפת רשימת תמונות עם pagination ומיון
 * @query   category - קטגוריה (sports, animals, etc.)
 * @query   page - מספר עמוד (1, 2, 3...)
 * @query   sortBy - סוג מיון (latest/popular)
 * @middlewares validateGetImages - ולידציה של כל הפרמטרים
 * @access  Public
 */
router.get('/', validateGetImages, getImages);

/**
 * @route   GET /api/images/:id
 * @desc    שליפת פרטי תמונה בודדת
 * @params  id - מזהה התמונה
 * @middlewares validateImageId - ולידציה של ה-ID
 * @access  Public
 */
router.get('/:id', validateImageId, getImageById);

export default router;