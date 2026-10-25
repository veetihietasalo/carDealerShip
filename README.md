# Car Dealership

React front end for a car dealership's stock: a table of cars with add, edit and delete, against the course's car REST API.

What it does:
- Lists cars (brand, model, color, fuel, year, price) in an AG Grid table, with a text or number filter on each of the 6 columns
- Add Car and Edit open a Material UI dialog with the same 6 fields
- Delete removes the car and reloads the list

All requests go to `http://carrestapi.herokuapp.com/cars`. That API is gone (checked 25 October 2026, Heroku answers "No such app"), so the table now stays empty and saves fail. The URLs are in `src/CarGrid.jsx` if you want to point it at another backend with the same JSON shape.

Stack: React 18, Vite 4, Material UI 5, AG Grid 30.

Run:

```
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

Status: applied university course project, submitted in 1 commit on 30 October 2023.
