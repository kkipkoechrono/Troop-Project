import React from 'react';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Navbar from './components/Navbar'
import Army from './pages/Army';
import Navy from './pages/Navy';
import AirForce from './pages/AirForce';
import Marines from './pages/Marines';

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: '/navbar',
        element: <Navbar />,
        errorElement: <ErrorPage />
    },
    {
        path: '/army',
        element: <Army />,
        errorElement: <ErrorPage />
    },
    {
        path: '/navy',
        element: <Navy />,
        errorElement: <ErrorPage />
    },
    {
        path: '/air-force',
        element: <AirForce />, // Corrected component name
        errorElement: <ErrorPage />
    },
    {
        path: '/marines',
        element: <Marines />,
        errorElement: <ErrorPage />
    },
];

export default routes;
