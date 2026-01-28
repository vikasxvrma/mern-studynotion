import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { profileendpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

// ================= UPDATE PROFILE =================
export function updateProfile(token, newUserData) {
  const { firstName, lastName, dob, about, gender, phone } = newUserData;

  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Updating profile...");

    try {
      const response = await apiConnector(
        "POST",
        profileendpoints.UPDATEPROFILE_API,
        { firstName, lastName, gender, dob, about, phone },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // backend does not return user here → merge manually
      dispatch((dispatch, getState) => {
        const existingUser = getState().profile.user;
        dispatch(
          setUser({
            ...existingUser,
            firstName,
            lastName,
            additionalDetails: {
              ...existingUser.additionalDetails,
              gender,
              dob,
              about,
              phone,
            },
          })
        );
      });

      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Profile update failed");
      return false;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ================= UPDATE PROFILE PICTURE =================
export function updateProfilePicture(token, formData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Uploading image...");

    try {
      const response = await apiConnector(
        "PUT",
        profileendpoints.UPDATEPROFILEPICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

     
      dispatch(setUser(response.data.user));

      toast.success("Profile picture updated successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Image upload failed");
      return false;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ================= GET ENROLLED COURSES =================
export function getEnrolledCourses(token) {
  return async () => {
    const toastId = toast.loading("Loading courses...");
    try {
      const response = await apiConnector(
        "GET",
        profileendpoints.GETENROLLEDCOURSES_API,
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
      toast.error(error.message || "Failed to fetch courses");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// ================= DELETE ACCOUNT =================
export function deleteProfile(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Deleting account...");

    try {
      const response = await apiConnector(
        "DELETE",
        profileendpoints.DELETEPROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.removeItem("token");

      toast.success("Account deleted successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Account deletion failed");
      return false;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}
