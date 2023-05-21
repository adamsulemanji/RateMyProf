import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signupPage" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
