export const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);

export const categories = {
  CATEGORIES_API: `${BASE_URL}/category/fetch-category`,
  SINGLECATEGORY_API: `${BASE_URL}/category/single-category`,
  CATEGORYPAGEDETAILS_API: `${BASE_URL}/category/getcategorypagedetails`,
};

// AUTH ENDPOINTS
export const authendpoints = {
  SENDOTP_API: `${BASE_URL}/auth/sendotp`,
  VERIFYOTP_API: `${BASE_URL}/auth/verifyotp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESETPASSWORDTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`,
  UPDATEPASSWORD_API: `${BASE_URL}/auth/changepassword`,
};

// PROFILE ENDPOINTS
export const profileendpoints = {
  GETUSERDETAILS_API: `${BASE_URL}/auth/getuserdetails`,
  UPDATEPROFILE_API: `${BASE_URL}/profile/updateprofile`,
  UPDATEPROFILEPICTURE_API: `${BASE_URL}/profile/update-profile-picture`,
  DELETEPROFILE_API: `${BASE_URL}/profile/deleteprofile`,
  GETENROLLEDCOURSES_API: `${BASE_URL}/profile/enrolled-courses`,
};

// Course Endpoints
export const courseendpoints = {
  GETAVERAGERATING_API: `${BASE_URL}/course/average-rating`,
  CREATECOURSE_API: `${BASE_URL}/course/create-course`,
  UPDATECOURSE_API: `${BASE_URL}/course/update-course`,
  FETCHCOURSES_API: `${BASE_URL}/course/fetch-courses`,
  GETCOURSEDETAILS_API: `${BASE_URL}/course/instructor/course`,
  GETUSERCOURSE_API: `${BASE_URL}/course/user/course`,
  GETCOURSESPECIFIC_API: `${BASE_URL}/course/course`,
  EDITCOURSEDETAILS_API: `${BASE_URL}/course/editcourse-details`,
  INSTRUCTORCOURSES_API: `${BASE_URL}/course/instructor/my-courses`,
  DELETECOURSE_API: `${BASE_URL}/course/instructor/delete-course`,
};

// section Endpoints
export const sectionendpoints = {
  CREATESECTION_API: `${BASE_URL}/section/createsection`,
  UPDATESECTION_API: `${BASE_URL}/section/updatesection`,
  DELETESECTION_API: `${BASE_URL}/section/deletesection`,
  FETCHSECTIONS_API: `${BASE_URL}/section/fetchsections`,
};
// subsection Endpoints
export const subsectionendpoints = {
  CREATESUBSECTION_API: `${BASE_URL}/subsection/createsubsection`,
  UPDATESUBSECTION_API: `${BASE_URL}/subsection/updatesubsection`,
  DELETESUBSECTION_API: `${BASE_URL}/subsection/deletesubsection`,
  FETCHALLSUBSECTIONS_API: `${BASE_URL}/subsection/fetchsubsections`,
  FETCHSUBSECTION_API: `${BASE_URL}/subsection/fetchsubsection`,
};

// CONTACT US Endpoints
export const contactusendpoints = {
  CONTACTUS_API: `${BASE_URL}/contactus`,
};

// TAG ENDPOINTS
export const tagendpoints = {
  FETCHTAG_API: `${BASE_URL}/fetchtags`,
  CREATETAG_API: `${BASE_URL}/createtag`,
};

// RATING ENDPOINTS
export const ratingendpoints = {
  GETAVERAGERATING_API: `${BASE_URL}/getaveragerate`,
  SAVERATING_API:`${BASE_URL}/saverating`,
  UPDATERATING_API:`${BASE_URL}/updaterating`,
  GETALLRATING_API:`${BASE_URL}/getallratings`,
};



// payment EndPOINTs
export const studentendpoints = {
  CAPTUREPAYMENT_API:`${BASE_URL}/payment/capturepayment`,
  VERIFYPAYMENT_API:`${BASE_URL}/payment/verifypayment`,
}


// course progress endpoints 
export const courseProgressEndpoints = {
  UPDATE_COURSE_PROGRESS_API: `${BASE_URL}/progress/update-progress`,
};
