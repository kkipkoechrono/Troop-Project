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
      {
        path: "Army",
        element: <Army />,
        errorElement: <ErrorPage />
      },
      {
        path: "Navy",
        element: <Navy />,
        errorElement: <ErrorPage />
      },
      {
        path: "Air-force",
        element: <Air-force />,
        errorElement: <ErrorPage />
      },
      {
        path: "Marines",
        element: <Marines />,
        errorElement: <ErrorPage />
      },

]

export default routes