import React from "react";

const AppLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-4 border-l-orangeJP border-solid rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-xl ">Loading...</p>
    </div>
  );
};

export default AppLoader;
