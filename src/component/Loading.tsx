import React from "react";

const Loading = ({message}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinning gradient ring */}
        <div className="w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>

        {/* Animated loading text */}
        <p className="text-2xl font-semibold tracking-wide animate-pulse drop-shadow-lg">
          Loading... {message}
        </p>
      </div>
    </div>
  );
};

export default Loading;

