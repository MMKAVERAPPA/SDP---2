import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function BookCreate() {
    const [book, setBook] = useState({ id: '', title: '', author: '', genre: '' });
    const navigate = useNavigate();

    const txtBoxOnChange = event => {
        const updatableBook = { ...book };
        updatableBook[event.target.id] = event.target.value;
        setBook(updatableBook);
    };

    const createBook = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.post(`${baseUrl}/books`, { ...book });
            const createdBook = response.data.book;
            setBook(createdBook);
            alert(response.data.message);
            navigate('/books/list');
        } catch (error) {
            alert('Server Error');
        }
    };

    return (
        <>
            <PageHeader />
            <h1></h1>
            <h3 className="text-center">Add Book</h3>
            <h1></h1>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="title" className="form-label">Book Title:</label>
                    <input type="text" className="form-control" id="title"
                        placeholder="Enter book title"
                        value={book.title}
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input type="text" className="form-control" id="author"
                        placeholder="Enter author's name"
                        value={book.author}
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="genre" className="form-label">Genre:</label>
                    <input type="text" className="form-control" id="genre"
                        placeholder="Enter book genre"
                        value={book.genre}
                        onChange={txtBoxOnChange} />
                </div>
                <button className="btn btn-primary" onClick={createBook}>Create Book</button>
                <a href="/books/list" className="btn btn-danger btn1" style={{ marginLeft: "10px" }}>Go Back</a>
            </div>
        </>
    );
}

export default BookCreate;
