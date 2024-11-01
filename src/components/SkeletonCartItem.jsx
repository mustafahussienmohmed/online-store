import React from "react";

const SkeletonCartItem = () => {
  return (
    <div className="flex items-center gap-5 p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-4">
      <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="flex-grow">
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCartItem;
