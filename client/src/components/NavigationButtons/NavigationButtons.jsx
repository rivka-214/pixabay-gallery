import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  selectCurrentPage, 
  selectTotalPages 
} from '../../redux/slices/imagesSlice';
import './NavigationButtons.css';

/**
 * NavigationButtons Component - כפתורי ניווט
 */
function NavigationButtons({ onPrev, onNext }) {
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav 
      className="navigation-buttons" 
      aria-label="Pagination navigation"
    >
      {/* Prev Button */}
      <button
        onClick={onPrev}
        disabled={isFirstPage}
        className="nav-button nav-button-prev"
        aria-label="Go to previous page"
        title="Previous 9 images"
      >
        ← Prev
      </button>

      {/* Page Info - תוקן! */}
      <span className="page-info" aria-live="polite">
        Page {currentPage} of {totalPages || 0}
      </span>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isLastPage}
        className="nav-button nav-button-next"
        aria-label="Go to next page"
        title="Next 9 images"
      >
        Next →
      </button>
    </nav>
  );
}

NavigationButtons.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default NavigationButtons;