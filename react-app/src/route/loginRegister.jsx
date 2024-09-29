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
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
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

            {/* Personal Information */}
            <div>
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              />
            </div>
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
            <div>
              <label className="block mb-2 text-sm font-medium">Age Group</label>
              <select
                name="ageGroup"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Under 25">Under 25</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45 and above">45 and above</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Country of Origin</label>
              <select
                name="countryOfOrigin"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Mexico">Mexico</option>
                <option value="Brazil">Brazil</option>
                <option value="Argentina">Argentina</option>
                {/* Add other countries here */}
              </select>
            </div>

            {/* Employment and Income */}
            <div>
              <label className="block mb-2 text-sm font-medium">Employment Status</label>
              <select
                name="employmentStatus"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Employed">Employed (full-time/part-time)</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Monthly Income Range</label>
              <select
                name="monthlyIncomeRange"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Less than $2,000">Less than $2,000</option>
                <option value="$2,000 - $4,000">$2,000 - $4,000</option>
                <option value="$4,000 - $6,000">$4,000 - $6,000</option>
                <option value="More than $6,000">More than $6,000</option>
              </select>
            </div>

            {/* Banking Information */}
            <div>
              <label className="block mb-2 text-sm font-medium">Do you have a bank account in the U.S.?</label>
              <select
                name="hasBankAccount"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Do you save regularly?</label>
              <select
                name="savingsHabit"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Credit Information */}
            <div>
              <label className="block mb-2 text-sm font-medium">Do you have any credit cards?</label>
              <select
                name="hasCreditCards"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Do you know your credit score?</label>
              <select
                name="knowsCreditScore"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {formData.knowsCreditScore === 'Yes' && (
              <div>
                <label className="block mb-2 text-sm font-medium">Credit Score Range</label>
                <select
                  name="creditScoreRange"
                  className="w-full p-3 border rounded-md"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Less than 600">Less than 600</option>
                  <option value="600-700">600-700</option>
                  <option value="700+">700+</option>
                </select>
              </div>
            )}

            {/* Financial Goals */}
            <div>
              <label className="block mb-2 text-sm font-medium">Select Your Primary Financial Goal</label>
              <select
                name="financialGoal"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Build an emergency fund">Build an emergency fund</option>
                <option value="Improve credit score">Improve credit score</option>
                <option value="Reduce debt">Reduce debt</option>
                <option value="Start saving for retirement">Start saving for retirement</option>
              </select>
            </div>

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
