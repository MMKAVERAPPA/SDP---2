import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from 'axios'
function CarList() {
    const [cars, setCars]= useState([{id:'',number:'',model:'',type:''}])
    const readAllCars = async () => {
        try {
            const baseUrl = 'http://localhost:8080';
            const response = await axios.get(`${baseUrl}/cars`);
            const queriedCars = response.data;
            setCars(queriedCars);
        } catch(error) {
            alert('Server Error');
        }
    };
    

    const deleteCar = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if(!confirm("Are you sure to delete?")) {
            return;
        }
        const baseUrl = "http://localhost:8080"
        try {
            const response = await axios.delete(`${baseUrl}/cars/${id}`)
            alert(response.data.message)
            await readAllCars();
        } catch(error) {
            alert('Server Error');
        }
    };
    
    useEffect(()=>{
        readAllCars();
    },[]);
    return (
        <>
            <PageHeader />
            <h3></h3>
            <h3 style={{marginLeft: "600px"}}>List of Cars</h3>
            <h2></h2>
            <div className="container">
                <table className="table table-success table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Car Number</th>
                            <th scope="col">Model</th>
                            <th scope="col">Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody> 
                        
                        {(cars && cars.length > 0) ? cars.map(
                            (car) =>  {return (<tr key={car.id}>
                            <th scope="row">{car.id}</th>
                            <td>{car.number}</td>
                            <td>{car.model}</td>
                            <td>{car.type}</td>
                            <td><a href={`/cars/view/${car.id}`} 
                                className="btn btn-success">View</a>
                                &nbsp;
                                <a href={`/cars/edit/${car.id}`} 
                                className="btn btn-warning">Edit</a>
                                &nbsp;
                                <button  
                                className="btn btn-danger"
                                onClick={()=>deleteCar(car.id)}>Delete</button></td>
                        </tr>);}
                        ) : <tr><td colspan="5">No Data Found</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CarList;