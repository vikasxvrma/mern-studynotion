import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoofLectures: 0,
};

const viewCourseSlice = createSlice({
  name: "viewcourse",
  initialState: initialState,
  reducers: {
    setcourseSectionData(state, value) {
      state.courseSectionData = value.payload;
    },
    setcourseEntireData(state, value) {
      state.courseEntireData = value.payload;
    },
    setCompletedLectures(state, value) {
      state.completedLectures = value.payload;
    },
    setTotalNoofLectures(state, value) {
      state.totalNoofLectures = value.payload;
    },
    updateCompletedLectures(state, value) {
      state.completedLectures = [...state.completedLectures, value.payload];
    },
    resetViewCourseState() {
      return initialState;
    },
  },
});

export const {
  setCompletedLectures,
  setTotalNoofLectures,
  setcourseEntireData,
  setcourseSectionData,
  updateCompletedLectures,
  resetViewCourseState
} = viewCourseSlice.actions;


export default viewCourseSlice.reducer;