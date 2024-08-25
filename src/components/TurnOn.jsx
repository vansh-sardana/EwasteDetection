import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TurnOn = () => {
  const [loading, setLoading]= useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend on component mount
    setLoading(true);
    axios.get('http://localhost:3000/detect')
      .then(response => {
        console.log(response);
        setItems(response.data.detected_objects); // Assuming the response is a JSON array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  const handleSelectionChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleButtonClick = () => {
    if (selectedItem) {
      navigate(`/form`); // Redirect to the form with the selected item
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {loading? <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>: 
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Select an Item</h1>
        <div className="mb-6">
          <select
            value={selectedItem}
            onChange={handleSelectionChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="" disabled>Select an item</option>
            {items.map(item => {
              return (<option key={item.id} value={item}>{item}</option>)
            }
          )}
          </select>
        </div>
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go to Form
        </button>
      </div>}
    </div>
  );
};

export default TurnOn;
