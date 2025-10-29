// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import ImageDetailsModal from '../ImageDetailsModal/ImageDetailsModal';
// import './ImageCard.css';

// /**
//  * ========================================
//  * ImageCard Component - קומפוננטת כרטיס תמונה
//  * ========================================
 
//  * Props:
//  * @param {Object} image - אובייקט התמונה מ-Pixabay API
//  * @param {number} image.id - מזהה ייחודי
//  * @param {string} image.webformatURL - URL של התמונה באיכות בינונית
//  * @param {string} image.tags - תגיות מופרדות בפסיקים
//  * @param {number} image.views - מספר צפיות
//  * @param {number} image.likes - מספר לייקים
//  * @param {number} image.downloads - מספר הורדות
//  * @param {string} image.user - שם המשתמש שהעלה
//  * 
//  * State:
//  * @state {boolean} isModalOpen - האם המודאל פתוח
//  * 
//  * Events:
//  * - onClick - פותח modal
//  * - onKeyDown - תמיכה במקלדת (Enter/Space)
//  * 
//  * Accessibility:
//  * - role="button" - מודיע לקוראי מסך שזה לחיץ
//  * - tabIndex={0} - מאפשר focus במקלדת
//  * - aria-label - מתאר מה יקרה בלחיצה
//  * - onKeyDown - מאפשר לחיצה עם Enter או Space
//  */
// function ImageCard({ image }) {
  
//   // ===============================
//   // State Management - ניהול מצב
//   // ===============================
  
//   /**
//    * isModalOpen - האם המודאל פתוח
//    * 
//    * למה צריך את זה?
//    * - כדי לשלוט על הצגת המודאל
//    * - false = מודאל סגור (ברירת מחדל)
//    * - true = מודאל פתוח
//    * 
//    * איך זה עובד?
//    * 1. כשלוחצים על הכרטיס → setIsModalOpen(true)
//    * 2. המודאל מופיע
//    * 3. כשלוחצים X במודאל → setIsModalOpen(false)
//    * 4. המודאל נסגר
//    */
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // ===============================
//   // Event Handlers - טיפול באירועים
//   // ===============================

//   /**
//    * handleClick - פתיחת המודאל
//    * 
//    * מתי מופעל?
//    * - כשלוחצים על הכרטיס (onClick)
//    * 
//    * מה קורה?
//    * - משנה את isModalOpen ל-true
//    * - זה גורם למודאל להופיע (render conditional)
//    */
//   const handleClick = () => {
//     setIsModalOpen(true);
//   };

//   /**
//    * handleCloseModal - סגירת המודאל
//    * 
//    * מתי מופעל?
//    * - כשלוחצים על X במודאל
//    * - כשלוחצים מחוץ למודאל
//    * - כשלוחצים ESC
//    * 
//    * מה קורה?
//    * - משנה את isModalOpen ל-false
//    * - המודאל נעלם
//    */
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   /**
//    * handleKeyDown - תמיכה במקלדת (Accessibility)
//    * 
//    * למה זה חשוב?
//    * - משתמשים ללא עכבר צריכים לגשת לכל הפונקציונליות
//    * - נגישות = חובה חוקית ומוסרית
//    * 
//    * מה זה עושה?
//    * - מקשיב ללחיצות מקשים
//    * - אם לחצו Enter או Space → פותח את המודאל
//    * - preventDefault מונע scroll במקרה של Space
//    * 
//    * @param {KeyboardEvent} e - אירוע המקלדת
//    */
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();  // מונע scroll אם לוחצים Space
//       handleClick();       // פותח את המודאל
//     }
//   };

//   // ===============================
//   // Render - הצגת הקומפוננטה
//   // ===============================

//   return (
//     <>
//       {/* ==================== */}
//       {/* כרטיס התמונה עצמו */}
//       {/* ==================== */}
//       <article 
//         className="image-card"
//         onClick={handleClick}           // לחיצה בעכבר
//         onKeyDown={handleKeyDown}       // לחיצה במקלדת
//         role="button"                   // מודיע לקוראי מסך: זה כפתור
//         tabIndex={0}                    // מאפשר focus במקלדת (Tab)
//         aria-label={`View details of ${image.tags}`}  // מה קורה בלחיצה
//       >
//         {/* מעטפת התמונה - שומרת על aspect ratio */}
//         <div className="image-wrapper">
          
//           {/* התמונה עצמה */}
//           <img 
//             src={image.webformatURL}    // URL של התמונה
//             alt={image.tags}            // תיאור לנגישות
//             loading="lazy"              // טעינה עצלה - מהירות!
//           />
          
//           {/* ==================== */}
//           {/* Overlay - מידע שמופיע ב-hover */}
//           {/* ==================== */}
//           <div className="image-overlay">
            
//             {/* תגיות (tags) */}
//             <p className="image-tags">
//               {image.tags}
//             </p>
            
//             {/* סטטיסטיקות - views ו-likes */}
//             <div className="image-stats">
//               <span title="Number of views">
//                 👁️ {image.views.toLocaleString()}  {/* toLocaleString = 1,234 */}
//               </span>
//               <span title="Number of likes">
//                 ❤️ {image.likes.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       </article>

//       {/* ==================== */}
//       {/* Modal - נפתח בלחיצה */}
//       {/* ==================== */}
      
//       {/* 
//         Conditional Rendering:
//         - אם isModalOpen === true → מציג את המודאל
//         - אם isModalOpen === false → לא מציג כלום
        
//         למה && ולא if?
//         - זה shorthand של React
//         - קצר ונקי
//         - אם התנאי false, React מתעלם מהשאר
//       */}
//       {isModalOpen && (
//         <ImageDetailsModal 
//           image={image}               // מעביר את המידע למודאל
//           onClose={handleCloseModal}  // מעביר פונקציית סגירה
//         />
//       )}
//     </>
//   );
// }

// // ===============================
// // PropTypes - בדיקת טיפוסים
// // ===============================

// /**
//  * PropTypes Validation
//  * 
//  * למה זה חשוב?
//  * - מזהה באגים מוקדם
//  * - מתעד מה הקומפוננטה צריכה
//  * - אזהרות ברורות אם שולחים נתונים לא נכונים
//  * 
//  * מה זה בודק?
//  * - image חייב להיות אובייקט
//  * - כל השדות הנדרשים (id, urls, tags, וכו') חייבים להיות מהטיפוס הנכון
//  * - isRequired = חובה! אם חסר - אזהרה בconsole
//  */
// ImageCard.propTypes = {
//   image: PropTypes.shape({
//     id: PropTypes.number.isRequired,          // מספר, חובה
//     webformatURL: PropTypes.string.isRequired, // string, חובה
//     tags: PropTypes.string.isRequired,         // string, חובה
//     views: PropTypes.number.isRequired,        // מספר, חובה
//     likes: PropTypes.number.isRequired,        // מספר, חובה
//     downloads: PropTypes.number.isRequired,    // מספר, חובה
//     collections: PropTypes.number,             // מספר, אופציונלי
//     user: PropTypes.string.isRequired,         // string, חובה
//   }).isRequired,  // כל האובייקט חובה
// };

// export default ImageCard;
import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageDetailsModal from '../ImageDetailsModal/ImageDetailsModal.jsx';
import './ImageCard.css';

function ImageCard({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article 
        className="image-card"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View details of ${image.tags}`}
      >
        <div className="image-wrapper">
          <img 
            src={image.webformatURL} 
            alt={image.tags}
            loading="lazy"
          />
          
          <div className="image-overlay">
            <p className="image-tags">{image.tags}</p>
            <div className="image-stats">
              <span>👁️ {image.views.toLocaleString()}</span>
              <span>❤️ {image.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </article>

      {isModalOpen && (
        <ImageDetailsModal 
          image={image} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageCard;