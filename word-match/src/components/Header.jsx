import React from "react";

const Header = ({ onHelpClick }) => {
  return (
    <header className="flex items-center justify-between bg-green-500 text-white p-4 shadow-lg">
      {/* Left Section: Profile Image */}
      <div className="flex items-center">
        <img
          //   src="https://via.placeholder.com/40" // Replace with profile image source
          src="http://surl.li/eniecf"
          alt="Profile"
          className="rounded-full w-10 h-10 mr-3"
        />
        <span className="text-lg font-medium">Player</span>
      </div>

      {/* Center Section: Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Word Match Game</h1>
        <p className="text-sm italic">Match the words, beat the clock!</p>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Login
        </button>
        <button
          // className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          onClick={onHelpClick}
        >
          Help
        </button>
      </div>
    </header>
  );
};

export default Header;
