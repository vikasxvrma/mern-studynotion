import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const RequirementField = ({ name, label, control, errors }) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-richblack-25 text-sm font-medium">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={{ required: true }}
        render={({ field }) => {
          const requirements = field.value || [];

          const addRequirement = () => {
            const trimmed = input.trim();
            if (!trimmed) return;
            field.onChange([...requirements, trimmed]);
            setInput("");
          };

          const removeRequirement = (index) => {
            field.onChange(requirements.filter((_, i) => i !== index));
          };

          return (
            <>
              {/* INPUT + ADD */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter requirement"
                  className="
                    flex-1
                    bg-richblack-700
                    text-white
                    px-4 py-2
                    rounded-md
                    outline-none
                    focus:ring-2 focus:ring-yellow-25
                  "
                  /* Optional UX:
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addRequirement();
                    }
                  }}
                  */
                />

                <button
                  type="button"
                  onClick={addRequirement}
                  className="
                    bg-yellow-25
                    text-richblack-900
                    px-4 py-2
                    rounded-md
                    font-medium
                    hover:bg-yellow-100
                    transition
                    w-fit
                  "
                >
                  Add
                </button>
              </div>

              {/* REQUIREMENT CHIPS */}
              <div className="flex flex-wrap gap-2 mt-2">
                {requirements.map((req, index) => (
                  <div
                    key={`${req}-${index}`}
                    className="
                      flex items-center gap-2
                      bg-richblack-800
                      text-white
                      px-3 py-1
                      rounded-full
                      text-sm
                      border border-richblack-600
                    "
                  >
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-richblack-300 hover:text-red-400 transition"
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </>
          );
        }}
      />

      {errors?.[name] && (
        <p className="text-red-400 text-sm">
          {label} is required
        </p>
      )}
    </div>
  );
};

export default RequirementField;
