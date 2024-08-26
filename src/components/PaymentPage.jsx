import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { amount, upiId } = location.state || {};

  // UPI payment URL (example, should be replaced with actual URL or handling)
  const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=YourName&mc=0000&tid=1234567890&tt=123456&am=${amount}&cu=INR&url=https://yourwebsite.com`;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">UPI Payment</h1>
        <p className="text-lg mb-4 text-center text-gray-700">Please proceed with the payment of ₹{amount} using UPI.</p>
        <a
          href={upiPaymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 text-center"
        >
          Pay Now
        </a>
      </div>
    </div>
  );
};

export default PaymentPage;
