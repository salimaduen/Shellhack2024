import './App.css';
import Dashboard from  "./route/main.jsx";
import About from './route/about.jsx';
import Footer from './route/footer.jsx';

const  App = () => {
  return (
    <div className= "App">
    <Dashboard />
    <About />
    <Footer /> 
    </div>

  );
};
export default App;
