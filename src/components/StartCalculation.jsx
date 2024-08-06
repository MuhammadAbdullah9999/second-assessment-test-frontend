import React, { useState } from 'react';
import axios from 'axios';

const StartCalculation = ({ user, handleRefresh }) => {
  const [number, setNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://second-assessment-test-backend.onrender.com/calculations/start', {
        userId: user.id,
        number: parseFloat(number),
      });
      setNumber('');
      handleRefresh();
    } catch (error) {
      console.error('Error starting calculation:', error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Start Calculation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number:
            </label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter a number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartCalculation;
