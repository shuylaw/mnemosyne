import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>This is the home page.</p>
            <Link to="/journals">View Journals</Link>
        </div>
    );
}

export default HomePage;