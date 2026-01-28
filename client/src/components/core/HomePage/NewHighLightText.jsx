import React from "react";

const NewHighLightText = ({text}) => {
  return (
    <span className="bg-gradient-to-b from-red-700 to-yellow-100 bg-clip-text text-transparent font-bold text-4xl ">
      {" "}
      {text}
    </span>
  );
};

export default NewHighLightText;
