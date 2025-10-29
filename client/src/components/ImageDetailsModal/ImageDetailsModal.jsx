import PropTypes from 'prop-types';
import './ImageDetailsModal.css';

/**
 * ImageDetailsModal - מודאל לפרטי תמונה
 */
function ImageDetailsModal({ image, onClose }) {
  // סגירה בלחיצה על ESC
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* כפתור סגירה */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* תמונה */}
        <img src={image.largeImageURL} alt={image.tags} />

        {/* פרטים */}
        <div className="modal-details">
          <h2>{image.tags}</h2>
          
          <div className="modal-stats">
            <div className="stat">
              <span className="label">👁️ Views:</span>
              <span className="value">{image.views.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="label">❤️ Likes:</span>
              <span className="value">{image.likes.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="label">📥 Downloads:</span>
              <span className="value">{image.downloads.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="label">💬 Comments:</span>
              <span className="value">{image.comments.toLocaleString()}</span>
            </div>
          </div>

          <div className="modal-user">
            <span className="label">👤 By:</span>
            <span className="value">{image.user}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ImageDetailsModal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageDetailsModal;