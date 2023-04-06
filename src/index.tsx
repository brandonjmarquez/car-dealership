import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home';
import Inventory from './pages/Inventory/Inventory';
import CarFinder from './pages/CarFinder/CarFinder';
import './index.css';

const container: any = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/car-finder",
    element: <CarFinder />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
