import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseProgressEndpoints } from "../apis";
import { setCompletedLectures } from "../../slices/viewCourseSlice";

export function updateCourseProgress(token,courseId, subSectionId) {
  return async (dispatch) => {
    const toastId = toast.loading("Saving progress...");
    try {
    

      const response = await apiConnector(
        "POST",
        courseProgressEndpoints.UPDATE_COURSE_PROGRESS_API,
        { courseId, subSectionId },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Sync redux with backend
      dispatch(setCompletedLectures(response.data.data));
    } catch (error) {
      console.log("Error updating progress", error.message);
      toast.error("Failed to save progress");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
