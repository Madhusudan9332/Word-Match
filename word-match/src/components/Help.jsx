import React, { useState } from "react";

const Help = ({ isOpen, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Close help when clicking outside of the help content
  const handleOutsideClick = (e) => {
    if (e.target.id === "help-overlay" && !isMinimized) {
      setIsMinimized(false);
      onClose();
    }
  };

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
    setIsMinimized(false); // Ensure it’s not minimized when fullscreen is toggled
  };

  // Minimize the help tab
  const minimizeHelp = () => {
    setIsMinimized(true);
  };

  // Maximize the help tab (from minimized state)
  const maximizeHelp = () => {
    setIsMinimized(false);
    setIsFullScreen(true);
  };

  if (!isOpen) return null;

  return (
    <div
      id="help-overlay"
      onClick={handleOutsideClick}
      //   className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex ${isMinimized ?"":"items-center justify-center"}  z-50`}
      className={`fixed inset-0 bg-black flex 
        ${
          isMinimized
            ? "bg-opacity-0 "
            : "backdrop-blur-sm bg-opacity-50 items-center justify-center"
        } z-50`}
    >
      {/* Help Modal */}
      <div
        className={`relative bg-white rounded shadow-lg ${
          isMinimized
            ? "w-auto h-auto"
            : isFullScreen
            ? "w-screen h-screen"
            : "w-[50vw] h-[50vw]"
        }`}
        style={{
          transition: "width 0.3s, height 0.3s",
        }}
      >
        {/* Video Player */}
        {!isMinimized && (
          <video
            className={`w-full h-full object-cover rounded ${
              isFullScreen ? "rounded-none" : "rounded"
            }`}
            controls
            autoPlay
            loop
          >
            <source
              src="https://www.pexels.com/video/a-person-playing-golf-6541448/"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Control Buttons */}
        {!isMinimized && (
          <div className="absolute top-2 right-2 flex space-x-2">
            {/* Minimize Button */}
            <button
              onClick={minimizeHelp}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
            >
              Minimize
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullScreen}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            >
              {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Close
            </button>
          </div>
        )}

        {/* Maximize Button (Visible only when minimized) */}
        {isMinimized && (
          <div className="absolute bottom-2 left-2">
            <button
              onClick={maximizeHelp}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Maximize
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
