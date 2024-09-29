import React from 'react';

const About = () =>  {

  const containerStyle = {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  };

  const headerStyle = {
    fontFamily: 'Roboto, sans-serif', 
    fontSize: '28px', 
    fontWeight: '700',
    lineHeight: '1.4',
    margin: '20px 0',
    color: '#ff4081',
  };

  const paragraphStyle = {
    fontFamily: 'Lato, sans-serif', 
    fontSize: '18px',
    lineHeight: '1.6',   
    color: '#f5f5f5',
    margin: '15px 0',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#ff4081',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  };

  const handleButtonClick = () => {
    window.location.href = '/login';
  };

  return ( 
    <div style={containerStyle}>
      <h2 style={headerStyle}>The Issue</h2>
      <p style={paragraphStyle}>
        Many immigrants arriving in the U.S. from the American continent face significant challenges when it comes to navigating the complex financial system.
        They often lack access to reliable financial guidance, making it difficult to build credit, manage money, or establish a solid financial foundation.
        This lack of knowledge and support can lead to poor financial decisions, increased debt, and difficulty achieving long-term financial stability. 
        Without proper guidance, immigrants are left to navigate these challenges alone, making it harder to adapt and thrive in their new environment.
      </p>
      
      <h2 style={headerStyle}>Our Solution</h2>
      <p style={paragraphStyle}>
        Our web app is designed to provide immigrants with the financial guidance they need to succeed in the U.S. By creating a personalized financial profile
        through a comprehensive registration form, we can assess where each individual stands and offer tailored recommendations.
        From building credit scores and managing debt to providing financial literacy education, budgeting advice, and retirement planning, our app serves
        as a one-stop solution to help users improve their financial health. We aim to empower immigrants with the knowledge and tools needed to build a 
        strong financial foundation and achieve their goals.
      </p>

      <button style={buttonStyle} onClick={handleButtonClick}>
        Sign Up
      </button>
    </div>
  );
};

export default About;
