import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function BookList() {
    const [books, setBooks] = useState([{ id: '', title: '', author: '', genre: '' }]);

    const readAllBooks = async () => {
        try {
            const baseUrl = 'http://localhost:8080';
            const response = await axios.get(`${baseUrl}/books`);
            const queriedBooks = response.data;
            setBooks(queriedBooks);
        } catch (error) {
            alert('Server Error');
        }
    };

    const deleteBook = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm("Are you sure you want to delete this book?")) {
            return;
        }
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.delete(`${baseUrl}/books/${id}`);
            alert(response.data.message);
            await readAllBooks();
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readAllBooks();
    }, []);

    return (
        <>
            <PageHeader />
            <h3 style={{ marginLeft: "630px", paddingBottom : "30px" ,paddingTop : "15px", fontFamily : "inherit"}}>List of Books</h3>
            <div className="container">
                <table className="table table-success table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Genre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(books && books.length > 0) ? books.map(
                            (book) => {
                                return (
                                    <tr key={book.id}>
                                        <th scope="row">{book.id}</th>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td>
                                            <a href={`/books/view/${book.id}`} className="btn btn-success">View</a>
                                            &nbsp;
                                            <a href={`/books/edit/${book.id}`} className="btn btn-warning">Edit</a>
                                            &nbsp;
                                            <button className="btn btn-danger" onClick={() => deleteBook(book.id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            }
                        ) : <tr><td colSpan="5">No Data Found</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BookList;
