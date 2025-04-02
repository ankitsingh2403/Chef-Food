import React from 'react';
import Header from './components/Header';
import ReactDOM from "react-dom/client"
import './App.css'
import Body from './components/Body';
import About from './components/About';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from './components/Contact';
import Error from './components/Error';




function App() {
  return (
    <div className="app">
      
      <Header/>
      <Body/>

    </div>
  )
};

export const appRouter=createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    errorElement:<Error/>
  },
  {
    path: "/about",
    element:<About/>,
  },
  {
    path: "/contact",
    element:<Contact/>,
  },
  


]);



export default App
