import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  step: 1,
  editCourse: false,
  paymentLoading: false,
  totalCourses: 0,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setCourse(state, action) {
      state.course = action.payload;
    },
    setEditCourse(state, action) {
      state.editCourse = action.payload;
    },
    resetCourseState(state) {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
      state.paymentLoading = false;
    },
    setPaymentLoading(state, action) {
      state.paymentLoading = action.payload;
    },
    setTotalCourses(state, action) {
      state.totalCourses = action.payload;
    },
  },
});

export const {
  setCourse,
  setEditCourse,
  setStep,
  resetCourseState,
  setPaymentLoading,
  setTotalCourses,
} = courseSlice.actions;

export default courseSlice.reducer;
