import './LoadingSpinner.css';

/**
 * ========================================
 * LoadingSpinner Component - קומפוננטת טעינה
 * ========================================
 */
function LoadingSpinner() {
  return (
    <div 
      className="loading-spinner-container" 
      role="status"           // אומר לקוראי מסך: זה status message
      aria-live="polite"      // מודיע על שינויים באופן מנומס (לא מפריע לקריאה נוכחית)
    >
      {/* הספינר עצמו - רק ויזואלי */}
      <div 
        className="loading-spinner" 
        aria-hidden="true"    // מסתיר מקוראי מסך - זה רק animation
      />
      
      {/* הטקסט - זה מה שקוראי מסך יקראו */}
      <p className="loading-text">
        Loading images...
      </p>
    </div>
  );
}

export default LoadingSpinner;