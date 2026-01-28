import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const ChipInput = ({ name, label, control, errors }) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label className="text-richblack-25 text-sm font-medium">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={{ required: true }}
        render={({ field }) => {
          const chips = field.value || [];

          const addChip = () => {
            const trimmed = input.trim();
            if (!trimmed || chips.includes(trimmed)) return;
            field.onChange([...chips, trimmed]);
            setInput("");
          };

          const removeChip = (index) => {
            field.onChange(chips.filter((_, i) => i !== index));
          };

          return (
            <>
              {/* Chips Container */}
              <div
                className="
                  flex flex-wrap gap-2
                  p-2 rounded-md
                  bg-richblack-800
                  border border-white/10
                "
              >
                {chips.map((chip, index) => (
                  <div
                    key={`${chip}-${index}`}
                    className="
                      flex items-center gap-1
                      bg-yellow-25
                      text-richblack-900
                      px-3 py-1
                      rounded-full
                      text-xs sm:text-sm
                      font-medium
                    "
                  >
                    {chip}
                    <button
                      type="button"
                      onClick={() => removeChip(index)}
                      className="
                        ml-1
                        hover:text-red-600
                        transition-colors
                      "
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                ))}

                {/* Input inside container */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addChip();
                    }
                  }}
                  placeholder="Type tag & press Enter"
                  className="
                    flex-1
                    min-w-[140px]
                    bg-transparent
                    text-white
                    text-sm
                    px-2 py-1
                    outline-none
                    placeholder:text-richblack-400
                  "
                />
              </div>
            </>
          );
        }}
      />

      {/* Error */}
      {errors?.[name] && (
        <p className="text-red-400 text-xs sm:text-sm">
          At least one tag is required
        </p>
      )}
    </div>
  );
};

export default ChipInput;
