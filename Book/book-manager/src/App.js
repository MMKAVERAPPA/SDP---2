import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Task from './Task';
import AddBook from './AddBook';
import ViewBook from './ViewBook';

function App() {
  return (
    
     <Router>
      <Routes>
        <Route path ="/" element ={<Task/>}/>
        <Route path ="/books/list" element ={<Task/>}/>
        <Route path ="/books/addbook" element ={<AddBook/>}/>
        <Route path="/books/viewbook" element={<ViewBook/>}/>
      </Routes>
    </Router>
  );

   
}

export default App;
