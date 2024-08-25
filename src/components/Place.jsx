import React from 'react';
import { useNavigate } from 'react-router-dom';

const Place = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/turnon');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg text-gray-700 mb-6 text-center">
          Place the item on the shelf of the bin and then press this button.
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Press This Button
        </button>
      </div>
    </div>
  );
};

export default Place;
