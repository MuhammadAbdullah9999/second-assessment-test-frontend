import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-4 mt-12">
      <button 
        onClick={() => navigate('/login')} 
        className="px-4 py-2 w-1/3 bg-blue-600 text-white hover:bg-blue-500 active:text-blue-600 active:bg-white rounded-md shadow-lg"
      >
        Login
      </button>
      <button 
        onClick={() => navigate('/register')} 
        className="px-4 py-2 w-1/3 bg-blue-600 text-white hover:bg-blue-500 active:text-blue-600 active:bg-white rounded-md shadow-lg"
      >
        Register
      </button>
      <button 
        onClick={() => navigate('/discussion')} 
        className="px-4 py-2 w-1/3 bg-blue-600 text-white hover:bg-blue-500 active:text-blue-600 active:bg-white rounded-md shadow-lg"
      >
        Discussion
      </button>
    </div>
  );
};

export default HomePage;
