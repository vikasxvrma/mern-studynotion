import { apiConnector } from "../apiconnector";
import { tagendpoints } from "../apis";

export function createTag(token, tagname, courseId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        tagendpoints.CREATETAG_API,
        { tagname, courseId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      console.log(
        "error in tag creation:",
        error.response?.data || error.message
      );
      return null;
    }
  };
}
