# Car Dealership

Live demo: https://veetihietasalo.github.io/carDealerShip/ (runs on demo data, the course API is offline)

React front end for a car dealership's stock: a table of cars with add, edit and delete, against the course's car REST API.

What it does:
- Lists cars (brand, model, color, fuel, year, price) in an AG Grid table, with a text or number filter on each of the 6 columns
- Add Car and Edit open a Material UI dialog with the same 6 fields
- Delete removes the car and reloads the list

Requests go to `https://carrestapi.herokuapp.com/cars` (it was `http://`, which an https page can't call). That API is gone (checked 25 October 2026, Heroku answers "No such app"). When the API can't be reached, the app loads 10 sample cars from `src/demoCars.js` and shows "Demo data: the course API is offline." Add, edit and delete then work on those cars in memory, and a reload resets them. `API_URL` in `src/CarGrid.jsx` is the place to point it at another backend with the same JSON shape.

Stack: React 18, Vite 4, Material UI 5, AG Grid 30.

Run:

```
npm install
npm run dev
```

The app runs under `/carDealerShip/` (http://localhost:5173/carDealerShip/ in dev), the same path as on GitHub Pages. The demo is `dist/` from `npm run build` pushed to the `gh-pages` branch.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

Status: applied university course project, submitted in 1 commit on 30 October 2023.
