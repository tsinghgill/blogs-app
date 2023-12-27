import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BlogList from '../components/BlogList';
import Banner from '../components/Banner';
import ProductPromo from '../components/ProductPromo';

const HomePage = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch('/api/getToken');
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
            } else {
                console.error('Error fetching token');
            }
        };
    
        fetchToken();
    }, []);

    return (
        <div>
            <Navbar token={token} />
            <Banner token={token} />
            <h1>Welcome to the Blog App</h1>
            <BlogList token={token} />
            <h1>Welcome to the Product Promos</h1>
            <ProductPromo token={token} />
        </div>
    );
};

export default HomePage;
