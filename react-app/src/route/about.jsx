import React from 'react';

const About = () => {
  return ( 
    <div id="about-section" className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800 mx-auto max-w-4xl my-8 shadow-2xl shadow-gray-500/50">
      {/* First Section */}
      <div className="pt-6 text-center space-y-4">
        <h2 className="text-gray-900 text-4xl font-bold dark:text-white">The Issue</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Many immigrants arriving in the U.S. from the American continent face significant challenges when it comes to navigating the complex financial system.
          They often lack access to reliable financial guidance, making it difficult to build credit, manage money, or establish a solid financial foundation.
          This lack of knowledge and support can lead to poor financial decisions, increased debt, and difficulty achieving long-term financial stability. 
          Without proper guidance, immigrants are left to navigate these challenges alone, making it harder to adapt and thrive in their new environment.
        </p>
      </div>

      {/* Second Section */}
      <div className="pt-6 text-center space-y-4 mt-8">
        <h2 className="text-gray-900 text-4xl font-bold dark:text-white">Our Solution</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Our web app is designed to provide immigrants with the financial guidance they need to succeed in the U.S. By creating a personalized financial profile
          through a comprehensive registration form, we can assess where each individual stands and offer tailored recommendations.
          From building credit scores and managing debt to providing financial literacy education, budgeting advice, and retirement planning, our app serves
          as a one-stop solution to help users improve their financial health. We aim to empower immigrants with the knowledge and tools needed to build a 
          strong financial foundation and achieve their goals.
        </p>
      </div>

      {/* Sign Up Button */}
      <div className="text-center mt-8">
        <button 
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          onClick={() => window.location.href = '/login'}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Sign Up
          </span>
        </button>
      </div>
    </div>
  );
};

export default About;
