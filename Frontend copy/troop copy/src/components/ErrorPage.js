import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css'; // Optional, for styling

const ErrorPage = () => {
    return (
        <div className="error-page">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>
                You can return to the <Link to="/">home page</Link>.
            </p>
        </div>
    );
};

export default ErrorPage;
