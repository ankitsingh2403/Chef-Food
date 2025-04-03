import React from 'react';
import Header from './components/Header';
import ReactDOM from "react-dom/client"
import './App.css'
import Body from './components/Body';
import About from './components/About';
import { createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";
import Contact from './components/Contact';
import Error from './components/Error';
import Cart from './components/Cart';
import RestaurantMenu from './components/RestaurantMenu';




function App() {
  return (
    <div className="app">
      
      <Header/>
      <Outlet/>

    </div>
  )
};

export const appRouter=createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path: "/",
        element:<Body/>

      },
      {
        path: "/about",
        element:<About/>,
      },
      {
        path: "/contact",
        element:<Contact/>,
      },
      {
        path: "/cart",
        element:<Cart/>,
      },
      {
        path: "/restaurants/:resId",
        element:<RestaurantMenu/>,
      },
      
    ],
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
  {
    path: "/cart",
    element:<Cart/>,
  },
  {
    path: "/restaurants/:resId",
    element:<RestaurantMenu/>,
  },
  


]);



export default App
