import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { courseendpoints } from "../apis";


// ===============CREATE COURSE ===========
export function createCourse(token, formData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading..");

    try {
      const response = await apiConnector(
        "POST",
        courseendpoints.CREATECOURSE_API,
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
      console.log("Error in creating course:", error.message);
      throw error;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ===============Delete  COURSE ===========
export function deleteCourse(token, courseId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading..");

    try {
      const response = await apiConnector(
        "DELETE",
        `${courseendpoints.DELETECOURSE_API}/${courseId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response;
    } catch (error) {
      console.log("Error in deleting course:", error.message);
      throw error;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ===============Update  COURSE ===========
export function updateCourse(token, formData, courseId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading..");
    try {
      const response = await apiConnector(
        "POST",
        `${courseendpoints.UPDATECOURSE_API}/${courseId}`,
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
      throw error;
      console.log("Error in updating  course  " + error.message);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ===============FETCH COURSES=================
export function fetchCourses(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading..");
    try {
      const response = await apiConnector(
        "GET",
        courseendpoints.FETCHCOURSES_API,
        null,
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
      console.log("Error in fetching all   courses  " + error.message);
    }
  };
}

// ===================GETCOMPLETE COURSE DETAIL======
export function getCourseDetails(token,courseId) {
  return async () => {
    const toastId = toast.loading("Loading course...");
    try {
      const response = await apiConnector(
        "GET",
        `${courseendpoints.GETCOURSEDETAILS_API}/${courseId}`,
        null,
        {
          Authorization: `Bearer ${token}`
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      console.error("Error fetching course details:", error.message);
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}
// ===================GETCOMPLETE USER COURSE DETAIL======
export function getUserCourseDetails(token,courseId) {
  return async () => {
    const toastId = toast.loading("Loading course...");
    try {
      const response = await apiConnector(
        "GET",
        `${courseendpoints.GETUSERCOURSE_API}/${courseId}`,
        null,
        {
          Authorization: `Bearer ${token}`
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      console.error("Error fetching course details:", error.message);
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// =========================get course Specific==============
export function getCourseSpecific(courseId) {
  return async () => {
    const toastId = toast.loading("Loading course...");
    try {
      const response = await apiConnector(
        "GET",
        `${courseendpoints.GETCOURSESPECIFIC_API}/${courseId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      console.error("Error fetching course details:", error.message);
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}



// ========================EditCOURSE DETAIL===============
export function editCourseDetails(token, courseId, status) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating course...");
    try {
      const response = await apiConnector(
        "POST",
        `${courseendpoints.EDITCOURSEDETAILS_API}/${courseId}`,
        { status },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Course status updated");
      return response;
    } catch (error) {
      console.log("Error updating course status:", error.message);
      toast.error("Failed to update course");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// ==========================INSTRUCTOR COURSES=============
export function instructorCourses(token) {
  return async (dispatch) => {
    const toastId = toast.loading("fetching courses...");
    try {
      const response = await apiConnector(
        "GET",
        courseendpoints.INSTRUCTORCOURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Courses fetched ");
      return response;
    } catch (error) {
      console.log("Error Fetching courses:", error.message);
      toast.error("Failed to Fetch courses");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
}
