import React from "react";
import Navbar from "./navbar";

export default function AddCar() {
    return (
        <>
        <Navbar/>
        <div className="container">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Car Number</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Car Number"></input>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Car Model</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Car Model"></input>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Car Type</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Car Type"></input>
            </div>

        </div>
        </>
        
    )
}
