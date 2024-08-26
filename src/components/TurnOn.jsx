import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TurnOn = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [timer, setTimer] = useState(60); // Timer state
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false); // State to show timeout message
  const [noItemsFound, setNoItemsFound] = useState(false); // State to show no items found message
  const navigate = useNavigate();
  const requestSent = useRef(false); // Ref to track if request has been sent

  const fetchItems = () => {
    setLoading(true);
    axios.get('http://192.168.161.168:3000/turnon')
      .then(response => {
        console.log(response);
        let detectedItems = response.data.detected_objects || [];
        detectedItems= detectedItems.filter(item => item !== "PERSON")
        detectedItems= detectedItems.map(item => item=="TOILET"? "ELECTRIC IRON": item)
        if (detectedItems.length === 0) {
          setNoItemsFound(true); // Set flag if no items are found
        } else {
          setItems(detectedItems);
          setNoItemsFound(false); // Reset flag if items are found
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setNoItemsFound(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch data from backend on component mount if the request has not been sent
    if (!requestSent.current) {
      requestSent.current = true; // Set the flag to true to prevent multiple requests
      fetchItems();
    }
  }, []);

  useEffect(() => {
    if (loading && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on unmount
    } else if (timer === 0) {
      setShowTimeoutMessage(true); // Show timeout message when timer reaches 0
    }
    if (!loading) setShowTimeoutMessage(false);
  }, [loading, timer]);

  const handleSelectionChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleButtonClick = () => {
    if (selectedItem) {
      navigate(`/form`, { state: { category: selectedItem } }); // Pass selected item as category to form
    }
  };

  const handleRetry = () => {
    setNoItemsFound(false); // Reset the no items found flag
    fetchItems(); // Retry fetching items
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {showTimeoutMessage && (
        <div className="text-red-500 font-semibold mb-4 absolute t-30">
          Taking longer than expected...
        </div>
      )}
      {noItemsFound ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">No E-Waste Found</h1>
          <button
            onClick={handleRetry}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      ) : loading ? (

        <div class="flex justify-center items-center h-screen">
          <div class="rounded-full h-[10rem] w-[10rem] bg-violet-800 animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center text-voilet-700 font-semibold text-2xl">
            {timer}s
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-semibold mb-6 text-center">Select an Item</h1>
          <div className="mb-6">
            <select
              value={selectedItem}
              onChange={handleSelectionChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="" disabled>Select an item</option>
              {items.map(item => (
                <option key={item.inference_id} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Go to Form
          </button>
        </div>
      )}
    </div>
  );
};

export default TurnOn;
