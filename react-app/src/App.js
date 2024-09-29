import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './route/home';
import LoginRegister from './route/loginRegister';
import Dashboard from './route/dashboard';

const  App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/test" element={<LoginRegister />}/>
      </Routes>
    </Router>
  );
};
export default App;
