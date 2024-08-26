import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import React Icons
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Form = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const category = location.state?.category || '';

  // Single state object to store all form values
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    mrp: '',
    datePurchased: '',
    weight: '',
    brand: '',
    condition: '',
    upiId: '', // Add UPI ID field
  });

  const [offerPrice, setOfferPrice] = useState(null);
  const [upiError, setUpiError] = useState(''); // State for UPI ID error

  // Base prices for categories
  const basePrices = {
    laptop: 1800,
    'electric iron': 350,
    'cell phone': 800,
    mouse: 20,
    remote: 20,
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateUpiId = (upiId) => {
    // Regular expression for UPI ID validation
    const upiRegex = /^[a-zA-Z0-9._@]{3,}$/;
    return upiRegex.test(upiId);
  };

  const calculateOfferPrice = () => {
    const { mrp, datePurchased, weight, condition } = formData;
    const currentYear = new Date().getFullYear();
    const purchaseYear = new Date(datePurchased).getFullYear();
    const yearsUsed = currentYear - purchaseYear;

    const basePrice = Math.min(basePrices[category.toLowerCase()] || 0, 15 / 100 * mrp);
    const depreciationFactor = 0.05; // 5% per year
    const conditionFactor = condition === 'working' ? 1 : 0.5;
    const weightFactor = 0.1; // ₹0.1 per g

    const offerPrice = (
      (basePrice - basePrice * depreciationFactor * yearsUsed) *
        conditionFactor +
      weightFactor * weight
    ).toFixed(2);

    setOfferPrice(offerPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUpiId(formData.upiId)) {
      setUpiError('Invalid UPI ID format');
      return;
    }
    setUpiError('');
    calculateOfferPrice();
  };

  const handleAccept = () => {
    if (!validateUpiId(formData.upiId)) {
      setUpiError('Invalid UPI ID format');
      return;
    }
    toast.success('Offer Accepted');
    setTimeout(() => {
      navigate('/payment', {
        state: {
          amount: offerPrice,
          upiId: formData.upiId, // Pass UPI ID to the payment page
        },
      });
    }, 2000); // Delay redirection to show toast notification
  };

  const handleReject = () => {
    toast.error('Offer Rejected');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full my-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">E-Waste Valuation Form</h1>
        <form onSubmit={handleSubmit} className='flex flex-col justify-items align-center'>
          {/* Category Field (Disabled) */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-200 cursor-not-allowed"
              disabled
            />
          </div>

          {/* MRP Field */}
          <div className="mb-6">
            <label htmlFor="mrp" className="block text-gray-700 text-sm font-medium mb-2">
              MRP (in INR)
            </label>
            <input
              type="number"
              id="mrp"
              value={formData.mrp}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter MRP"
              required
            />
          </div>

          {/* Date Purchased Field */}
          <div className="mb-6">
            <label htmlFor="datePurchased" className="block text-gray-700 text-sm font-medium mb-2">
              Date Purchased
            </label>
            <input
              type="date"
              id="datePurchased"
              value={formData.datePurchased}
              onChange={handleInputChange}
              max={getTodayDate()}
              className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Product Weight Field */}
          <div className="mb-6">
            <label htmlFor="weight" className="block text-gray-700 text-sm font-medium mb-2">
              Product Weight (in g)
            </label>
            <input
              type="number"
              id="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Weight"
              required
            />
          </div>

          {/* Brand Field */}
          <div className="mb-6">
            <label htmlFor="brand" className="block text-gray-700 text-sm font-medium mb-2">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Brand"
              required
            />
          </div>

          {/* Condition Factor Field */}
          <div className="mb-6">
            <label htmlFor="condition" className="block text-gray-700 text-sm font-medium mb-2">
              Condition
            </label>
            <select
              id="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                Select Condition
              </option>
              <option value="working">Working</option>
              <option value="not-working">Not Working</option>
            </select>
          </div>

          {/* UPI ID Field */}
          <div className="mb-6">
            <label htmlFor="upiId" className="block text-gray-700 text-sm font-medium mb-2">
              UPI ID
            </label>
            <input
              type="text"
              id="upiId"
              value={formData.upiId}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 ${upiError ? 'border-red-500' : 'focus:ring-blue-300'}`}
              placeholder="Enter UPI ID"
              required
            />
            {upiError && <p className="text-red-500 text-sm mt-1">{upiError}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>

        {/* Display the calculated offer price */}
        {offerPrice && (
          <div className="mt-8 mb-8 text-center">
            <h2 className="text-xl font-bold text-green-500">
              Offer Price: ₹{offerPrice}
            </h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleAccept}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
              >
                <FaCheckCircle /> Accept
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
              >
                <FaTimesCircle /> Reject
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
