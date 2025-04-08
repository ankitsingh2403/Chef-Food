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
import {Provider} from "react-redux";
import store from './utils/store';
import Login from './components/Login';
import Register from './components/Register';




function App() {
  return (
    <Provider store={store}>
       <div className="app">
      
      <Header/>
      <Outlet/>

    </div>
    </Provider>
   
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
      {
        path: "/login",
        element:<Login/>,
      },
      {
        path: "/register",
        element:<Register/>,
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
  {
    path: "/login",
    element:<Login/>,
  },
  {
    path: "/register",
    element:<Register/>,
  },
  


]);



export default App
