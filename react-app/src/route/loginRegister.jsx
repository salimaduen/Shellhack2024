import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: prev[name] ? [...prev[name], value] : [value],
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:5000/auth/user/login', {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          const { access_token } = response.data;

          // Save access token to localStorage
          localStorage.setItem('access_token', access_token);

          // Navigate to the dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Invalid email or password. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    } else {
      // Handle registration (placeholder)
      console.log('Registration form data:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => { setIsLogin(true); setErrorMessage(""); }}
            className={`px-4 py-2 rounded-l-md border ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrorMessage(""); }}
            className={`px-4 py-2 rounded-r-md border ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
            {/* Registration Form Fields */}
            {/* ... */}
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
