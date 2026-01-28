import { useSelector } from "react-redux";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { authendpoints, profileendpoints } from "../apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetCourseState } from "../../slices/courseSlice";
import { resetViewCourseState } from "../../slices/viewCourseSlice";

// =======================================
// SEND OTP
// =======================================
export function sendOtp(email) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("POST", authendpoints.SENDOTP_API, {
        email,
      });
      console.log("SEND OTP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully");
      return true;
    } catch (error) {
      console.log("ERROR IN SENDING OTP:", error);
      toast.error(error.message);
      return false;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// =======================================
// VERIFY OTP
// =======================================
export function verifyOtp(email, otp) {
  return async () => {
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("POST", authendpoints.VERIFYOTP_API, {
        email,
        otp,
      });
      console.log("VERIFY OTP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("OTP verified successfully");
      return true;
    } catch (error) {
      toast.dismiss(toastId);
      console.log("ERROR VERIFYING OTP:", error);
      toast.error("Invalid OTP. Try again.");
      return false;
    }
  };
}

// =======================================
// SIGN UP
// =======================================
export function signUp(formData) {
  const { email, firstName, lastName, password, confirmpassword, accountType } =
    formData;

  return async () => {
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("POST", authendpoints.SIGNUP_API, {
        email,
        firstName,
        lastName,
        accountType,
        password,
        confirmpassword,
      });

      console.log("SIGNUP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("User signed up successfully");
      return true;
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message || "Signup failed");
      return false;
    }
  };
}

// =======================================
// LOG IN
// =======================================
export function logIn(email, password) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("POST", authendpoints.LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      //    fetch user details
      dispatch(setToken(response.data.token));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// =======================================
// LOG OUT
// =======================================
export function logOut() {
  return async (dispatch) => {
    const toastId = toast.loading("Logging out...");

    try {
      // Clear auth
      dispatch(setToken(null));
      localStorage.removeItem("token");

      // Reset ALL user related slices
      dispatch(resetCourseState());        // courses
      dispatch(resetViewCourseState());    // progress, lectures
      // dispatch(resetProfile());            // user info

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// =======================================
// SEND RESET PASSWORD TOKEN
// =======================================
export function getPassWordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector(
        "POST",
        authendpoints.RESETPASSWORDTOKEN_API,
        { email }
      );

      console.log("RESET PASSWORD TOKEN RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset link sent to your email");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR:", error);
      toast.error("Failed to send reset link");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// =======================================
// RESET PASSWORD
// =======================================
export function resetPassword(token, newPassword, confirmPassword) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector(
        "POST",
        authendpoints.RESETPASSWORD_API,
        {
          tokentochange: token,
          newPassword,
          confirmPassword,
        }
      );

      console.log("RESET PASSWORD RESPONSE:", response);

      if (!response.data.success) {
        toast.error(response.data.message);
        return false;
      }

      toast.success("Password updated successfully!");
      return true;
    } catch (error) {
      console.log("RESET PASSWORD ERROR:", error);
      toast.error("Failed to RESET password");
      return false;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// =========CHANGE PASSWORD======================
export function changePassword(newPassword, confirmPassword) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await apiConnector(
        "POST",
        authendpoints.UPDATEPASSWORD_API,
        { newPassword, confirmPassword },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return false;
      }

      toast.success("Password updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update password");
      return false;
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

// ====================Get User Details==============
export function getUserDetails() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading...");
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      const response = await apiConnector(
        "GET",
        profileendpoints.GETUSERDETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userData = response.data.userData;
      dispatch(setUser(userData));
      console.log(userData);
      //   toast.success("userdetails fetched"); // just to debug
    } catch (error) {
      console.log("USER FETCH ERROR →", error);
      dispatch(setUser(null));
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}
