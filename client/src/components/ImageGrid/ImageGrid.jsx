import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard.jsx';
import './ImageGrid.css';



/**
 * ========================================
 * ImageGrid Component - קומפוננטת גריד תמונות
 * ========================================
 * 
 * תפקיד:
 * מציגה 9 תמונות בפריסת גריד 3x3 (3 שורות, 3 עמודות)
 * 
 * דרישות שמתמלאות:
 * ✅ "The images display should be 3*3"
 * ✅ "Display only the first 9 elements from the array"
 * 
 * ארכיטקטורה:
 * - Grid מציג → ImageCard מציג תמונה בודדת
 * - הפרדת concerns: Grid = layout, Card = תוכן
 * 
 * Responsive:
 * - Desktop (>768px): 3 עמודות (3x3)
 * - Tablet (480-768px): 2 עמודות
 * - Mobile (<480px): 1 עמודה
 * 
 * Props:
 * @param {Array} images - מערך תמונות מ-Redux (מה-API)
 * 
 * למה מערך ולא אובייקט?
 * - Backend מחזיר מערך של תמונות
 * - קל לעבור עליו עם .map()
 * 
 * Structure:
 * images = [
 *   { id: 1, webformatURL: '...', tags: '...', ... },
 *   { id: 2, webformatURL: '...', tags: '...', ... },
 *   ...9 תמונות סה"כ
 * ]
 * 
 * Accessibility:
 * - role="region" - מגדיר אזור בדף
 * - aria-label - מתאר את תוכן האזור
 */
function ImageGrid({ images }) {
  
  // ===============================
  // Data Processing - עיבוד נתונים
  // ===============================
  
  /**
   * displayImages - ודא שרק 9 תמונות מוצגות
   * 
   * למה צריך את זה?
   * - Backend אמור לשלוח 9, אבל זה safety check
   * - אם בטעות באו 10+ תמונות, נציג רק 9
   * - מונע שבירת הפריסה (3x3 = 9)
   * 
   * איך זה עובד?
   * - .slice(0, 9) חותך את המערך
   * - מחזיר רק את 9 הראשונים
   * - לא משנה את המערך המקורי (immutable)
   * 
   * דוגמה:
   * images = [1,2,3,4,5,6,7,8,9,10,11]
   * displayImages = [1,2,3,4,5,6,7,8,9]
   */
  const displayImages = images.slice(0, 9);

  // ===============================
  // Render - הצגת הקומפוננטה
  // ===============================

  return (
    <section 
      className="image-grid"
      role="region"                           // מגדיר אזור בדף
      aria-label="Image gallery with 9 photos" // תיאור לקוראי מסך
    >
      {/* 
        ==================== 
        Rendering Images - הצגת התמונות
        ==================== 
        
        איך זה עובד?
        1. displayImages.map() עובר על כל תמונה במערך
        2. לכל תמונה - יוצר ImageCard
        3. מעביר את האובייקט image כprops
        4. key={image.id} - React צריך זיהוי ייחודי לכל אלמנט
        
        למה key חשוב?
        - React משתמש בזה כדי לזהות שינויים
        - בלי key - React יעבוד לאט יותר
        - key חייב להיות ייחודי (id מושלם!)
        
        דוגמה:
        displayImages = [
          { id: 1, ... },
          { id: 2, ... },
          { id: 3, ... }
        ]
        
        מה נוצר:
        <ImageCard key={1} image={{id:1,...}} />
        <ImageCard key={2} image={{id:2,...}} />
        <ImageCard key={3} image={{id:3,...}} />
      */}
      {displayImages.map((image) => (
        <ImageCard 
          key={image.id}    // מזהה ייחודי לReact
          image={image}     // כל המידע על התמונה
        />
      ))}
    </section>
  );
}

// ===============================
// PropTypes - בדיקת טיפוסים
// ===============================

/**
 * PropTypes Validation
 * 
 * למה זה חשוב?
 * - מזהה באגים מוקדם
 * - מתעד מה הקומפוננטה מצפה לקבל
 * - אזהרות ברורות בconsole אם משהו לא נכון
 * 
 * מה זה בודק?
 * - images חייב להיות מערך (array)
 * - כל אלמנט במערך חייב להיות אובייקט
 * - כל אובייקט חייב להיות עם id (number)
 * - isRequired = חובה! אם חסר → אזהרה
 * 
 * למה רק id בבדיקה?
 * - ImageCard תבדוק את שאר השדות
 * - Grid רק צריך id בשביל key
 * - DRY principle - לא לחזור על בדיקות
 */
ImageGrid.propTypes = {
  images: PropTypes.arrayOf(          // חייב להיות מערך של...
    PropTypes.shape({                 // אובייקטים עם...
      id: PropTypes.number.isRequired, // id שהוא מספר (חובה!)
    })
  ).isRequired,  // כל המערך חובה
};
ImageGrid.propTypes = {
  images: PropTypes.arrayOf(          // חייב להיות מערך של...
    PropTypes.shape({                 // אובייקטים עם...
      id: PropTypes.number.isRequired, // id שהוא מספר (חובה!)
    })
  ).isRequired,  // כל המערך חובה
};

export default ImageGrid;