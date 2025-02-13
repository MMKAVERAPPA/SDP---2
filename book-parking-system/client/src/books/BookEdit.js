import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function BookEdit() {
    const [book, setBook] = useState({ id: '', title: '', author: '', genre: '' });
    const params = useParams();
    const navigate = useNavigate();

    const txtBoxOnChange = event => {
        const updatableBook = { ...book };
        updatableBook[event.target.id] = event.target.value;
        setBook(updatableBook);
    };

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/books/${params.id}`);
            const queriedBook = response.data;
            setBook(queriedBook);
        } catch (error) {
            alert('Server Error');
        }
    };

    const updateBook = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.put(`${baseUrl}/books/${params.id}`, { ...book });
            const updatedBook = response.data.book;
            setBook(updatedBook);
            alert(response.data.message);
            navigate('/books/list');
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />

            <h1></h1>
            <h3 className="text-center">Edit Book</h3>
            <h1></h1>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="title" className="form-label">Book Title:</label>
                    <input type="text" className="form-control" id="title"
                        placeholder="Please enter book title"
                        value={book.title}
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input type="text" className="form-control" id="author"
                        placeholder="Please enter author's name"
                        value={book.author}
                        onChange={txtBoxOnChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="genre" className="form-label">Genre:</label>
                    <input type="text" className="form-control" id="genre"
                        placeholder="Please enter book genre"
                        value={book.genre}
                        onChange={txtBoxOnChange} />
                </div>
                <button className="btn btn-warning" onClick={updateBook}>Update Book</button>
                <a href="/books/list" className="btn btn-danger btn1" style={{ marginLeft: "10px" }}>Cancel</a>
            </div>
        </>
    );
}

export default BookEdit;
