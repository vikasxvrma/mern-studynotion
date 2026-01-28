import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoCloudUpload } from "react-icons/io5";

import { setCourse } from "../../../slices/courseSlice";
import {
  createSubSection,
  updateSubSection,
} from "../../../services/operations/subSectionAPI";

const SubSectionModal = ({
  sectionId,
  setSubSectionModal,
  lecture,
  setActiveLecture,
  editSubSectionId,
  setEditSubSectionId,
  setShowSubsection,
  showSubsection,
}) => {
  /* ===================== LOCAL STATE ===================== */
  const [preview, setPreview] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /* ===================== RHF ===================== */
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ shouldUnregister: false });

  /* ===================== PREFILL ===================== */
  useEffect(() => {
    if (!lecture) return;

    setValue("title", lecture.title);
    setValue("description", lecture.description);
    setPreview(lecture.videoUrl);
  }, [lecture, setValue]);

  /* ===================== HANDLERS ===================== */
  const saveHandler = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.videofile instanceof File) {
      formData.append("videofile", data.videofile);
    }

    try {
      const response = editSubSectionId
        ? await dispatch(
            updateSubSection(token, formData, editSubSectionId, sectionId)
          )
        : await dispatch(createSubSection(token, formData, sectionId));

      if (response) {
        dispatch(setCourse(response.data.data));
        reset();
        closeModal();
        toast.success(editSubSectionId ? "Lecture updated" : "Lecture added");
      }
    } catch {
      toast.error("Lecture operation failed");
    }
  };

  const closeModal = () => {
    setEditSubSectionId(null);
    setActiveLecture(null);
    setShowSubsection(null);
    setSubSectionModal(false);
  };

  /* ===================== JSX ===================== */
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-3">
      <div
        className="
          w-full max-w-4xl
          bg-richblack-900
          rounded-2xl
          shadow-2xl
          flex flex-col
          max-h-[90vh]
        "
      >
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center px-6 py-4 bg-richblack-800 border-b border-richblack-700 rounded-t-2xl">
          <h2 className="text-white text-lg font-semibold">
            {showSubsection
              ? "View Lecture"
              : editSubSectionId
              ? "Edit Lecture"
              : "Add Lecture"}
          </h2>

          <AiOutlineCloseCircle
            className="text-2xl text-white/70 cursor-pointer hover:text-red-400 transition"
            onClick={closeModal}
          />
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit(saveHandler)}
          className="px-6 sm:px-8 py-6 flex flex-col gap-6 overflow-y-auto"
        >
          {/* ================= VIDEO ================= */}
          {preview ? (
            <div className="bg-richblack-800 rounded-xl p-4 border border-richblack-700">
              <video
                src={preview}
                controls
                className="w-full max-h-[320px] rounded-lg bg-black"
              />

              {!showSubsection && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setValue("videofile", null);
                  }}
                  className="mt-3 text-sm text-yellow-25 hover:underline"
                >
                  Change video
                </button>
              )}
            </div>
          ) : (
            <div className="bg-richblack-800 rounded-xl p-6 border border-dashed border-richblack-600 flex flex-col items-center gap-4">
              <input
                type="file"
                hidden
                id="videofile"
                {...register("videofile", {
                  required: !editSubSectionId && "Video is required",
                })}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setPreview(URL.createObjectURL(file));
                  setValue("videofile", file, { shouldValidate: true });
                }}
              />

              <div
                onClick={() => document.getElementById("videofile").click()}
                className="
                  h-16 w-16 rounded-full
                  bg-richblack-700
                  flex items-center justify-center
                  cursor-pointer
                  hover:bg-richblack-600
                  transition
                "
              >
                <IoCloudUpload className="text-yellow-25 text-2xl" />
              </div>

              <p className="text-sm text-richblack-300">
                Click to upload lecture video
              </p>

              {errors.videofile && (
                <p className="text-xs text-red-400">
                  {errors.videofile.message}
                </p>
              )}
            </div>
          )}

          {/* ================= TITLE ================= */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-200">
              Lecture Title <span className="text-red-400">*</span>
            </label>

            {showSubsection ? (
              <div className="bg-richblack-800 text-white px-4 py-2 rounded-lg border border-richblack-700">
                {lecture.title}
              </div>
            ) : (
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter lecture title"
                className="bg-richblack-800 text-white px-4 py-2 rounded-lg border border-richblack-700 focus:ring-2 focus:ring-yellow-25/50"
              />
            )}

            {errors.title && (
              <p className="text-xs text-red-400">{errors.title.message}</p>
            )}
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-richblack-200">
              Lecture Description <span className="text-red-400">*</span>
            </label>

            {showSubsection ? (
              <div className="bg-richblack-800 text-white px-4 py-2 rounded-lg border border-richblack-700">
                {lecture.description}
              </div>
            ) : (
              <textarea
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Briefly describe this lecture"
                className="bg-richblack-800 text-white px-4 py-2 rounded-lg border border-richblack-700 resize-none focus:ring-2 focus:ring-yellow-25/50"
              />
            )}

            {errors.description && (
              <p className="text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* ================= ACTION ================= */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={showSubsection}
              className={`
                px-6 py-2 rounded-lg font-semibold transition
                ${
                  showSubsection
                    ? "bg-richblack-500 text-richblack-200 cursor-not-allowed"
                    : "bg-yellow-25 text-richblack-900 hover:brightness-110"
                }
              `}
            >
              {showSubsection
                ? "View Only"
                : editSubSectionId
                ? "Update Lecture"
                : "Save Lecture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
