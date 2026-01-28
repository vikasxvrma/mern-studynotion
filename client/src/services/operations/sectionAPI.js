import { useDispatch } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import { sectionendpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

// =====================CREATE SECTION
export function createSection(token, sectionName, courseId) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector(
        "POST",
        `${sectionendpoints.CREATESECTION_API}/${courseId}`,
        { sectionName },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      return response;
    } catch (error) {
      toast.dismiss(toastId);
      console.log("Error in creating section:", error.message);
      throw error;
    }
  };
}

// ===================UPDATE SECTION==================

export function updateSection(token, sectionName, sectionId, courseId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector(
        "PUT",
        `${sectionendpoints.UPDATESECTION_API}/${courseId}/${sectionId}`,
        { newSectionName: sectionName },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    } catch (error) {
      console.log("Error in updating section:", error.message);
      throw error;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ===================DELETE  SECTION==================

export function deleteSection(token, sectionId, courseId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        `${sectionendpoints.DELETESECTION_API}/${sectionId}/${courseId}`,
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    } catch (error) {
      console.log("Error deleting section:", error.message);
      throw error;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// =======================FETCH SECTIONs========================

export function fetchSections(token, courseId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector(
        "GET",
        `${sectionendpoints.FETCHSECTIONS_API}/${courseId}`,
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    } catch (error) {
      console.log("Error fetching sections:", error.message);
      throw error;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}
