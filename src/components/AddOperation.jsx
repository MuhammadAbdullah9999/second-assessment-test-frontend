import React, { useState } from 'react';
import axios from 'axios';

const AddOperation = ({ user, calculationId, refreshCalculations, parentNumber }) => {
  const [operation, setOperation] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!operation || !number) {
      setError('Both fields are required.');
      return;
    }

    if (!['+', '-', '*', '/'].includes(operation)) {
      setError('Invalid operation selected.');
      return;
    }

    setError('');
    
    try {
      console.log('Adding operation...', { userId: user.id, calculationId, operation, number: parseFloat(number), parentNumber });
      await axios.post('https://second-assessment-test-backend.onrender.com/operations', {
        userId: user.id,
        calculationId,
        operation,
        number: parseFloat(number),
        parentNumber
      });

      console.log('Operation added successfully.');
      refreshCalculations(); 
      setOperation('');
      setNumber('');
    } catch (error) {
      console.error('Error adding operation:', error);
      setError('Error adding operation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex space-x-2">
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="border border-gray-300 rounded-md p-2 flex-1"
        >
          <option value="">Select Operation</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          type="number"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default AddOperation;
