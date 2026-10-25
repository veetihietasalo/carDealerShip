// Sample cars for when the course API can't be reached (carrestapi.herokuapp.com is gone).
// Same shape as the API's JSON, so the grid, Edit and Delete work on them unchanged.
const sample = [
  ['Ford', 'Mustang', 'Red', 'Gasoline', 2019, 42900],
  ['Toyota', 'Corolla', 'White', 'Hybrid', 2021, 24500],
  ['Volkswagen', 'Golf', 'Blue', 'Diesel', 2018, 16900],
  ['Tesla', 'Model 3', 'Black', 'Electric', 2022, 38900],
  ['Volvo', 'XC60', 'Grey', 'Hybrid', 2020, 45900],
  ['Skoda', 'Octavia', 'Silver', 'Diesel', 2017, 13900],
  ['Nissan', 'Leaf', 'White', 'Electric', 2019, 15900],
  ['BMW', '320d', 'Black', 'Diesel', 2016, 18500],
  ['Kia', 'Ceed', 'Red', 'Gasoline', 2020, 17900],
  ['Audi', 'A4', 'Blue', 'Gasoline', 2018, 23900],
];

export const demoLinks = (id) => ({
  self: { href: `demo/cars/${id}` },
  car: { href: `demo/cars/${id}` },
});

// Year and price come from text fields as strings, numbers keep the number filters working
export const carFields = (car) => ({
  ...car,
  year: Number(car.year) || car.year,
  price: Number(car.price) || car.price,
});

export const firstFreeDemoId = sample.length + 1;

export const demoCars = () => sample.map(([brand, model, color, fuel, year, price], i) => (
  { brand, model, color, fuel, year, price, _links: demoLinks(i + 1) }
));
