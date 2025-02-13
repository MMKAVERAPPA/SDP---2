import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function BookView() {
    const [book, setBook] = useState({ id: '', title: '', author: '', genre: '', image_url: '' });
    const params = useParams();

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

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />

            <h1></h1>
            <h3 className="text-center">View Book</h3>
            <h1></h1>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="title" className="form-label">Book Title:</label>
                    <div className="form-control">{book.title}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <div className="form-control">{book.author}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="genre" className="form-label">Genre:</label>
                    <div className="form-control">{book.genre}</div>
                </div>

                <a href="/books/list" className="btn btn-danger btn1" style={{ marginLeft: "10px" }}>Go Back</a>
                {book.image_url && (
                    <div className="form-group mb-3 text-center">
                        <label htmlFor="image" className="form-label">Book Cover:</label>
                        <div>
                            <img src={`http://localhost:8080/${book.image_url}`} alt="Book Cover" className="img-fluid rounded" style={{ maxWidth: "300px", height: "auto" }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default BookView;
