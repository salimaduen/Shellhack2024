import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './route/home';
import LoginRegister from './route/loginRegister';
import Dashboard from './route/dashboard';
import Recommendation from './route/recommendation';

const  App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<LoginRegister />}/>
        <Route path="/dashboard" element={<Recommendation />}/>
      </Routes>
    </Router>
  );
};
export default App;
