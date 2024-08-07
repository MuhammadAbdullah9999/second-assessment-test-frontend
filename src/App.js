import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CalculationTree from "./components/CalculationTree";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import StartCalculation from "./components/StartCalculation";
import HomePage from "./components/HomePage";

const App = () => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Number Discussion App</h1>
            {user && (
              <h2 className="text-2xl font-semibold">
                Welcome, {user.username}
              </h2>
            )}
          </div>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/register" element={<RegisterForm setUser={setUser} />} />
            <Route
              path="/discussion"
              element={
                <div className="flex flex-col items-center">
                  {user ? (
                    <>
                      <StartCalculation user={user} handleRefresh={handleRefresh} />
                      <CalculationTree user={user} refresh={refresh} handleRefresh={handleRefresh} />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center space-y-4 mt-4">
                        <p className="text-gray-700">Please log in or register to start a new calculation.</p>
                        <Link to="/login" className="text-blue-500 underline">
                          Login
                        </Link>
                        <Link to="/register" className="text-blue-500 underline">
                          Register
                        </Link>
                      </div>
                      <CalculationTree user={user} refresh={refresh} handleRefresh={handleRefresh} />
                    </>
                  )}
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
