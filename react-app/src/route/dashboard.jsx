import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    financialGoal: "Build an emergency fund",
    goalProgress: 30, // in percentage
    literacyModulesCompleted: 2,
    recommendedModules: ["Budgeting", "Credit Scores"],
    spendingAnalysis: {
      categories: ["Rent", "Groceries", "Transport", "Entertainment"],
      values: [40, 25, 15, 20], // in percentage
    },
    creditScoreRange: "600-700",
    recommendations: [
      "Consider setting up an automatic savings plan to reach your emergency fund goal faster.",
      "Focus on reducing your credit card balance to improve your credit score.",
    ],
  });

  // Placeholder for fetching data from backend
  useEffect(() => {
    // Example: fetch data from backend
    // fetch("/api/user-data")
    //   .then((res) => res.json())
    //   .then((data) => setUserData(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Financial Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* User Profile Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Profile Overview</h2>
            <p><strong>Full Name:</strong> {userData.fullName}</p>
            <p><strong>Financial Goal:</strong> {userData.financialGoal}</p>
            <p><strong>Goal Progress:</strong> {userData.goalProgress}%</p>
          </div>

          {/* Financial Goal Progress */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Financial Goal Progress</h2>
            <div className="relative pt-1">
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${userData.goalProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
              <p className="text-sm">Current Progress: {userData.goalProgress}%</p>
            </div>
          </div>

          {/* Financial Literacy Module Progress */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Financial Literacy Modules</h2>
            <p><strong>Modules Completed:</strong> {userData.literacyModulesCompleted}</p>
            <h3 className="text-xl font-semibold mt-4">Recommended Modules:</h3>
            <ul className="list-disc list-inside">
              {userData.recommendedModules.map((module, index) => (
                <li key={index}>{module}</li>
              ))}
            </ul>
          </div>

          {/* Spending Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Spending Analysis</h2>
            <ul>
              {userData.spendingAnalysis.categories.map((category, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>{category}</span>
                  <span>{userData.spendingAnalysis.values[index]}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Credit Score Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Credit Score Overview</h2>
            <p>Your credit score range is approximately: <strong>{userData.creditScoreRange}</strong></p>
          </div>

          {/* Recommendations Section */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Personalized Recommendations</h2>
            <ul className="list-disc list-inside">
              {userData.recommendations.map((recommendation, index) => (
                <li key={index} className="mb-2">{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
