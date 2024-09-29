import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendation = () => {
  const [recommendationData, setRecommendationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch recommendation data
    const fetchRecommendation = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profile/recommendation', {
          params: { user_id: 2 }, // Default user_id = 2
        });
        setRecommendationData(response.data);
      } catch (err) {
        setError('Failed to fetch recommendation data');
      }
    };

    fetchRecommendation();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">User Recommendations</h2>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : recommendationData ? (
          <pre className="bg-gray-200 p-4 rounded-md text-sm overflow-x-auto">
            {JSON.stringify(recommendationData, null, 2)}
          </pre>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
