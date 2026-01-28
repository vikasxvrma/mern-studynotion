import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

const AddReviewModal = ({
  title,
  initialRating = 0,
  initialComment = "",
  onSave,
  onClose,
}) => {
  const { user } = useSelector((state) => state.profile);

  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  const handleSave = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide rating and comment");
      return;
    }
    onSave(rating, comment);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[400px] bg-richblack-900 rounded-2xl shadow-2xl p-6 flex flex-col gap-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          <RxCrossCircled
            className="text-white cursor-pointer hover:text-red-500"
            size={24}
            onClick={onClose}
          />
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <img
            src={user?.additionalDetails?.image}
            alt="user"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="text-white font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
        </div>

        {/* Stars */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((val) => (
            <span
              key={val}
              onClick={() => setRating(val)}
              className={`text-2xl cursor-pointer ${
                rating >= val ? "text-yellow-25" : "text-richblack-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="bg-richblack-700 text-white rounded-md p-2 resize-none"
          placeholder="Write your honest review..."
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-white text-richblack-900 px-4 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
