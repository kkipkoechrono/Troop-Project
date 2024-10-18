import React from 'react'
import Navbar from './components/Navbar'

const routes = [

    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
      }, 
      {
        path: "Navbar",
        element: <Navbar />,
        errorElement: <ErrorPage />
      }, 
]

export default routes