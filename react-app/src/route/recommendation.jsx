import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendation = () => {
  const [recommendationData, setRecommendationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch recommendation data
    const fetchRecommendation = async () => {
      try {

        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:5000/api/profile/recommendation', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Parse the nested JSON string from the response
        const parsedData = JSON.parse(response.data.recommendations);

        setRecommendationData(parsedData);
      } catch (err) {
        setError('Failed to fetch recommendation data');
      }
    };

    fetchRecommendation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full">
        <h2 className="text-2xl font-semibold mb-6">User Recommendations</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : recommendationData ? (
          <pre className="bg-gray-200 p-4 rounded-md text-sm overflow-auto w-full whitespace-pre-wrap">
            {JSON.stringify(recommendationData, null, 2)}
          </pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
