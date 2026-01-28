import React from "react";

const LessonCard = () => {
  return (
    <div className="flex flex-col ">
      <h2>{heading}</h2>
      <div>{subheading}</div>
      <div className="flex justify-between "></div>
      <div>
        {/* left part  */}
        <div></div>

        {/* rightpart  */}
        <div></div>
      </div>
    </div>
  );
};

export default LessonCard;
