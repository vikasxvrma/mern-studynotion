import { useDispatch } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import { sectionendpoints, subsectionendpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

// =====================CREATE SUBSECTION
export function createSubSection(token, formData, sectionId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId= toast.loading("loading..");
    try {
      const response = await apiConnector(
        "POST",
        `${subsectionendpoints.CREATESUBSECTION_API}/${sectionId}`,
        formData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response;
    } catch (error) {
      console.log("Error in creating  subsection  " + error.message);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ===================UPDATE SUBSECTION==================

export function updateSubSection(token, formData, subSectionId, sectionId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId= toast.loading("loading..");
    try {
      const response = await apiConnector(
        "PUT",
        `${subsectionendpoints.UPDATESUBSECTION_API}/${sectionId}/${subSectionId}`,
        formData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

    
      return response;
    } catch (error) {
      toast.error("Error in updation");
      console.log(error);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ===================DELETE  SUBECTION==================

export function deleteSubSection(token, subsectionId, sectionId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId= toast.loading("loading..");
    try {
      const response = await apiConnector(
        "DELETE",
        `${subsectionendpoints.DELETESUBSECTION_API}/${subsectionId}/${sectionId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("subsection deleted  successfully");
      return response;
    } catch (error) {
      console.log("Error in deleted  subsection  " + error.message);
      toast.error("Error in deletion");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// =======================FETCH SUBSECTIONS========================

export function fetchAllSubSections(token,sectionId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId= toast.loading("loading..");
    try {
      const response = await apiConnector(
        "GET",
        `${subsectionendpoints.FETCHALLSUBSECTIONS_API}/${sectionId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("subsections fetched successfully");
      return response;
    } catch (error) {
      toast.dismiss(toastId);
      console.log(
        "Error in  fetching subsections of this  course " + error.message
      );
      toast.error("Error in fetching all subsection");
    }
  };
}

 
// =======================FETCH SINGLE SECTION========================

export const fetchSubSection = (token,courseId, sectionId, subSectionId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId=toast.loading("loading...")
    try {
      const response = await apiConnector(
        "GET",
       `${BASE_URL}/subsection/course/${courseId}/section/${sectionId}/subsection/${subSectionId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      console.log("Error in fetching subsection ", error.message);
      return null;
    }finally{
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

