import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = () => {
  return (
    <div className="flex items-center -ml-1">
      {Array.from({ length: 4 }).map((_, index) => (
        <AiFillStar key={index} className="text-yellow-400" />
      ))}
      {Array.from({ length: 1 }).map((_, index) => (
        <AiOutlineStar key={index} className="text-yellow-400" />
      ))}
    </div>
  );
};

export default Rating;
