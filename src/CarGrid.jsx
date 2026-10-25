import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Alert from '@mui/material/Alert';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { demoCars, demoLinks, carFields, firstFreeDemoId } from "./demoCars";

const API_URL = 'https://carrestapi.herokuapp.com/cars';

const DeleteButton = (params, deleteCar) => {
    const handleClick = () => {
        console.log('Row Data:', params.data);  
        const deleteUrl = params.data._links && params.data._links.self && params.data._links.self.href;
        if (!deleteUrl) {
            console.log('Delete URL is undefined. Aborting delete operation.');
            return;
        }
        deleteCar(deleteUrl);
    };
    return <button onClick={handleClick}>Delete</button>;
};
  
export default function CarGrid() {
    const [cars, setCars] = useState([]);
    // When the API can't be reached we switch to bundled demo data, and add, edit and delete work in memory
    const [demoMode, setDemoMode] = useState(false);
    const demo = useRef(false);
    const nextDemoId = useRef(firstFreeDemoId);
    
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
        { headerName:"", cellRenderer: params => DeleteButton(params, deleteCar) }
        ];
    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch(API_URL, { signal: AbortSignal.timeout(8000) })
        .then(response => {
            if (!response.ok) throw new Error(`Car API answered ${response.status}`);
            return response.json();
        })
        .then(data => setCars(data._embedded.cars))
        .catch(() => {
            demo.current = true;
            setDemoMode(true);
            setCars(demoCars());
        })
    }
      
    const saveCar = (car) => {
        if (demo.current) {
            const id = nextDemoId.current++;
            setCars(prev => [...prev, { ...carFields(car), _links: demoLinks(id) }]);
            return;
        }
        fetch(API_URL, {
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
        if (demo.current) {
            setCars(prev => prev.map(c => c._links.car.href === link ? { ...carFields(car), _links: c._links } : c));
            return;
        }
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

    const deleteCar = (link) => {
        if (demo.current) {
            setCars(prev => prev.filter(c => c._links.self.href !== link));
            return;
        }
        fetch(link, {method: 'DELETE'})
        .then(() => fetchData())
        .catch(err => console.error(err));
    }

    return (
        <>
            {demoMode && <Alert severity="info" sx={{ m: 1 }}>Demo data: the course API is offline.</Alert>}
            <div className="ag-theme-alpine" style={{height: 700, width: "100%"}}>
                <AddCar saveCar={saveCar} />
                <AgGridReact columnDefs={columns} rowData={cars} frameworkComponents={{ editButtonRenderer: EditButtonRenderer }}/>
            </div>
        </>
    );
}