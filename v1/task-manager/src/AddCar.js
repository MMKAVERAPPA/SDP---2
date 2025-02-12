import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

export default function CarCreate() {

    const [car, setCar] = useState({ ID: '', Number: '', Model: '', Type: '' });
    const navigate = useNavigate();

    const textChange = (event) => {
        setCar({ ...car, [event.target.id]: event.target.value });
    };

    const createCar = async () => {
        const baseUrl = "http://localhost:3001";
        try {
            const response = await axios.post(`${baseUrl}/cars`, car);
            setCar(response.data.createdCar); 
            alert(response.data.message);
            navigate("/car/list");
        } catch (error) {
            alert("Server error");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="mb-3">
                    <label htmlFor="Number" className="form-label">Car Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Number"
                        placeholder="Enter Car Number"
                        value={car.Number}
                        onChange={textChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Model" className="form-label">Car Model</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Model"
                        placeholder="Enter Car Model"
                        value={car.Model}
                        onChange={textChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Type" className="form-label">Car Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Type"
                        placeholder="Enter Car Type"
                        value={car.Type}
                        onChange={textChange}
                    />
                </div>
                <a href="/"><button className="btn btn-primary" onClick={createCar} style={{ marginRight: "10px" }}>Create Car</button></a>
                <button className="btn btn-danger" onClick={() => navigate("/")}>
                    Cancel
                </button>
            </div>
        </>
    );
}
