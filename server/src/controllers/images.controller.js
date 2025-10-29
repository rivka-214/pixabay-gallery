import pixabayService from '../services/pixabay.service.js';
import { PAGINATION, DEFAULT_CATEGORY } from '../config/constants.js';

/**
 * Images Controller
 * מכיל את הלוגיקה העסקית לניהול תמונות
 * הValidation מתבצע ב-middlewares - כאן רק הלוגיקה העסקית
 */

/**
 * שליפת רשימת תמונות עם pagination ומיון
 */
export const getImages = async (req, res, next) => {
  try {
    // שליפת הפרמטרים - כולל validated values מה-middlewares
    const {
      category = DEFAULT_CATEGORY,
      sortBy = 'latest'
    } = req.query;

    // השתמש ב-validated page מה-middleware, או default
    const pageNumber = req.validatedPage || PAGINATION.DEFAULT_PAGE;

    // השתמש ב-validated category אם קיים
    const searchCategory = req.validatedCategory || category;

    // השתמש ב-validated sortBy אם קיים
    const searchSortBy = req.validatedSortBy || sortBy;

    console.log(`📸 Fetching images - Category: ${searchCategory}, Page: ${pageNumber}, Sort: ${searchSortBy}`);

    // קריאה ל-service לשליפת הנתונים
    const result = await pixabayService.fetchImages(
      searchCategory,
      pageNumber,
      searchSortBy
    );

    // החזרת תגובה מוצלחת
    res.status(200).json({
      success: true,
      message: 'Images fetched successfully',
      data: result.data,
      pagination: {
        currentPage: pageNumber,
        totalResults: result.total,
        totalPages: result.totalPages,
        itemsPerPage: PAGINATION.ITEMS_PER_PAGE
      },
      category: searchCategory,
      sortBy: searchSortBy
    });

  } catch (error) {
    // העברת השגיאה ל-error handler middleware
    console.error('❌ Error in getImages controller:', error.message);
    next(error);
  }
};

/**
 * שליפת פרטי תמונה בודדת
 * GET /api/images/:id
 * 
 * הערה: הvalidation של ה-ID מתבצע ב-middleware
 */
export const getImageById = async (req, res, next) => {
  try {
    // השתמש ב-validated ID מה-middleware
    const imageId = req.validatedImageId;

    console.log(`🔍 Fetching image details for ID: ${imageId}`);

    // קריאה ל-service
    const result = await pixabayService.fetchImageDetails(imageId);

    // החזרת תגובה מוצלחת
    res.status(200).json({
      success: true,
      message: 'Image details fetched successfully',
      data: result.data
    });

  } catch (error) {
    console.error('❌ Error in getImageById controller:', error.message);

    // אם התמונה לא נמצאה
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // שגיאות אחרות
    next(error);
  }
};