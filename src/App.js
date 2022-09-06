import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Pages/Home';
import Fight from './Pages/Fight';
import Film from './Pages/Film';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       <Route path='/Home' element={<Home />} />
       <Route path='/Film' element={<Film />} />
       <Route path='/Fight' element={<Fight />} />   
      </Routes>
    </Router>
  );
}

export default App;
