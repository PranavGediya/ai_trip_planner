import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import Viewtrip from './view-trip/[trip-Id]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import MapPage from './view-trip/components/MapPage.jsx'


const router = createBrowserRouter([
  {
   path : '/',
   element : <App/> 
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element: <Viewtrip/>
  },
  {
    path:'/my-trips',
    element: <MyTrips/>
  },
  {
    path:'/MapPage',
    element: <MapPage/>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
