import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, selectCurrentSortBy } from '../../redux/slices/imagesSlice';
import './SortButton.css';

/**
 * ========================================
 * SortButton Component - כפתור מיון
 * ========================================
 * 
 * תפקיד:
 * מאפשר למיין תמונות לפי ID או DATE
 * 
 * דרישות שמתמלאות:
 * ✅ "Sorting function on the images by id or date"
 * 
 * איך זה עובד:
 * 1. לחיצה על הכפתור
 * 2. מחליף בין 'id' ל-'latest' (date)
 * 3. Redux מתעדכן
 * 4. useEffect ב-App תופס שינוי
 * 5. fetch חדש מהשרת
 * 6. Backend ממיין לפי הבקשה
 */
function SortButton() {
  const dispatch = useDispatch();
  const currentSortBy = useSelector(selectCurrentSortBy);

  /**
   * handleToggle - החלפה בין מיון לפי ID ו-DATE
   * 
   * לוגיקה:
   * - אם עכשיו id → עבור ל-latest (date)
   * - אם עכשיו latest → עבור ל-id
   */
  const handleToggle = () => {
    const newSort = currentSortBy === 'id' ? 'latest' : 'id';
    dispatch(setSortBy(newSort));
  };

  return (
    <button 
      className="sort-button"
      onClick={handleToggle}
      title={`Currently sorted by ${currentSortBy === 'id' ? 'ID' : 'Date'}`}
      aria-label={`Sort by ${currentSortBy === 'id' ? 'Date' : 'ID'}`}
    >
      🔄 Sort: {currentSortBy === 'id' ? 'ID' : 'Date'}
    </button>
  );
}

export default SortButton;