import React from "react";

const Dashboard = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header-dashboard"> 
      <div className="content">
        {/* Updated Welcome text */}
        <p className="text-8xl font-extrabold text-gray-800 dark:text-gray-200 border-4 border-gray-700 dark:border-gray-400 p-4 rounded-lg inline-block">
          Welcome!
        </p>
        
        <button 
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          onClick={scrollToAbout}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Get Started
          </span>
        </button> 
      </div>
    </header>
  );
};

export default Dashboard;
