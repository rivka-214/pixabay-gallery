import axios from 'axios';

/**
 * Pixabay Service
 * אחראי על כל התקשורת עם Pixabay API
 * מפריד את לוגיקת ה-API מהקונטרולרים
 */

class PixabayService {
  constructor() {
    // אתחול המשתנים מ-environment variables
    this.apiKey = process.env.PIXABAY_API_KEY;
    this.baseUrl = process.env.PIXABAY_BASE_URL;
    
    // בדיקת תקינות - וידוא שיש API key
    if (!this.apiKey) {
      throw new Error('⚠️ PIXABAY_API_KEY is not defined in .env file');
    }
    
    if (!this.baseUrl) {
      throw new Error('⚠️ PIXABAY_BASE_URL is not defined in .env file');
    }

    console.log('✅ Pixabay Service initialized successfully');
  }

  /**
   * שליפת תמונות מ-Pixabay
   * @param {string} category - קטגוריה לחיפוש (animals, sports, etc.)
   * @param {number} page - מספר העמוד (pagination)
   * @param {string} sortBy - סוג המיון (latest/popular)
   * @returns {Promise} - מחזיר את התוצאות מה-API
   */
  async fetchImages(category = 'nature', page = 1, sortBy = 'latest') {
    try {
      // הרכבת ה-URL עם כל הפרמטרים
       const pixabayOrder = sortBy === 'id' ? 'latest' : sortBy;
      const params = {
        key: this.apiKey,
        q: category, // מילת החיפוש
        page: page,
        per_page: 9, // 9 תמונות לעמוד (3x3 grid)
        order: sortBy, // סדר התוצאות
        image_type: 'photo', // רק תמונות (לא וקטורים)
        safesearch: true // תוכן מתאים לכל הגילאים
      };

      console.log('🔍 Pixabay API Request:', { category, page, sortBy });

      // ביצוע הבקשה ל-API
      const response = await axios.get(this.baseUrl, { params });

      console.log(`✅ Pixabay API Response: ${response.data.hits.length} images, ${response.data.totalHits} total`);
 let sortedData = response.data.hits;
      
      if (sortBy === 'id') {
        sortedData = this._sortById(sortedData);
        console.log('🔢 Sorted images by ID');
      }

      // החזרת הנתונים
      return {
        success: true,
        data: sortedData, // מערך התמונות
        total: response.data.total, // סה"כ תוצאות
        totalPages: Math.ceil(response.data.total / 9) // חישוב מספר עמודים
      };

    } catch (error) {
      // טיפול בשגיאות - יצירת שגיאה אינפורמטיבית
      console.error('❌ Pixabay API Error:', error.message);
      
      // אם זו שגיאת API (response מהשרת)
      if (error.response) {
        throw new Error(
          `Pixabay API Error: ${error.response.data.message || error.message}`
        );
      }
      
      // שגיאת רשת או טכנית אחרת
      throw new Error(`Failed to fetch images: ${error.message}`);
    }
  }

  /**  * ⬅️ פונקציה חדשה: מיון תמונות לפי ID
   * @param {Array} images - מערך תמונות
   * @returns {Array} - מערך ממויין
   * @private
   */
  _sortById(images) {
    // מיון בסדר עולה (ID נמוך ← ID גבוה)
    return images.sort((a, b) => a.id - b.id);
    
    // אם רוצים סדר יורד (ID גבוה ← ID נמוך):
    // return images.sort((a, b) => b.id - a.id);
  }
  /**
   * שליפת פרטי תמונה בודדת
   * @param {number} imageId - מזהה התמונה
   * @returns {Promise} - מחזיר את פרטי התמונה
   */
  async fetchImageDetails(imageId) {
    try {
      const params = {
        key: this.apiKey,
        id: imageId
      };

      console.log(`🔍 Fetching image details for ID: ${imageId}`);

      const response = await axios.get(this.baseUrl, { params });

      if (response.data.hits.length === 0) {
        throw new Error('Image not found');
      }

      console.log('✅ Image details fetched successfully');

      return {
        success: true,
        data: response.data.hits[0]
      };

    } catch (error) {
      console.error('❌ Error fetching image details:', error.message);
      throw new Error(`Failed to fetch image details: ${error.message}`);
    }
  }
}

// ייצוא instance יחיד (Singleton pattern)
export default new PixabayService();