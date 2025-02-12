import React from "react";
import Navbar from "./NavBar";

export default function AddBook() {
    return (
        <>
        <Navbar/>
        <div className="container">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ISBN Code</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter ISBN Code"></input>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Book Title</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Book Title"></input>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Author</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Author Name"></input>
            </div>
            <a href="/"><button type="button" class="btn btn-primary" style={{marginRight: "10px"}}>Update</button></a>
            <a href="/"><button type="button" class="btn btn-danger">Cancel</button></a>
        </div>
        </>
        
    )
}
