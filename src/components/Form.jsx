import React from 'react';
import { useParams } from 'react-router-dom';

const Form = () => {
  const { itemId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Form for Item {itemId}</h1>
        {/* Add your form fields here */}
        <form>
          <div className="mb-4">
            <label htmlFor="exampleInput" className="block text-gray-700 mb-2">Example Input</label>
            <input
              type="text"
              id="exampleInput"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
