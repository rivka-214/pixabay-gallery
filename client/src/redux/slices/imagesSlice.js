import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * ========================================
 * getImages - Async Thunk
 * ========================================
 * 
 * תפקיד:
 * מבצע API call לשרת לשליפת תמונות
 * 
 * פרמטרים:
 * @param {string} category - קטגוריה (animals, nature, וכו')
 * @param {number} page - מספר עמוד
 * @param {string} sortBy - מיון (id או latest)
 */
export const getImages = createAsyncThunk(
  'images/getImages',
  async ({ category, page, sortBy }) => {
    const response = await axios.get(`${API_BASE_URL}/images`, {
      params: { category, page, sortBy }
    });
    return response.data;
  }
);

/**
 * ========================================
 * Images Slice - Redux State
 * ========================================
 */
const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    currentCategory: 'nature',
    currentSortBy: 'latest',  // ברירת מחדל: date
  },
  reducers: {
    /**
     * nextPage - מעבר לעמוד הבא
     */
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    
    /**
     * prevPage - מעבר לעמוד הקודם
     */
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    
    /**
     * setCategory - שינוי קטגוריה
     */
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.currentPage = 1; // חזרה לעמוד 1
    },
    
    /**
     * setSortBy - שינוי סוג המיון
     * ⬅️ זה חדש!
     */
    setSortBy: (state, action) => {
      state.currentSortBy = action.payload;
      state.currentPage = 1; // חזרה לעמוד 1
    },
  },
  extraReducers: (builder) => {
    builder
      // טעינה
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // הצלחה
  .addCase(getImages.fulfilled, (state, action) => {
  state.loading = false;
  state.images = action.payload.data || [];
  state.totalPages = action.payload.pagination?.totalPages || 1;
  
  console.log('✅ Redux updated:', {
    images: state.images.length,
    totalPages: state.totalPages,
    currentPage: state.currentPage
  });
})
      // שגיאה
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ייצוא actions
export const { 
  nextPage, 
  prevPage, 
  setCategory,
  setSortBy  // ⬅️ זה חדש!
} = imagesSlice.actions;

// Selectors
export const selectImages = (state) => state.images.images;
export const selectLoading = (state) => state.images.loading;
export const selectError = (state) => state.images.error;
export const selectCurrentPage = (state) => state.images.currentPage;
export const selectTotalPages = (state) => state.images.totalPages;
export const selectCurrentCategory = (state) => state.images.currentCategory;
export const selectCurrentSortBy = (state) => state.images.currentSortBy;

export default imagesSlice.reducer;