import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/inventory",
      element: <App />,
    },
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
