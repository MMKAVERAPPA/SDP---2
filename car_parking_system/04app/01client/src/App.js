import BookList from './books/BookList';
import BookCreate from './books/BookCreate';
import BookView from './books/BookView';
import BookEdit from './books/BookEdit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<BookList />} />
            <Route path="/books/list" element={<BookList />} />
            <Route path="/books/create" element={<BookCreate />} />
            <Route path="/books/view/:id" element={<BookView />} />
            <Route path="/books/edit/:id" element={<BookEdit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
