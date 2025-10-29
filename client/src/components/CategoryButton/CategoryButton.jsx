import { useState } from 'react';
import CategoryModal from '../CategoryModal/CategoryModal.jsx';
import './CategoryButton.css';

function CategoryButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className="category-button"
        onClick={() => setIsModalOpen(true)}
      >
        📁 Change Category
      </button>

      {isModalOpen && (
        <CategoryModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default CategoryButton;