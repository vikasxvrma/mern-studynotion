import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { FaCheck } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";
import {
  IoIosAddCircleOutline,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { categories } from "../../../services/apis";
import { apiConnector } from "../../../services/apiconnector";
import {
  createCourse,
  editCourseDetails,
  updateCourse,
} from "../../../services/operations/courseAPI";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../../../services/operations/sectionAPI";

import {
  resetCourseState,
  setCourse,
  setEditCourse,
  setStep,
} from "../../../slices/courseSlice";

import RequirementField from "./RequirementField";
import ChipInput from "./chipInput";

import ConfirmationModal from "../../common/ConfirmationModal";
import { GrAddCircle, GrView } from "react-icons/gr";
import SubSectionModal from "./SubSectionModal";
import { deleteSubSection } from "../../../services/operations/subSectionAPI";
import { setLoading } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const RendersStep = () => {
  /* ===================== LOCAL STATE ===================== */
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(null);

  // to view subsection or lecture
  const [showSubsection, setShowSubsection] = useState(null);

  // to toggle between edit and save
  const [editSubSectionId, setEditSubSectionId] = useState(null);

  // to show subsection modal or not  to do subsection operation
  const [subSectionModal, setSubSectionModal] = useState(false);
  const [activeLecture, setActiveLecture] = useState(null);

  // to show subsection thing or not each section
  const [activeSectionId, setActiveSectionId] = useState(null);
  // i want the same button to perform edit + creation of section
  const [sectionId, setSectionId] = useState(null);

  /* ===================== REDUX ===================== */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { step, editCourse, course } = useSelector((state) => state.course);

  /* ===================== REACT HOOK FORM ===================== */
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm({ shouldUnregister: false });

  /* ===================== API ===================== */
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setCategory(result.data.categories);
    } catch (error) {
      console.log("Error in fetching category list");
    }
  };

  console.log("COURSE TAGS RAW:", course?.tags);
console.log(
  "COURSE TAGS TYPE:",
  Array.isArray(course?.tags),
  course?.tags?.map?.(t => typeof t)
);

  /* ===================== EFFECTS ===================== */
  useEffect(() => {
    fetchSubLinks();

    if (!course) return;

    reset({
      coursename: course.coursename,
      coursedescription: course.coursedescription,
      price: course.price,
      category: course.category._id,
      whatyouwilllearn: course.whatyouwilllearn,
      tags: course.tags.map((t) => t.name),
      requirements: course.requirements || [],
    });
    setTimeout(() => {
      console.log("RHF TAGS:", getValues("tags"));
      console.log("RHF REQS:", getValues("requirements"));
    }, 0);

    setPreview(course.thumbnail);
  }, [course, editCourse, reset]);

  /* ===================== HELPERS ===================== */
  const isFormUpdated = () => {
    if (!course) return false;
    const current = getValues();

    return (
      current.coursename !== course.coursename ||
      current.coursedescription !== course.coursedescription ||
      Number(current.price) !== Number(course.price) ||
      current.category !== course.category._id ||
      current.whatyouwilllearn !== course.whatyouwilllearn ||
      current.tags.toString() !== course.tags.toString() ||
      current.requirements.toString() !== course.requirements.toString()
    );
  };

  /* ===================== HANDLERS ===================== */
  const withoutSaveHandler = (e) => {
    e.preventDefault();
    dispatch(setStep(2));
  };

  const step1SubmitHandler = async (data) => {
    const currentValues = getValues();
    const formData = new FormData();

    /* ===== EDIT COURSE ===== */
    if (editCourse && course) {
      if (!isFormUpdated()) {
        toast.error("No Changes made to the form");
        return;
      }
      if (currentValues.coursename !== course.coursename) {
        formData.append("coursename", data.coursename);
      }

      if (currentValues.coursedescription !== course.coursedescription) {
        formData.append("coursedescription", data.coursedescription);
      }

      if (currentValues.price !== course.price) {
        formData.append("price", data.price);
      }

      if (currentValues.category !== course.category._id) {
        formData.append("category", data.category);
      }

      if (currentValues.whatyouwilllearn !== course.whatyouwilllearn) {
        formData.append("whatyouwilllearn", data.whatyouwilllearn);
      }

      if (
        currentValues.requirements.toString() !== course.requirements.toString()
      ) {
        formData.append("requirements", JSON.stringify(data.requirements));
      }

      if (currentValues.tags.toString() !== course.tags.toString()) {
        formData.append("tags", JSON.stringify(data.tags));
      }
      const courseId = course._id;
      const response = await dispatch(updateCourse(token, formData, courseId));

      if (response) {
        dispatch(setCourse(response.data.data));
        dispatch(setStep(2));
        toast.success("Course updated successfully");
      } else {
        toast.error("Error in updating course");
      }
      return;
    }

    /* ===== CREATE COURSE ===== */
    formData.append("coursename", data.coursename);
    formData.append("coursedescription", data.coursedescription);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("whatyouwilllearn", data.whatyouwilllearn);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("requirements", JSON.stringify(data.requirements));

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    const response = await dispatch(createCourse(token, formData));

    if (response) {
      dispatch(setCourse(response.data.data));
      dispatch(setStep(2));
      dispatch(setEditCourse(true));
      toast.success("Course created successfully");
    } else {
      toast.error("Error in course creation");
    }
  };

  const step2NextHandler = async (e) => {
    if (course?.sections.length === 0) {
      toast.error("please create Atleast ONE section for this course");
      return;
    }
    if (course.sections.some((sec) => sec.subSections.length === 0)) {
      toast.error("please add Atleast ONE lecture for this course");
      return;
    }

    dispatch(setStep(3));
  };

  const step2BackHandler = (e) => {
    e.preventDefault();
    dispatch(setStep(1));
  };

  const createSectionHandler = async () => {
    if (!sectionName.trim()) {
      toast.error("Section name cannot be empty");
      return;
    }

    if (!course?._id) {
      toast.error("Course not created yet");
      return;
    }

    try {
      // ===== UPDATE SECTION =====
      if (sectionId) {
        const response = await dispatch(
          updateSection(token, sectionName, sectionId, course._id)
        );

        if (response) {
          dispatch(setCourse(response.data.data));
          setSectionName("");
          setSectionId(null);
          toast.success("Section updated");
        }
        return;
      }

      // ===== CREATE SECTION =====
      const response = await dispatch(
        createSection(token, sectionName, course._id)
      );

      if (response) {
        dispatch(setCourse(response.data.data));
        setSectionName("");
        toast.success("Section created");
      }
    } catch (err) {
      toast.error("Section operation failed");
    }
  };

  // ====================UPDPATION OF SECTION=================
  const sectionEditHandler = (id) => {
    const section = course.sections.find((sec) => sec._id === id);
    if (!section) {
      toast.error("first create the section ");
      return;
    }

    // if section exist then fill it input so that user can update
    setSectionName(section.sectionName);
    // so that create function knows which section to update
    setSectionId(section._id);
    // this was the whole work for edit click now create section will handle
  };

  // ====================CANCEL EDIT  OF SECTION=================
  const cancelEditHandler = () => {
    // remove sectionName as nothing to update
    setSectionName("");
    // make sectionId null as there is nothing to edit or no section to edit
    setSectionId(null);
    // this was the whole work for edit click now create section will handle
  };

  // the ultimate delete click handler =======================
  async function deleteClickHandler(id) {
    try {
      const response = await dispatch(deleteSection(token, id, course._id));

      if (response) {
        dispatch(setCourse(response.data.data));
        setSectionId(null);
        setConfirmationModal(null);
        toast.success("Section deleted");
      }
    } catch {
      toast.error("Deletion failed");
      setConfirmationModal(null);
    }
  }

  // ========================DELETESECTION=========================
  function sectionDeleteHandler(id) {
    const section = course.sections.find((sec) => sec._id === id);
    if (!section) {
      toast.error("section doesnot exist (Reload) ");
      return;
    }

    // set section id so that it can be deleted
    setSectionId(section._id);
    // set a modal for delete
    setConfirmationModal({
      heading: "Are you sure?",
      text: "Section Will be deleted from course Subsections Too",
      btn1: "Delete",
      btn2: "Cancel",
      btn1handler: () => {
        deleteClickHandler(id);
      },
      btn2handler: () => setConfirmationModal(null),
    });
  }

  // ===============Subsections Handler =================
  const toggleSectionId = (id) => {
    setActiveSectionId((prev) => (prev === id ? null : id));
  };

  // ====================add lecture Handler ===============
  const addLectureHandler = (id) => {
    setSectionId(id);
    setEditSubSectionId(null);
    setSubSectionModal(true);
    setActiveLecture(null);
  };
  const handleEditLecture = (lecture, id) => {
    setSectionId(id);
    setEditSubSectionId(lecture._id);
    setActiveLecture(lecture);
    setSubSectionModal(true);
  };

  // handle view of lecture or subsection
  const viewSubSectionHandler = (lecture, id) => {
    setSectionId(id);
    // setEditSubSectionId(lecture._id);
    setActiveLecture(lecture);
    setSubSectionModal(true);
    setShowSubsection(lecture._id);
  };
  // the final click on delete which deletes the lecture
  const deleteLectureHandler = async (lecture, id) => {
    try {
      const response = await dispatch(deleteSubSection(token, lecture._id, id));
      if (response) {
        dispatch(setCourse(response.data.data));
        setConfirmationModal(null);
        toast.success("lecture deleted successfully ");
      }
    } catch (error) {
      console.log("error in lecture deleteion ");
      console.log(error.message);
      setConfirmationModal(null);
    }
  };

  const handleDeleteLecture = (lecture, id) => {
    //  check for section exist or not

    if (!course?.sections) {
      toast.error("Course data not available");
      return;
    }
    const section = course.sections.find((sec) => sec._id === id);
    if (!section) {
      toast.error("section does not exist (Reload)");
      return;
    }
    // set a modal for delete
    setConfirmationModal({
      heading: "Are you sure?",
      text: "lecture Will be deleted from this section",
      btn1: "Delete",
      btn2: "Cancel",
      btn1handler: () => {
        deleteLectureHandler(lecture, id);
      },
      btn2handler: () => setConfirmationModal(null),
    });
  };

  // modal datas that need to be sent as prop
  const modalData = {
    sectionId,
    setSubSectionModal,
    lecture: activeLecture,
    setActiveLecture,
    editSubSectionId,
    showSubsection,
    setShowSubsection,
    setEditSubSectionId,
  };

  const step3PublishHandler = async () => {
    if (
      (course?.status === "PUBLISHED" && getValues("public") === true) ||
      (course.status === "DRAFT" && getValues("public") === false)
    ) {
      // no updation in form
      // no api call
      // just go back to my courses
      navigate("/dashboard/my-courses");
    }

    // logic for publishing the course
    const courseStatus = getValues("public") ? "PUBLISHED" : "DRAFT";
    dispatch(setLoading(true));
    const result = await dispatch(
      editCourseDetails(token, course._id, courseStatus)
    );
    if (result) {
      dispatch(setLoading(false));
      dispatch(resetCourseState()); // i did it because now addition is over if sb comes for editing then setCourse() and setEdit course true
      navigate("/dashboard/my-courses");
    }
  };

  const step3BackHandler = (e) => {
    e.preventDefault();
    dispatch(setStep(2));
  };

  /* ===================== UI ===================== */
  return (
    <div className="w-full mx-auto flex flex-col gap-5">
      {/* ================= Progress ================= */}
      <div className="w-7/12 ml-16 mt-12 flex gap-3 items-center">
        {[1, 2, 3].map((num, idx) => {
          const isCompleted = step > num;
          const isActive = step === num;

          return (
            <div key={num} className="flex items-center">
              <div className="flex flex-col gap-1 items-center">
                <div
                  className={`h-8 w-8 rounded-full flex justify-center items-center border-2 ${
                    isCompleted || isActive
                      ? "bg-yellow-25 border-yellow-25"
                      : "border-richblack-400"
                  }`}
                >
                  {isCompleted ? (
                    <FaCheck className="text-richblack-900 text-sm" />
                  ) : (
                    <span
                      className={`font-bold text-sm ${
                        isActive ? "text-richblack-900" : "text-white"
                      }`}
                    >
                      {num}
                    </span>
                  )}
                </div>

                <div
                  className={`text-sm opacity-70 text-center ${
                    isCompleted || isActive ? "text-yellow-25" : "text-white"
                  }`}
                >
                  {num === 1
                    ? "Course Information"
                    : num === 2
                    ? "Course Builder"
                    : "Course Publish"}
                </div>
              </div>

              {idx !== 2 && (
                <div
                  className={`h-[2px] w-32 mx-2 -translate-y-5 border-t-2 border-dashed ${
                    isCompleted ? "border-yellow-25" : "border-richblack-500"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ================= STEP 1 FORM ================= */}
      {step === 1 && (
        <form
          onSubmit={handleSubmit(step1SubmitHandler)}
          className="flex flex-col gap-6 bg-richblack-800 p-6 rounded-lg w-10/12 mx-auto"
        >
          {/* Course Name */}
          <div className="flex flex-col gap-2">
            <label className="text-richblack-25 text-sm font-medium">
              Course Name <sup className="text-red-500">*</sup>
            </label>
            <input
              {...register("coursename", {
                required: "Course name is required",
              })}
              placeholder="Enter course name"
              className="bg-richblack-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-25"
            />
            {errors.coursename && (
              <p className="text-red-400 text-sm">
                {errors.coursename.message}
              </p>
            )}
          </div>

          {/* Course Description */}
          <div className="flex flex-col gap-2">
            <label className="text-richblack-25 text-sm font-medium">
              Course Description <sup className="text-red-500">*</sup>
            </label>
            <textarea
              rows={4}
              {...register("coursedescription", {
                required: "Description is required",
              })}
              placeholder="Enter course description"
              className="bg-richblack-700 text-white px-4 py-2 rounded-md resize-none outline-none focus:ring-2 focus:ring-yellow-25"
            />
            {errors.coursedescription && (
              <p className="text-red-400 text-sm">
                {errors.coursedescription.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-richblack-25 text-sm font-medium">
              Price <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              placeholder="Enter course price"
              className="bg-richblack-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-25"
            />
            {errors.price && (
              <p className="text-red-400 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-richblack-25 text-sm font-medium">
              Category <sup className="text-red-500">*</sup>
            </label>
            <select
              defaultValue=""
              {...register("category", { required: "Category is required" })}
              className="bg-richblack-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-25"
            >
              <option value="" disabled>
                Choose category
              </option>
              {category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.categoryname}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm">{errors.category.message}</p>
            )}
          </div>
          {}

          {/* Tags */}
          <ChipInput
            name="tags"
            label="Tags"
            control={control}
            errors={errors}
          />

          {/* Thumbnail Upload */}
          {preview ? (
            <div className="bg-richblack-700 p-4 rounded-md flex flex-col gap-3">
              <img
                src={preview}
                alt="thumbnail"
                className="rounded-md max-h-[220px] object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setValue("thumbnail", null);
                }}
                className="mx-auto px-4 py-1 bg-yellow-400 font-bold text-richblack-900 rounded-md"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="bg-richblack-700 min-h-[150px] flex flex-col gap-4 p-4 rounded-md">
              <input
                type="file"
                hidden
                id="thumbnail"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setFile(selectedFile);
                  setPreview(URL.createObjectURL(selectedFile));
                  setValue("thumbnail", selectedFile, { shouldValidate: true });
                }}
              />
              <div
                onClick={() => document.getElementById("thumbnail").click()}
                className="mx-auto cursor-pointer h-12 w-12 bg-richblack-800 rounded-full flex items-center justify-center"
              >
                <IoCloudUpload className="text-yellow-50 text-lg" />
              </div>
              <p className="text-white opacity-70 text-center">
                Drag & Drop or <span className="text-yellow-100">Browse</span>
              </p>
            </div>
          )}
          {errors.thumbnail && (
            <p className="text-red-400 text-sm">Thumbnail is required</p>
          )}
          <input
            type="hidden"
            {...register("thumbnail", { required: !editCourse })}
          />

          {/* Benefits */}
          <div className="flex flex-col gap-2">
            <label className="text-richblack-25 text-sm font-medium">
              Course Benefits <sup className="text-red-500">*</sup>
            </label>
            <textarea
              rows={4}
              {...register("whatyouwilllearn", {
                required: "Benefits are required",
              })}
              placeholder="Enter course benefits"
              className="bg-richblack-700 text-white px-4 py-2 rounded-md resize-none outline-none focus:ring-2 focus:ring-yellow-25"
            />
          </div>

          {/* Requirements */}
          <RequirementField
            name="requirements"
            label="Requirements / Instructions"
            control={control}
            errors={errors}
          />

          {/* Continue without saving */}
          {editCourse && (
            <button
              onClick={withoutSaveHandler}
              type="button"
              className="bg-richblack-700 text-richblack-100 font-semibold py-2 rounded-md"
            >
              Continue without Saving
            </button>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-yellow-25 cursor-pointer  text-richblack-900 font-semibold py-2 rounded-md hover:bg-yellow-50"
          >
            Save & Continue
          </button>
        </form>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div className="flex flex-col gap-4 w-10/12 mx-auto px-4 py-2 bg-richblack-800">
          <h2 className="text-3xl text-white font-bold mt-4 text-center">
            Course Builder
          </h2>

          <form className="flex flex-col gap-6 bg-richblack-800 p-6 rounded-lg">
            <div className="flex flex-col gap-2">
              <label className="text-richblack-25 text-sm font-medium">
                Section Name <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                name="sectionName"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Enter section name"
                className="bg-richblack-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-25"
              />
            </div>
            <div className=" flex gap-2 ">
              <button
                onClick={createSectionHandler}
                type="button"
                className=" w-4/12 mx-auto  rounded-md border cursor-pointer border-yellow-200 bg-yellow-100 flex gap-3 items-center text-richblack-700 px-3 py-1 "
              >
                {sectionId ? "Update Section" : "Create Section"}{" "}
                <IoIosAddCircleOutline className="text-xl" />
              </button>
              {sectionId ? (
                <button
                  onClick={cancelEditHandler}
                  className="text-white text-md opacity-60 cursor-pointer"
                >
                  Cancel Edit
                </button>
              ) : null}
            </div>

            {/* render created sections */}

            {course?.sections?.length > 0 &&
              course.sections.map((sec) => {
                const isActive = activeSectionId === sec._id;

                return (
                  <div
                    key={sec._id}
                    className="w-full flex flex-col rounded-xl bg-richblack-800/70 backdrop-blur-sm border border-richblack-600 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    {/* ================= SECTION HEADER ================= */}
                    <div className="flex justify-between items-center px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-yellow-25" />
                        <h3 className="text-lg font-semibold text-white tracking-wide">
                          {sec.sectionName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4">
                        <MdModeEdit
                          onClick={() => sectionEditHandler(sec._id)}
                          className="text-lg text-richblack-200 cursor-pointer hover:text-yellow-25 transition-colors"
                        />

                        <MdDelete
                          onClick={() => sectionDeleteHandler(sec._id)}
                          className="text-lg text-richblack-200 cursor-pointer hover:text-red-500 transition-colors"
                        />

                        <div
                          onClick={() => toggleSectionId(sec._id)}
                          className="cursor-pointer transition-transform duration-300"
                        >
                          {isActive ? (
                            <IoIosArrowDropupCircle className="text-2xl text-yellow-25" />
                          ) : (
                            <IoIosArrowDropdownCircle className="text-2xl text-richblack-200 hover:text-yellow-25" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ================= SUBSECTIONS ================= */}
                    {isActive && (
                      <div className="px-6 pb-5 flex flex-col gap-4 animate-fadeIn">
                        {/* Add Lecture */}
                        <button
                          onClick={() => addLectureHandler(sec._id)}
                          type="button"
                          className="self-start flex items-center gap-2 text-sm text-yellow-25 font-medium px-3 py-1.5 rounded-md hover:bg-richblack-700 transition"
                        >
                          <GrAddCircle />
                          Add Lecture
                        </button>

                        {/* Lecture Cards */}
                        {sec?.subSections?.length > 0 &&
                          sec.subSections.map((subsec) => (
                            <div
                              key={subsec._id}
                              className="group flex justify-between items-start gap-4 p-4 rounded-lg bg-richblack-700/70 border border-richblack-600 hover:border-yellow-25/40 transition-all"
                            >
                              <div className="flex flex-col gap-1">
                                <h4
                                  onClick={() =>
                                    viewSubSectionHandler(subsec, sec._id)
                                  }
                                  className="text-white cursor-pointer hover:text-yellow-25 font-medium tracking-wide"
                                >
                                  {subsec.title}
                                </h4>
                                <p className="text-sm text-richblack-300 leading-relaxed">
                                  {subsec.description}
                                </p>
                              </div>

                              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MdModeEdit
                                  onClick={() =>
                                    handleEditLecture(subsec, sec._id)
                                  }
                                  className="text-lg text-richblack-300 cursor-pointer hover:text-yellow-25"
                                />

                                <MdDelete
                                  onClick={() =>
                                    handleDeleteLecture(subsec, sec._id)
                                  }
                                  className="text-lg text-richblack-300 cursor-pointer hover:text-red-500"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}

            <div className="flex gap-3">
              <button
                onClick={step2BackHandler}
                className="bg-richblack-400 px-4 py-2 text-white font-semibold rounded-md cursor-pointer"
              >
                Back
              </button>

              <button
                onClick={step2NextHandler}
                type="button"
                className="bg-yellow-25 px-4 py-2 text-richblack-900 font-semibold rounded-md hover:bg-yellow-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================STEP 3================== */}
      {step === 3 && (
        <div className="flex flex-col gap-8 w-10/12 mx-auto px-4 py-2 bg-richblack-800">
          <form
            onSubmit={handleSubmit(step3PublishHandler)}
            className=" flex w-full flex-col gap-8 bg-richblack-700  px-3 py-3 rounded-lg"
          >
            <h2 className="text-3xl text-white font-bold mt-4 text-center">
              Publish Settings
            </h2>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                {...register("public", { required: false })}
                className=""
              />

              <div className="text-white text-xl font-inter">
                Make this course Publish
              </div>
            </div>

            <div className="flex gap-3 ">
              <button
                onClick={step3BackHandler}
                type="button"
                className="bg-richblack-500 text-richblack-900 hover:bg-richblack-900 hover:text-richblack-500 px-5 py-1 rounded-md cursor-pointer transition-all duration-200 ease-in-out "
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-yellow-25 text-richblack-900 hover:bg-yellow-100 px-5 py-2 rounded-md cursor-pointer  transition-all duration-200 ease-in-out"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      )}
      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
      {subSectionModal && <SubSectionModal {...modalData} />}
    </div>
  );
};

export default RendersStep;
