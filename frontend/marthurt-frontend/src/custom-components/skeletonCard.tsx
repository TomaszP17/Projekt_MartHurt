import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="sedrop-shadow-md cursor-pointer">
      <div className="skeleton relative w-40 h-40 mx-auto rounded"></div>
      <div className="p-4">
        <div className="skeleton h-4 w-3/4 mb-2 rounded"></div>
        <div className="skeleton h-4 w-1/2 mb-4 rounded"></div>
      </div>
      <div className="p-4 flex gap-2">
        <div className="skeleton h-10 w-full rounded"></div>
        <div className="skeleton h-10 w-full rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
