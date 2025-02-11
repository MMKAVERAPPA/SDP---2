import React from 'react';
import Navbar from './navbar';

function task(props) {
    return (
        <>
        <Navbar/>
        <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Car Number</th>
              <th scope="col">Car Model</th>
              <th scope="col">Car Type(SUV/Sedan)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>KA-09-H-2024</td>
              <td>Santro</td>
              <td>Hatchback</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>KA-01-O-6661</td>
              <td>Maruthi 69</td>
              <td>SUV</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td >KA-02-L-2132</td>
              <td>BMW</td>
              <td>Sedan</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
          </tbody>
        </table>

      </div>
        </>
        
    );
}

export default task;