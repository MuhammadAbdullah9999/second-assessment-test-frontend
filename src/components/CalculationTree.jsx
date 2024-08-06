import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddOperation from './AddOperation';

const CalculationTree = ({ user }) => {
  const [calculations, setCalculations] = useState([]);
  const [selectedCalculationId, setSelectedCalculationId] = useState(null);

  const fetchCalculations = async () => {
    try {
      const response = await axios.get('https://second-assessment-test-backend.onrender.com/calculations', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      setCalculations(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching calculations:', error);
    }
  };

  const refreshCalculations = async () => {
    console.log('Refreshing calculations...');
    await fetchCalculations();
    console.log('Calculations refreshed:', calculations);
  };

  useEffect(() => {
    fetchCalculations();
  }, []);

  const handleAddOperationClick = (calculationId) => {
    setSelectedCalculationId(calculationId);
  };

  const renderOperations = (operations) => {
    return operations.map((op) => (
      <div key={op.id} className="ml-4 mt-2 p-4 my-2 border rounded-md bg-gray-50 shadow-sm">
        <div className="flex items-center space-x-2">
          <span>{op.number1} {op.operand} {op.number2} = {op.result}</span>
          <span className="text-gray-500 ml-4">by {op.username}</span>
          <div>
            <button 
              className="text-blue-500 hover:text-blue-700 ml-12" 
              onClick={() => handleAddOperationClick(op.id)}
            >
              Add Operation
            </button>
          </div>
        </div>
        {op.subOperations && op.subOperations.length > 0 && (
          <div className="ml-4">
            {renderOperations(op.subOperations)}
          </div>
        )}
        {selectedCalculationId === op.id && (
          <AddOperation
            parentNumber={op.result}
            user={user}
            calculationId={op.id}
            refreshCalculations={refreshCalculations}
          />
        )}
      </div>
    ));
  };

  const renderCalculationTree = (calculation) => (
    <div key={calculation.id} className=" mb-4 p-4 border rounded-md bg-white shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="font-bold">{calculation.number}</span>
        <span className="text-gray-500 ml-4">by {calculation.username}</span>
        <button
          className="text-blue-500 hover:text-blue-700 ml-auto"
          onClick={() => handleAddOperationClick(calculation.id)}
        >
          Add Operation
        </button>
      </div>
      {calculation.operations && calculation.operations.length > 0 && (
        <div className="ml-4 mt-2">
          {renderOperations(calculation.operations)}
        </div>
      )}
      {selectedCalculationId === calculation.id && (
        <AddOperation
          parentNumber={calculation.number}
          user={user}
          calculationId={calculation.id}
          refreshCalculations={refreshCalculations}
        />
      )}
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center mt-12 bg-gray-100">
      <div className="p-4 bg-white rounded-md shadow-md w-4/5 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Calculation Tree</h2>
        {calculations.length === 0 ? (
          <div className="text-center text-gray-500">No calculations to show.</div>
        ) : (
          calculations.map(renderCalculationTree)
        )}
      </div>
    </div>
  );
};

export default CalculationTree;
