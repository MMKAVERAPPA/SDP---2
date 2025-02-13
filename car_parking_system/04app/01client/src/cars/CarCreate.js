import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function CarCreate() {
    const [car, setCar] = useState({id:'',number:'',model:'',type:''});
    const navigate = useNavigate();
    const txtBoxOnChange = event => {
        const updatableCar = {...car};
        updatableCar[event.target.id] = event.target.value; //updatableCar['type'] = event.target.value;
        setCar(updatableCar);
    };
    const createCar = async () => {
        const baseUrl = "http://localhost:8080"
        try {
            const response = await axios.post(`${baseUrl}/cars`,{...car})
            const createdCar = response.data.car;
            setCar(createdCar);
            alert(response.data.message)
            navigate('/cars/list')
        } catch(error) {
            alert('Server Error');
        }
    };
    
    return(
        <>
            <PageHeader/>  
            <h1></h1>          
            <h3 className="text-center">Add Car</h3>
            <h1></h1>          
            <div className="container">
                <div className="form-group mb-3">
                    <label for="number" className="form-label">Car Number:</label>
                    <input type="text" className="form-control" id="number" 
                        placeholder="Enter car number"
                        value={car.number} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label for="model" className="form-label">Car Model:</label>
                    <input type="text" className="form-control" id="model" 
                        placeholder="Enter car model"
                        value={car.model} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label for="type" className="form-label">Car Type(SUV/ CUV/ Sedan):</label>
                    <input type="text" className="form-control" id="type" 
                        placeholder="Enter car type"
                        value={car.type} 
                        onChange={txtBoxOnChange}/>
                </div>
                <button className="btn btn-primary"
                    onClick={createCar}>Create Car</button>
                <a href="/cars/list" className="btn btn-danger btn1" style={{marginLeft: "10px"}}>Go Back</a>
            </div>
        </>
    );
}

export default CarCreate;