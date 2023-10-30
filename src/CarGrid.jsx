import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

const DeleteButton = (params, fetchData) => {
    const handleClick = () => {
        console.log('Row Data:', params.data);  
        const deleteUrl = params.data._links && params.data._links.self && params.data._links.self.href;
        if (!deleteUrl) {
            console.log('Delete URL is undefined. Aborting delete operation.');
            return;
        }
        fetch(deleteUrl, {method: 'DELETE'})
        .then(() => fetchData())  
        .catch(err => console.error(err));
    };
    return <button onClick={handleClick}>Delete</button>;
};
  
export default function CarGrid() {
    const [cars, setCars] = useState([]);
    
    const EditButtonRenderer = (params) => {
        return <EditCar car={params.data} updateCar={updateCar} />;
      };
    
      const columns = [
        { headerName: "Brand", field: "brand", filter: true },
        { headerName: "Model", field: "model", filter: true },
        { headerName: "Color", field: "color", filter: true },
        { headerName: "Fuel", field: "fuel", filter: true },
        { headerName: "Year", field: "year", filter: "agNumberColumnFilter" },
        { headerName: "Price", field: "price", filter: "agNumberColumnFilter" },
        { headerName:"Edit", cellRenderer: EditButtonRenderer },
        { headerName:"", cellRenderer: params => DeleteButton(params, fetchData) }
        ];
    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }
      
    const saveCar = (car) => {
        fetch("http://carrestapi.herokuapp.com/cars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    

    const updateCar = (car, link) => {
        fetch(link, 
        { method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    return (
        <div className="ag-theme-alpine" style={{height: 700, width: "100%"}}>
            <AddCar saveCar={saveCar} />
            <AgGridReact columnDefs={columns} rowData={cars} frameworkComponents={{ editButtonRenderer: EditButtonRenderer }}/>
        </div>
    );
}