import './App.css';
import Task from './task';
import AddCar from './AddCar.js';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/" element={<Task/>} />
          <Route path="/cars/list" element={<Task/>} />
          <Route path="/cars/addcar" element={<AddCar/>} />
        </Routes>

      </Router>
    </>

  );
}

export default App;