import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { ratingendpoints } from "../apis";

export function getAverageRating(courseId) {
  return async () => {
    try {
      const response = await apiConnector(
        "GET",
        `${ratingendpoints.GETAVERAGERATING_API}/${courseId}`
      );

      if (!response.data.success) {
        return { average: 0, count: 0 };
      }

      return {
        average: response.data.average,
        count: response.data.count ?? 0,
      };
    } catch (error) {
      return { average: 0, count: 0 };
    }
  };
}

// ====================get all rating
export function getAllRating(courseId) {
  return async () => {
    try {
      const response = await apiConnector(
        "GET",
        ratingendpoints.GETALLRATING_API
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      console.log("error" + error.message);
    }
  };
}

// ================= CREATE =================
export function createRating(courseId, token, comment, rate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Saving review...");

    try {
      const response = await apiConnector(
        "POST",
        `${ratingendpoints.SAVERATING_API}/${courseId}`,
        { comment, rate },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Review added");
      return response.data.data;
    } catch (error) {
      toast.error(error.message || "Failed to save review");
      return null;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ================= UPDATE =================
export function updateRating(reviewId, newrate, newcomment, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Updating review...");

    try {
      const response = await apiConnector(
        "PUT",
        ratingendpoints.UPDATERATING_API,
        {
          reviewId,
          newrate,
          newcomment,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Review updated");
      return response.data.data;
    } catch (error) {
      toast.error(error.message || "Failed to update review");
      return null;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}
